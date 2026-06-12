import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputPath = path.join(process.cwd(), "public/images/og-image.svg");
const outputPath = path.join(process.cwd(), "public/images/og-image.png");

async function convert() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error(`Input SVG not found at ${inputPath}`);
      process.exit(1);
    }
    
    console.log(`Converting SVG from ${inputPath} to PNG...`);
    await sharp(inputPath)
      .png()
      .toFile(outputPath);
      
    console.log(`Successfully generated PNG at ${outputPath}`);
  } catch (error) {
    console.error("Conversion failed:", error);
    process.exit(1);
  }
}

convert();
