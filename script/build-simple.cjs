// Simple build script that doesn't need tsx
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

async function buildServer() {
  console.log("Building server for production...");

  // Read package.json
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];

  // External deps we don't want to bundle
  const externals = allDeps.filter(
    (dep) => !["drizzle-orm", "drizzle-zod", "zod"].includes(dep)
  );

  // Create dist directory if it doesn't exist
  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist", { recursive: true });
  }

  await esbuild.build({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  console.log("Server build complete!");
}

buildServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
