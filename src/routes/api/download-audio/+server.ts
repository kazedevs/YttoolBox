import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const API_BASE_URL = "https://youtube-download-api.matheusishiyama.repl.co";

export const GET: RequestHandler = async ({ url }) => {
  const videoId = url.searchParams.get("videoId");

  if (!videoId) {
    return json({ error: "Video ID is required" }, { status: 400 });
  }

  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Fetch the audio from the external API
    const response = await fetch(
      `${API_BASE_URL}/mp3/?url=${encodeURIComponent(videoUrl)}`
    );

    if (!response.ok) {
      throw new Error("Failed to download audio");
    }

    // Get the audio data as a blob
    const audioBlob = await response.blob();

    // Set appropriate headers
    const headers = new Headers();
    headers.set("Content-Type", "audio/mpeg");
    headers.set(
      "Content-Disposition",
      `attachment; filename="audio-${videoId}.mp3"`
    );

    // Return the audio file
    return new Response(audioBlob, { headers });
  } catch (error) {
    console.error("Error downloading audio:", error);
    return json(
      { error: "Failed to download audio. Please try again later." },
      { status: 500 }
    );
  }
};
