// src/hooks/useYoutubeTrailer.js
import { useState, useEffect } from "react";
import { getYoutubeTrailer } from "../services/gameService";

export function useYoutubeTrailer(gameName) {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se o nome do jogo ainda não chegou, reseta os estados e não faz a busca
    if (!gameName) {
      setVideoId(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getYoutubeTrailer(gameName)
      .then((id) => {
        if (isMounted) {
          setVideoId(id);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar trailer do YouTube:", err);
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
  }, [gameName]);

  return { videoId, loading, error };
}
