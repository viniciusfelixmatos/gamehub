import { useEffect, useState } from "react";
import { getGameById, getGameScreenshots } from "../services/gameService";

export function useGameDetails(id) {
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]); // <-- Novo estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca os detalhes e as screenshots ao mesmo tempo
        const [gameData, screenshotData] = await Promise.all([
          getGameById(id),
          getGameScreenshots(id).catch(() => []), // Evita quebrar a página se as fotos falharem
        ]);

        setGame(gameData);
        setScreenshots(screenshotData);
      } catch (err) {
        setError("Erro ao carregar os detalhes do jogo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllDetails();
    }
  }, [id]);

  return { game, screenshots, loading, error }; // <-- Retorna as fotos também
}
