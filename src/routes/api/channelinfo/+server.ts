import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const YOUTUBE_API_KEY = "AIzaSyDVarzC_nmS64ovmqNG0sED0cOXuk2c5Xs";

export const GET: RequestHandler = async ({ url }) => {
  const channelUrl = url.searchParams.get("channelUrl");

  if (!channelUrl) {
    return json({ error: "Channel URL is required" }, { status: 400 });
  }

  try {
    // Extract channel identifier from URL
    const channelId = extractChannelId(channelUrl);
    console.log("Extracted channel ID:", channelId); // Debug log

    if (!channelId) {
      return json(
        {
          error:
            "Invalid YouTube channel URL. Please use one of these formats:\n" +
            "- https://youtube.com/@username\n" +
            "- https://youtube.com/channel/UC...\n" +
            "- https://youtube.com/c/username\n" +
            "- https://youtube.com/user/username\n" +
            "- @username",
        },
        { status: 400 }
      );
    }

    // Determine if we need to use forUsername or id parameter
    let apiUrl = "";
    let searchFirst = false;

    if (channelId.startsWith("@")) {
      // For @handles, try searching first
      searchFirst = true;
      const searchQuery = channelId.substring(1);
      apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        searchQuery
      )}&type=channel&maxResults=1&key=${YOUTUBE_API_KEY}`;
    } else if (channelId.startsWith("UC")) {
      // Direct channel ID lookup
      apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`;
    } else {
      // For custom URLs and usernames, try searching first
      searchFirst = true;
      apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        channelId
      )}&type=channel&maxResults=1&key=${YOUTUBE_API_KEY}`;
    }

    console.log("Using API URL:", apiUrl); // Debug log

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      console.error("YouTube API Error:", data.error);
      if (data.error.code === 403) {
        return json(
          {
            error: "API quota exceeded. Please try again later.",
          },
          { status: 429 }
        );
      }
      return json(
        {
          error: `YouTube API Error: ${data.error.message}`,
        },
        { status: 400 }
      );
    }

    // Handle different response structures based on the API endpoint used
    let channelInfo;
    if (data.items && data.items.length > 0) {
      if (searchFirst) {
        // For search results, we need to make another request to get the channel details
        const foundChannelId = data.items[0].id.channelId;
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${foundChannelId}&key=${YOUTUBE_API_KEY}`
        );
        const channelData = await channelResponse.json();

        if (channelData.items && channelData.items.length > 0) {
          channelInfo = channelData.items[0];
        } else {
          return json(
            {
              error:
                "Channel not found. Please make sure:\n" +
                "1. The channel URL is correct\n" +
                "2. The channel is public\n" +
                "3. Try using the channel's @handle or direct channel URL",
            },
            { status: 404 }
          );
        }
      } else {
        channelInfo = data.items[0];
      }
    } else {
      return json(
        {
          error:
            "Channel not found. Please make sure:\n" +
            "1. The channel URL is correct\n" +
            "2. The channel is public\n" +
            "3. Try using the channel's @handle or direct channel URL",
        },
        { status: 404 }
      );
    }

    // Extract the high-res thumbnail URL
    const thumbnailUrl =
      channelInfo.snippet.thumbnails.high?.url ||
      channelInfo.snippet.thumbnails.medium?.url ||
      channelInfo.snippet.thumbnails.default?.url;

    if (!thumbnailUrl) {
      return json(
        {
          error: "No profile picture found for this channel.",
        },
        { status: 404 }
      );
    }

    return json({
      channelId: channelInfo.id,
      title: channelInfo.snippet.title,
      description: channelInfo.snippet.description,
      thumbnailUrl,
    });
  } catch (error) {
    console.error("Error fetching channel info:", error);
    return json(
      { error: "Failed to fetch channel information. Please try again later." },
      { status: 500 }
    );
  }
};

/**
 * Extracts channel identifier from various YouTube URL formats
 * @param {string} url - YouTube channel URL
 * @returns {string|null} - Channel ID, @handle, or username
 */
function extractChannelId(url: string): string | null {
  if (!url) return null;

  try {
    // Normalize the URL
    url = url.trim().toLowerCase();

    // Handle various URL formats
    const patterns = [
      // @username format
      /(?:youtube\.com\/@|@)([a-zA-Z0-9_-]+)/i,
      // Channel ID format
      /(?:youtube\.com\/channel\/)(UC[a-zA-Z0-9_-]+)/i,
      // Custom URL format
      /(?:youtube\.com\/c\/|youtube\.com\/)([a-zA-Z0-9_-]+)/i,
      // User format
      /(?:youtube\.com\/user\/)([a-zA-Z0-9_-]+)/i,
      // Direct channel name/handle (without domain)
      /^@?([a-zA-Z0-9_-]+)$/i,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        // If it's a channel ID (starts with UC), return it directly
        if (match[1].startsWith("UC")) {
          return match[1];
        }
        // For handles, prepend @ if not present
        if (pattern === patterns[0] && !match[1].startsWith("@")) {
          return `@${match[1]}`;
        }
        return match[1];
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting channel ID:", error);
    return null;
  }
}
