// src/hooks/useGames.js

import { useEffect, useState } from "react";
import api from "../services/api";

export function useGames() {
  // Estado para armazenar os jogos, o status de carregamento e erros
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar os jogos
    const fetchGames = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        const response = await api.get("/games"); // Faz a requisição para a API
        setGames(response.data.results); // Armazena os jogos no estado
      } catch (err) {
        setError("Erro ao carregar os jogos."); // Define a mensagem de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchGames(); // Chama a função para buscar os jogos quando o componente montar
  }, []); // O array vazio garante que o efeito rode apenas uma vez

  return { games, loading, error }; // Retorna os jogos, o status de carregamento e erros
}
