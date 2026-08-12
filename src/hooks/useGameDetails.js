// src/hooks/useGameDetails.js

import { useEffect, useState } from "react";
import { getGameById, getGameScreenshots } from "../services/gameService";
import { translateText } from "../utils/translate";

export function useGameDetails(id) {
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const [gameData, screenshotData] = await Promise.all([
          getGameById(id),
          getGameScreenshots(id).catch(() => []),
        ]);

        if (gameData && gameData.description_raw) {
          const translated = await translateText(gameData.description_raw);

          gameData.description_raw = translated;
          gameData.description = translated;
        }

        setGame(gameData);
        setScreenshots(screenshotData);
      } catch (err) {
        console.error(
          "Erro interno ao buscar detalhes no hook useGameDetails:",
          err,
        );

        setError("Erro ao carregar os detalhes do jogo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllDetails();
    }
  }, [id]);

  return {
    game,
    screenshots,
    loading,
    error,
  };
}
