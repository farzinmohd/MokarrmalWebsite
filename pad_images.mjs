import sharp from 'sharp';
import path from 'path';

async function padImage(inputPath, outputPath) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Add 25% padding on all sides (this scales the dish down visually)
        const extendX = Math.round(metadata.width * 0.25);
        const extendY = Math.round(metadata.height * 0.25);
        
        // Get the top-left pixel color for the background to blend perfectly
        const { data } = await image.clone().extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
        
        await image
            .extend({
                top: extendY,
                bottom: extendY,
                left: extendX,
                right: extendX,
                background: { r: data[0], g: data[1], b: data[2], alpha: 1 }
            })
            .toFile(outputPath);
        console.log(`Successfully padded ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    } catch (err) {
        console.error(`Error processing ${inputPath}:`, err);
    }
}

const files = [
    { in: "Shrimp biryani.jpeg", out: "rice_5.png" },
    { in: "Grill shrimp with rice.jpeg", out: "rice_6.png" },
    { in: "Mutton Madhooth.jpeg", out: "rice_7.png" },
    { in: "Chicken madhooth.jpeg", out: "rice_8.png" },
    { in: "Chicken kabsa.jpeg", out: "rice_9.png" },
    { in: "Mandhi chicken with rice.jpeg", out: "rice_10.png" }
];

async function main() {
    const baseDir = "public/images/menu";
    for (const file of files) {
        const inPath = path.join(baseDir, file.in);
        const outPath = path.join(baseDir, file.out);
        await padImage(inPath, outPath);
    }
}

main();
