// update-database-urls.cjs
// This script updates the database with Cloudinary URLs

const fs = require("fs");
const { Client } = require("pg");

// Database configuration
const DATABASE_URL =
  "postgresql://postgres:mypassword@localhost:5432/commerce_db";

// Load the Cloudinary URLs mapping
const cloudinaryUrls = JSON.parse(
  fs.readFileSync("cloudinary-urls.json", "utf8")
);

// Create a mapping from original filename to Cloudinary URL
const urlMap = {};
cloudinaryUrls.forEach((item) => {
  urlMap[item.originalName] = item.cloudinaryUrl;
});

async function updateDatabase() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected to database\n");

    // Get all products with their current image URLs
    const result = await client.query(
      "SELECT id, name, image_url FROM products"
    );
    const products = result.rows;

    console.log(`Found ${products.length} products in database\n`);

    let updatedCount = 0;
    let notFoundCount = 0;

    // Update each product
    for (const product of products) {
      const currentUrl = product.image_url;

      // Extract filename from current URL
      // e.g., /assets/generated_images/genotropin_hgh_pen.png -> genotropin_hgh_pen.png
      const filename = currentUrl ? currentUrl.split("/").pop() : null;

      if (filename && urlMap[filename]) {
        const newUrl = urlMap[filename];

        try {
          await client.query(
            "UPDATE products SET image_url = $1 WHERE id = $2",
            [newUrl, product.id]
          );

          console.log(`✓ Updated: ${product.name}`);
          console.log(`  Old: ${currentUrl}`);
          console.log(`  New: ${newUrl}\n`);

          updatedCount++;
        } catch (error) {
          console.error(
            `✗ Failed to update ${product.name}:`,
            error.message,
            "\n"
          );
        }
      } else {
        console.log(
          `⚠ No Cloudinary URL found for: ${product.name} (${filename})\n`
        );
        notFoundCount++;
      }
    }

    console.log("========================================");
    console.log("Database Update Complete!");
    console.log(`Successfully updated: ${updatedCount} products`);
    console.log(`Not found: ${notFoundCount} products`);
    console.log("========================================\n");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
}

// Run the update
updateDatabase();
