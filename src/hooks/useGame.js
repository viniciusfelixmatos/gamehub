// src/hooks/useGames.js
import { useEffect, useState } from "react";
import api from "../services/api";

export function useGames(page = 1) {
  // Recebe a página atual (padrão é 1)
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/games", {
          params: {
            page: page, // Envia a página para o RAWG
            page_size: 16, // Fixado em 16 para casar com o número de skeletons e o layout do grid
          },
        });

        setGames(response.data.results);
        setTotalGames(response.data.count);
      } catch (err) {
        setError("Erro ao carregar os jogos.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [page]);

  return { games, totalGames, loading, error };
}
