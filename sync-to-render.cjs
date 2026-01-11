// sync-to-render.cjs
// This script copies ALL products from local to Render with Cloudinary URLs

const { Client } = require("pg");

const LOCAL_DB = "postgresql://postgres:mypassword@localhost:5432/commerce_db";
const RENDER_DB =
  "postgresql://commerce_db_r0ip_user:pFm7ZnXCdN90BTAkMPvHaIDStXRPbO28@dpg-d5fq5lmr433s73b65dgg-a.virginia-postgres.render.com/commerce_db_r0ip";

async function syncDatabases() {
  const localClient = new Client({ connectionString: LOCAL_DB });
  const renderClient = new Client({
    connectionString: RENDER_DB,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await localClient.connect();
    await renderClient.connect();

    console.log("Connected to both databases\n");

    // Get all products from local database
    const result = await localClient.query(
      "SELECT id, name, slug, description, short_description, price, compare_at_price, category_id, brand, image_url, stock, sku, featured, active FROM products"
    );

    const products = result.rows;
    console.log(`Found ${products.length} products in local database\n`);

    let updatedCount = 0;

    for (const product of products) {
      try {
        // Update by slug (since IDs might be different)
        const updateResult = await renderClient.query(
          `UPDATE products SET 
            image_url = $1
          WHERE slug = $2`,
          [product.image_url, product.slug]
        );

        if (updateResult.rowCount > 0) {
          console.log(`✓ Updated: ${product.name}`);
          console.log(`  Image: ${product.image_url}\n`);
          updatedCount++;
        } else {
          console.log(
            `⚠ No match found for: ${product.name} (${product.slug})\n`
          );
        }
      } catch (error) {
        console.error(`✗ Failed for ${product.name}:`, error.message, "\n");
      }
    }

    console.log("========================================");
    console.log("Sync Complete!");
    console.log(`Updated: ${updatedCount} products`);
    console.log("========================================\n");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await localClient.end();
    await renderClient.end();
    console.log("Database connections closed");
  }
}

syncDatabases();
