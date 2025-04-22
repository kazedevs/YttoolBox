import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY_COMMENTS;

export const GET: RequestHandler = async ({ url }) => {
  const videoId = url.searchParams.get("videoId");

  if (!videoId) {
    return json({ error: "Video ID is required" }, { status: 400 });
  }

  try {
    // First, get the video details to get the channel ID
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const videoData = await videoResponse.json();

    if (!videoData.items || videoData.items.length === 0) {
      return json({ error: "Video not found" }, { status: 404 });
    }

    // Then fetch comments
    const commentsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100&key=${YOUTUBE_API_KEY}`
    );
    const commentsData = await commentsResponse.json();

    if (commentsData.error) {
      return json({ error: commentsData.error.message }, { status: 400 });
    }

    const comments = commentsData.items.map((item: any) => ({
      text: item.snippet.topLevelComment.snippet.textDisplay,
      authorName: item.snippet.topLevelComment.snippet.authorDisplayName,
      authorProfileUrl:
        item.snippet.topLevelComment.snippet.authorProfileImageUrl,
      publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
      likeCount: item.snippet.topLevelComment.snippet.likeCount,
    }));

    return json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return json({ error: "Failed to fetch comments" }, { status: 500 });
  }
};
