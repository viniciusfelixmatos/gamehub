// Hook personalizado para buscar conquistas de um jogo
import { useState, useEffect } from "react";
import { getGameAchievements } from "../services/gameService";

export function useGameAchievements(id) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    setLoading(true);

    getGameAchievements(id)
      .then((data) => {
        if (isMounted) {
          setAchievements(data || []);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar conquistas:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { achievements, loading };
}
