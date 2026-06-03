import api from "./api";

// Função para buscar jogos com base em filtros
export const getPopularGames = async () => {
  const response = await api.get("/games");
  return response.data.results;
};

// Função para buscar detalhes de um jogo específico por ID
export const getGameById = async (id) => {
  const response = await api.get(`/games/${id}`);
  return response.data;
};

// Função para buscar screenshots de um jogo específico por ID
export const getGameScreenshots = async (id) => {
  const response = await api.get(`/games/${id}/screenshots`);
  return response.data.results;
};

// Função para buscar jogos com base em uma consulta de pesquisa
export const searchGames = async (query) => {
  const response = await api.get("/games", {
    params: {
      search: query,
    },
  });

  return response.data.results;
};
