// src/hooks/useGameAchievements.js

import { useState, useEffect } from "react";
import { getGameAchievements } from "../services/gameService";

export function useGameAchievements(appId, steamId, apiKey) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const finalApiKey = apiKey || import.meta.env.VITE_STEAM_API_KEY;

  console.log("[useGameAchievements] Valores recebidos:", {
    appId,
    steamId,
    temApiKey: !!finalApiKey,
  });

  useEffect(() => {
    console.log("[useGameAchievements] Executando useEffect:", {
      appId,
      steamId,
      temApiKey: !!finalApiKey,
    });

    if (!appId || !finalApiKey) {
      console.log("[useGameAchievements] BLOQUEADO:", {
        appId,
        temApiKey: !!finalApiKey,
      });

      setAchievements([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    setLoading(true);
    setError(null);

    console.log("[useGameAchievements] Chamando getGameAchievements...");

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
