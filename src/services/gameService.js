import api from "./api";

// Função para buscar jogos populares com paginação
export const getPopularGames = async (page = 1) => {
  const response = await api.get("/games", {
    params: {
      page: page,
      page_size: 16,
    },
  });
  return response.data;
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

  const genreslugs = genres.map((g) => g.slug).join(",");

  const response = await api.get("/games", {
    params: {
      genres: genreslugs,
      page_size: 5,
    },
  });

  const results = response.data.results;
  if (!results) return [];

  return results
    .filter((game) => String(game.id) !== String(currentId))
    .slice(0, 4);
};

// Função para buscar trailers de um jogo específico por ID
export const getGameTrailers = async (id) => {
  const response = await api.get(`/games/${id}/movies`);
  return response.data.results;
};

// Função para buscar o trailer oficial no YouTube usando a API do Google
export const getYoutubeTrailer = async (gameName) => {
  const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const searchQuery = encodeURIComponent(`${gameName} official trailer`);

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=1&key=${YOUTUBE_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar trailer no YouTube");
  }

  const data = await response.json();
  return data.items?.[0]?.id?.videoId || null;
};

// Função para buscar conquistas de um jogo específico por ID
export const getGameAchievements = async (id) => {
  const response = await api.get(`/games/${id}/achievements`, {
    params: {
      key: import.meta.env.VITE_RAWG_API_KEY,
      page_size: 40,
    },
  });
  return response.data.results;
};

// Retornado apenas os dados relevantes para a busca, alinhado com o que o seu Grid espera
export const searchGames = async (query) => {
  const response = await api.get("/games", {
    params: {
      search: query,
      page_size: 16,
    },
  });
  return response.data;
};
