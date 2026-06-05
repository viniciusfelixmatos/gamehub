// src/hooks/useYoutubeTrailer.js
import { useState, useEffect } from "react";
import { getYoutubeTrailer } from "../services/gameService";

export function useYoutubeTrailer(gameName) {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameName) return;

    let isMounted = true;
    setLoading(true);

    getYoutubeTrailer(gameName)
      .then((id) => {
        if (isMounted) setVideoId(id);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [gameName]);

  return { videoId, loading };
}
