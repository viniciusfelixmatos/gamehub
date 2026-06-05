// src/hooks/useGameRelated.js
import { useState, useEffect } from "react";
import { getRelatedGamesByGenre } from "../services/gameService";

export function useGameRelated(genres, currentGameId) {
  const [relatedGames, setRelatedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Chamando a função limpa direto do service
    getRelatedGamesByGenre(genres, currentGameId)
      .then((games) => {
        if (isMounted) setRelatedGames(games);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          console.error(err);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [genres, currentGameId]);

  return { relatedGames, loading, error };
}
