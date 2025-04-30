import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const API_BASE_URL = "https://youtube-download-api.matheusishiyama.repl.co";

export const GET: RequestHandler = async ({ url }) => {
  const videoId = url.searchParams.get("videoId");

  if (!videoId) {
    return json({ error: "Video ID is required" }, { status: 400 });
  }

  try {
    // First get video info
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const infoResponse = await fetch(
      `${API_BASE_URL}/info/?url=${encodeURIComponent(videoUrl)}`
    );

    if (!infoResponse.ok) {
      throw new Error("Failed to fetch video info");
    }

    const info = await infoResponse.json();

    // Return a simplified format list since the API only supports mp3
    return json({
      formats: [
        {
          itag: "mp3",
          quality: "High",
          ext: "mp3",
          size: "Unknown",
          mimeType: "audio/mpeg",
        },
      ],
      videoInfo: info,
    });
  } catch (error) {
    console.error("Error fetching audio formats:", error);
    return json(
      { error: "Failed to fetch audio formats. Please try again later." },
      { status: 500 }
    );
  }
};
