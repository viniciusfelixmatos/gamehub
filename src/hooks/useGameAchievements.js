// src/hooks/useGameAchievements.js

import { useState, useEffect } from "react";
import { getGameAchievements } from "../services/gameService";

export function useGameAchievements(appId, steamId, apiKey) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Se a apiKey não for passada por prop, pega automaticamente do .env
  const finalApiKey = apiKey || import.meta.env.VITE_STEAM_API_KEY;

  useEffect(() => {
    // Agora valida usando a chave final resolvida
    if (!appId || !finalApiKey) {
      setAchievements([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    setLoading(true);
    setError(null);

    getGameAchievements(appId, steamId, finalApiKey)
      .then((data) => {
        if (isMounted) {
          setAchievements(data || []);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar conquistas:", err);

        if (isMounted) {
          setError(err);
          setAchievements([]);
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
  }, [appId, steamId, finalApiKey]);

  return {
    achievements,
    loading,
    error,
  };
}
