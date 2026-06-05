// src/hooks/useGameTrailer.js
import { useState, useEffect } from "react";
import { getGameTrailers } from "../services/gameService";

export function useGameTrailer(id) {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getGameTrailers(id)
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          // Tentar buscar um trailer que mencione "english" ou "en" no nome
          const englishTrailer = data.find(
            (t) =>
              t.name?.toLowerCase().includes("english") ||
              t.name?.toLowerCase().includes("en ") ||
              t.name?.toLowerCase().includes("official"),
          );

          // Se achou o trailer em inglês, usa ele. Se não achou então use o primeiro que aparece (fallback)
          setTrailer(englishTrailer || data[0]);
        } else {
          if (isMounted) setTrailer(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Erro ao carregar o trailer");
          console.error("Erro ao buscar trailer:", err);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { trailer, loading, error };
}
