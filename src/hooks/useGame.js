// src/hooks/useGames.js
import { useEffect, useState } from "react";
import { getPopularGames, searchGames } from "../services/gameService";

export function useGames(page = 1, searchTerm = "") {
  // Estados para armazenar os jogos, total de jogos (para paginação), status de carregamento e erros
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);

        // Controla o fluxo: decide se busca por texto ou se traz a listagem padrão
        if (searchTerm.trim()) {
          const data = await searchGames(searchTerm);
          setGames(data.results);
          setTotalGames(data.count); // Ajusta a paginação para o total de itens encontrados na busca
        } else {
          const data = await getPopularGames(page);
          setGames(data.results);
          setTotalGames(data.count); // Mantém a paginação oficial do catálogo completo
        }
      } catch (err) {
        console.error("Erro interno ao buscar dados no hook useGames:", err);
        setError("Erro ao carregar os jogos.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();

    // O efeito roda novamente sempre que o usuário muda de página OU digita algo novo
  }, [page, searchTerm]);

  return { games, totalGames, loading, error };
}
