import { build as esbuild } from "esbuild";
import { readFile } from "fs/promises";

async function buildServer() {
  console.log("Building server for production...");
  
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  
  // External deps we don't want to bundle
  const externals = allDeps.filter((dep) => 
    !["drizzle-orm", "drizzle-zod", "zod"].includes(dep)
  );

  await esbuild({
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
