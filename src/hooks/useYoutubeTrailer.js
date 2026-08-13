// src/hooks/useYoutubeTrailer.js
import { useState, useEffect } from "react";
import { getYoutubeTrailer } from "../services/gameService";

export function useYoutubeTrailer(gameName, gameId = null) {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se nem o nome nem o ID do jogo chegaram, reseta os estados
    if (!gameName && !gameId) {
      setVideoId(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getYoutubeTrailer(gameName, gameId)
      .then((id) => {
        if (isMounted) {
          setVideoId(id);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [gameName, gameId]);

  return { videoId, loading, error };
}
