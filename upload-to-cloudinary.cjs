// upload-to-cloudinary.js
// This script uploads all product images to Cloudinary

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dpcy6bdg6",
  api_key: "845784384234745",
  api_secret: "uN0ub_KtFG8ACgwfyM828p6EaXY",
});

// Path to your images folder
const imagesFolder = path.join(
  __dirname,
  "attached_assets",
  "generated_images"
);

// Function to upload all images
async function uploadAllImages() {
  console.log("Starting upload to Cloudinary...\n");

  try {
    // Read all files in the images folder
    const files = fs.readdirSync(imagesFolder);
    const pngFiles = files.filter((file) => file.endsWith(".png"));

    console.log(`Found ${pngFiles.length} images to upload\n`);

    const uploadedImages = [];

    // Upload each image
    for (const file of pngFiles) {
      const filePath = path.join(imagesFolder, file);
      const fileName = path.parse(file).name; // Get filename without extension

      try {
        console.log(`Uploading ${file}...`);

        const result = await cloudinary.uploader.upload(filePath, {
          folder: "project26/products", // Organize in a folder
          public_id: fileName, // Use original filename
          overwrite: true, // Overwrite if exists
        });

        uploadedImages.push({
          originalName: file,
          cloudinaryUrl: result.secure_url,
          publicId: result.public_id,
        });

        console.log(`✓ Uploaded successfully: ${result.secure_url}\n`);
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error.message, "\n");
      }
    }

    // Save the mapping to a JSON file
    fs.writeFileSync(
      "cloudinary-urls.json",
      JSON.stringify(uploadedImages, null, 2)
    );

    console.log("\n========================================");
    console.log("Upload Complete!");
    console.log(
      `Successfully uploaded: ${uploadedImages.length}/${pngFiles.length} images`
    );
    console.log("URLs saved to: cloudinary-urls.json");
    console.log("========================================\n");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the upload
uploadAllImages();
