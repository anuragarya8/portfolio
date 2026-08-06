import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "public", "icons");
fs.mkdirSync(out, { recursive: true });

const sizes = [
  { name: "icon-32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

const browser = await chromium.launch({ headless: true });

for (const { name, size } of sizes) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  const fontSize = Math.round(size * 0.55);
  await page.setContent(`<!doctype html><html><body style="margin:0;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;background:#0ea5e9;color:#082f49;font:700 ${fontSize}px ui-sans-serif,system-ui,sans-serif"><div>A</div></body></html>`);
  await page.screenshot({ path: path.join(out, name), type: "png" });
  await page.close();
  console.log("wrote", name);
}

await browser.close();
