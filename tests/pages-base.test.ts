import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("GitHub Pages repository rename compatibility", () => {
  it("uses the actual repository name as the Pages base in both workflows", async () => {
    for (const name of ["ci.yml", "pages.yml"]) {
      const yaml = await readFile(new URL(`../.github/workflows/${name}`, import.meta.url), "utf8");
      expect(yaml).toContain("ASTRO_BASE_PATH: /${{ github.event.repository.name }}");
      expect(yaml).not.toContain("ASTRO_BASE_PATH: /nextbridge");
    }
  });

  it("derives the default build base from the GitHub repository and checks scoped assets", async () => {
    const config = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");
    const checker = await readFile(new URL("../scripts/check-build.mjs", import.meta.url), "utf8");
    expect(config).toContain('process.env.GITHUB_REPOSITORY?.split("/")[1]');
    expect(checker).toContain('process.env.GITHUB_REPOSITORY?.split("/")[1]');
    expect(checker).toContain('assetPath.startsWith(`${expectedBase}/`)');
    expect(checker).not.toContain("nextbridge\\/|\\/");
  });
});
