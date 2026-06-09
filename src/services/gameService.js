// src/services/gameService.js
import api from "./api";

// Executa a listagem padrão do catálogo aplicando paginação, filtro de gênero e ordenação
export const getPopularGames = async (
  page = 1,
  genre = "",
  ordering = "-added",
) => {
  const response = await api.get("/games", {
    params: {
      page: page,
      page_size: 16,
      genres: genre || undefined, // Envia apenas se houver gênero selecionado
      ordering: ordering || undefined, // Envia a ordenação ativa ou remove se nulo
    },
  });
  return response.data;
};

// Busca detalhes de um jogo específico baseado no identificador único
export const getGameById = async (id) => {
  const response = await api.get(`/games/${id}`);
  return response.data;
};

// Busca imagens de captura de tela de um jogo específico baseado no identificador único
export const getGameScreenshots = async (id) => {
  const response = await api.get(`/games/${id}/screenshots`);
  return response.data.results;
};

// Busca jogos recomendados baseando-se nos gêneros e omitindo o registro do jogo atual
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

// Busca trailers curtos hospedados nativamente na base de dados do jogo solicitado
export const getGameTrailers = async (id) => {
  const response = await api.get(`/games/${id}/movies`);
  return response.data.results;
};

// Executa uma requisição externa na API do Google para extrair o identificador de vídeo do trailer oficial
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

// Busca a listagem de conquistas e troféus associados ao jogo solicitado
export const getGameAchievements = async (id) => {
  const response = await api.get(`/games/${id}/achievements`, {
    params: {
      key: import.meta.env.VITE_RAWG_API_KEY,
      page_size: 40,
    },
  });
  return response.data.results;
};

// Executa uma busca por termo textual aplicando paginação, filtro de gênero e ordenação nos resultados
export const searchGames = async (
  query,
  page = 1,
  genre = "",
  ordering = "-added",
) => {
  const response = await api.get("/games", {
    params: {
      search: query,
      page: page,
      page_size: 16,
      genres: genre || undefined, // Permite filtrar categorias dentro da busca por texto
      ordering: ordering || undefined, // Permite ordenar os resultados encontrados por relevância/nota
    },
  });
  return response.data;
};
