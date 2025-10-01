import fs from "fs";
import path from "path";

const publicAssets = path.join(process.cwd(), "public/assets");

function getFilesRecursively(dir) {
    let results = {};
    const categories = fs.readdirSync(dir);
    categories.forEach((cat) => {
        const catPath = path.join(dir, cat);
        const stats = fs.statSync(catPath);
        if (stats.isDirectory()) {
            results[cat] = {};
            const subCats = fs.readdirSync(catPath);
            subCats.forEach((sub) => {
                const subPath = path.join(catPath, sub);
                if (fs.statSync(subPath).isDirectory()) {
                    results[cat][sub] = fs.readdirSync(subPath).map(
                        (file) => `/assets/${cat}/${sub}/${file}`
                    );
                } else {
                    results[cat][sub] = [`/assets/${cat}/${sub}`];
                }
            });
        }
    });
    return results; s
}

const assets = getFilesRecursively(publicAssets);

// Write to src/assets/products.js
const output = `export const products = ${JSON.stringify(assets, null, 2)};`;
fs.writeFileSync(path.join(process.cwd(), "src/assets/products.js"), output);
console.log("Assets generated successfully!");
