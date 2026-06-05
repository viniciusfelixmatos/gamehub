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

// Função para buscar jogos relacionados por gênero, excluindo o jogo atual
export const getRelatedGamesByGenre = async (genres, currentId) => {
  if (!genres || genres.length === 0) return [];

  // Transforma o array de gêneros em uma string separada por vírgula
  const genreslugs = genres.map((g) => g.slug).join(",");

  const response = await api.get("/games", {
    params: {
      genres: genreslugs,
      page_size: 5, // Buscamos 5 para garantir que mesmo tirando o atual, sobrem 4
    },
  });

  const results = response.data.results;
  if (!results) return [];

  // Filtra para remover o jogo atual e limita em até 4 recomendações
  return results
    .filter((game) => String(game.id) !== String(currentId))
    .slice(0, 4);
};

// Função para buscar trailers de um jogo específico por ID
export const getGameTrailers = async (id) => {
  const response = await api.get(`/games/${id}/movies`);
  return response.data.results; // Retorna a lista de vídeos
};

// Função para buscar o trailer oficial no YouTube usando a API do Google
export const getYoutubeTrailer = async (gameName) => {
  const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  // Criamos uma busca refinada para o algoritmo do YouTube trazer o vídeo certo
  const searchQuery = encodeURIComponent(`${gameName} official trailer`);

  // Fazemos o fetch direto na API do Google
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=1&key=${YOUTUBE_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar trailer no YouTube");
  }

  const data = await response.json();

  // Retorna o ID do primeiro vídeo (ex: "dQw4w9WgXcQ")
  return data.items?.[0]?.id?.videoId || null;
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
