const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("Building server for production...");

// Create dist directory
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist", { recursive: true });
}

// Read package.json to get dependencies
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const allDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
];

// Filter out deps we want to bundle
const externals = allDeps.filter(
  (dep) => !["drizzle-orm", "drizzle-zod", "zod"].includes(dep)
);

//
// Build command using npx esbuild
const externalFlags = externals.map((dep) => `--external:${dep}`).join(" ");

const buildCmd = `npx esbuild server/index.ts --bundle --platform=node --format=cjs --outfile=dist/index.cjs --minify ${externalFlags} --define:process.env.NODE_ENV='"production"'`;

console.log("Running esbuild...");
execSync(buildCmd, { stdio: "inherit" });

console.log("Server build complete!");
