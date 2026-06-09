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

        // Executa em paralelo as requisições de detalhes textuais e capturas de tela do jogo
        const [gameData, screenshotData] = await Promise.all([
          getGameById(id),
          getGameScreenshots(id).catch(() => []),
        ]);

        // Traduz o bloco de descrição assincronamente caso o campo exista no retorno da API
        if (gameData && gameData.description) {
          gameData.description = await translateText(gameData.description);
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

  return { game, screenshots, loading, error };
}
