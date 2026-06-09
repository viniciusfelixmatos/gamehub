// src/hooks/useGames.js
import { useEffect, useState } from "react";
import { getPopularGames, searchGames } from "../services/gameService";

/**
 * Hook customizado para gerenciar a listagem, busca, paginação e filtragem de jogos.
 */
export function useGames(
  page = 1,
  searchTerm = "",
  genre = "",
  ordering = "-added",
) {
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);

        // Verifica se há um termo de busca ativo para definir o serviço de dados apropriado
        if (searchTerm.trim()) {
          // Executa a busca por texto passando as opções de gênero e ordenação aplicadas
          const data = await searchGames(searchTerm, page, genre, ordering);
          setGames(data.results);
          setTotalGames(data.count);
        } else {
          // Executa a listagem padrão do catálogo aplicando paginação, gênero e ordenação
          const data = await getPopularGames(page, genre, ordering);
          setGames(data.results);
          setTotalGames(data.count);
        }
      } catch (err) {
        console.error("Erro interno ao buscar dados no hook useGames:", err);
        setError("Erro ao carregar os jogos.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();

    // Dispara a requisição sempre que houver alteração em qualquer um dos parâmetros de paginação ou filtros
  }, [page, searchTerm, genre, ordering]);

  return { games, totalGames, loading, error };
}
