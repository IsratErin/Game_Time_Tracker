import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

function walk(dir) {
  const files = readdirSync(dir);
  for (const file of files) {
    const full = join(dir, file);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (file.endsWith(".js")) {
      let content = readFileSync(full, "utf8");
      // Replace .ts or .mts imports with .js
      content = content.replace(/from\s+["']([^"']+)\.ts["']/g, 'from "$1.js"');
      content = content.replace(
        /require\(["']([^"']+)\.ts["']\)/g,
        'require("$1.js")'
      );
      writeFileSync(full, content);
    }
  }
}

walk("./dist");
console.log("✅ Rewrote .ts imports to .js in dist/");
