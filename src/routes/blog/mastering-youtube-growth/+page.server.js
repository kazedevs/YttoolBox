import { marked } from "marked";
import fs from "fs";
import path from "path";

export async function load() {
  const filePath = path.join(
    process.cwd(),
    "static",
    "blog",
    "mastering-youtube-growth",
    "mastering-youtube-growth.md"
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Split frontmatter and content
  const parts = fileContent.split("---");
  const frontmatter = parts[1];
  const markdown = parts.slice(2).join("---"); // Join back any content after the frontmatter

  // Parse frontmatter
  const metadata = {};
  const frontmatterLines = frontmatter.trim().split("\n");
  frontmatterLines.forEach((line) => {
    const [key, ...value] = line.split(":");
    if (key && value) {
      metadata[key.trim()] = value.join(":").trim().replace(/"/g, "");
    }
  });

  // Parse markdown content
  const content = marked.parse(markdown);

  return {
    ...metadata,
    content,
  };
}
