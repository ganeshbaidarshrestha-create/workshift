import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const files = [
  "scripts/country-rules.js",
  "scripts/supabase.js",
  "scripts/data.js",
  "scripts/matching.js",
  "scripts/store.js",
  "scripts/dom.js",
  "scripts/actions/public-actions.js",
  "scripts/actions/portal-actions.js",
  "scripts/renderers/shared.js",
  "scripts/renderers/worker.js",
  "scripts/renderers/employer.js",
  "scripts/renderers/household.js",
  "scripts/renderers.js",
  "scripts/actions.js",
  "scripts/main.js"
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(root, relativePath), content, "utf8");
}

const parts = files.map((file) => {
  let content = read(file);
  content = content.replace(/^import\s.+?;\r?\n/gms, "");
  content = content.replace(/\bexport\s+/g, "");
  return `// FILE: ${file}\n${content}`;
});

const bundle = parts.join("\n\n");
write("scripts/app.bundle.js", bundle);

const templatePath = path.join(root, "index.template.html");
if (fs.existsSync(templatePath)) {
  const template = read("index.template.html");
  const escapedBundle = bundle.replace(/<\/script>/g, "<\\/script>");
  const inlineScript = `<script>\n${escapedBundle}\n</script>`;
  const output = template.replace("__WORKSHIFT_INLINE_BUNDLE__", inlineScript);
  write("index.html", output);
}

console.log("Built scripts/app.bundle.js");
