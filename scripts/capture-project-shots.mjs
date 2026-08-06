import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "projects");
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  { slug: "quizverse", url: "https://quizverse.world/" },
  { slug: "contentx-studio", url: "https://content-x.ai/" },
  { slug: "toba-tech", url: "https://intelli-verse-x.ai/" },
  { slug: "chhavva", url: "https://chhavva.vercel.app" },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const target of targets) {
  const file = path.join(outDir, `${target.slug}.jpg`);
  try {
    console.log(`Capturing ${target.slug} → ${target.url}`);
    await page.goto(target.url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForTimeout(2500);
    await page.screenshot({
      path: file,
      type: "jpeg",
      quality: 82,
      fullPage: false,
    });
    console.log(`Saved ${file}`);
  } catch (err) {
    console.error(`Failed ${target.slug}:`, err.message);
  }
}

await browser.close();
