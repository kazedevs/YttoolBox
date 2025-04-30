import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { exec } from "child_process";
import { promisify } from "util";
import { readFile, writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const execAsync = promisify(exec);

// Check if yt-dlp is installed
async function checkYtDlp() {
  try {
    const { stdout } = await execAsync("yt-dlp --version");
    console.log("yt-dlp version:", stdout.trim());
    return true;
  } catch (error) {
    console.error("yt-dlp not installed:", error);
    return false;
  }
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Check if yt-dlp is installed
    const isYtDlpInstalled = await checkYtDlp();
    if (!isYtDlpInstalled) {
      return json(
        {
          error:
            "Audio download service is not available. Please try again later.",
        },
        { status: 503 }
      );
    }

    const { url } = await request.json();
    console.log("Received request for URL:", url);

    if (!url) {
      return json({ error: "URL is required" }, { status: 400 });
    }

    // Create a temporary file path
    const tempDir = tmpdir();
    const outputPath = join(tempDir, `audio-${Date.now()}.mp3`);
    console.log("Temporary file path:", outputPath);

    // Optimized yt-dlp command for faster downloads:
    // - Use best audio format that's already in mp3
    // - Skip video download
    // - Use faster download options
    // - Set a reasonable timeout
    const command = `yt-dlp -f "ba" -x --audio-format mp3 --audio-quality 0 --no-playlist --no-warnings --no-cache-dir --no-progress --concurrent-fragments 4 --throttled-rate 2M -o "${outputPath}" "${url}"`;
    console.log("Executing command:", command);

    try {
      // Set a timeout of 2 minutes (reduced from 5)
      const result = (await Promise.race([
        execAsync(command),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Download timed out after 2 minutes")),
            2 * 60 * 1000
          )
        ),
      ])) as { stdout: string; stderr: string };

      console.log("yt-dlp stdout:", result.stdout);
      if (result.stderr) console.log("yt-dlp stderr:", result.stderr);

      // Check if the file was created
      try {
        await readFile(outputPath);
      } catch (error) {
        console.error("Output file not found:", error);
        return json(
          { error: "Failed to create audio file. Please try again." },
          { status: 500 }
        );
      }

      // Read the file
      console.log("Reading file:", outputPath);
      const fileBuffer = await readFile(outputPath);
      console.log("File read successfully, size:", fileBuffer.length);

      // Clean up the temporary file
      await unlink(outputPath);
      console.log("Temporary file cleaned up");

      // Return the audio file
      return new Response(fileBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": 'attachment; filename="audio.mp3"',
        },
      });
    } catch (execError) {
      console.error("Error executing yt-dlp:", execError);
      // Try to clean up the temporary file if it exists
      try {
        await unlink(outputPath);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary file:", cleanupError);
      }
      return json(
        { error: `Failed to download audio: ${execError.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in download endpoint:", error);
    return json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
};
