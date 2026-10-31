import { defineConfig } from "astro/config";

const isProduction = process.env.NODE_ENV === "production";
// Repository rename-safe: GitHub Pages project sites use the current repository slug.
const repositorySlug = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.ASTRO_BASE_PATH ?? (isProduction ? `/${repositorySlug || "nextbridge"}` : "/");
const site = process.env.ASTRO_SITE_URL ?? "https://emotigom.github.io";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  output: "static",
  build: {
    assets: "assets"
  },
  vite: {
    build: {
      sourcemap: false
    }
  }
});
