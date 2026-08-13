// src/services/gameService.js
import api from "./api";

// Helpers para gerar URLs de imagens em alta definição da IGDB
const getCoverUrl = (imageId) =>
  imageId
    ? `https://images.igdb.com/igdb/image/upload/t_1080p/${imageId}.jpg`
    : "https://via.placeholder.com/264x352?text=Sem+Imagem";

const getScreenshotUrl = (imageId) =>
  imageId
    ? `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${imageId}.jpg`
    : "";

// Mapeamento de Slugs/Nomes comuns de gêneros para IDs numéricos da IGDB
const GENRE_MAP = {
  action: 4,
  "action-adventure": 31,
  adventure: 31,
  arcade: 33,
  fighting: 4,
  indie: 32,
  platformer: 8,
  puzzle: 9,
  racing: 10,
  rpg: 12,
  shooter: 5,
  simulation: 13,
  sports: 14,
  strategy: 15,
  card: 16,
  moba: 36,
};

// Converte a string do gênero vinda do frontend no ID numérico da IGDB
const getGenreFilter = (genre) => {
  if (!genre) return "";

  const key = genre.toLowerCase().trim();
  const genreId = GENRE_MAP[key];

  return genreId ? ` & genres = (${genreId})` : ` & genres.name ~ *"${genre}"*`;
};

// Executa a listagem padrão do catálogo aplicando paginação, filtro de gênero e ordenação
export const getPopularGames = async (
  page = 1,
  genre = "",
  ordering = "-added",
) => {
  try {
    const limit = 16;
    const offset = (page - 1) * limit;

    const genreFilter = getGenreFilter(genre);

    let sortClause = "sort total_rating desc;";

    if (ordering.includes("released")) {
      sortClause = "sort first_release_date desc;";
    }

    if (ordering.includes("name")) {
      sortClause = "sort name asc;";
    }

    // ADICIONADO: platforms.name e platforms.abbreviation na busca
    const body = `
      fields name, cover.image_id, genres.name, first_release_date, total_rating, platforms.name, platforms.abbreviation;
      where cover != null${genreFilter};
      ${sortClause}
      limit ${limit};
      offset ${offset};
    `;

    const response = await api.post("/games", body);

    const results = response.data.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: getCoverUrl(game.cover?.image_id),
      genres: game.genres ? game.genres.map((g) => ({ name: g.name })) : [],
      // ADICIONADO: Mapeamento do array de plataformas
      platforms: game.platforms
        ? game.platforms.map((p) => ({
            name: p.abbreviation || p.name,
          }))
        : [],
      released: game.first_release_date
        ? new Date(game.first_release_date * 1000).toLocaleDateString("pt-BR")
        : "N/A",
      rating: game.total_rating
        ? parseFloat((game.total_rating / 20).toFixed(1))
        : 4.0,
    }));

    return {
      results,
      count: 5000,
    };
  } catch (error) {
    console.error("Erro em getPopularGames (IGDB):", error);
    throw error;
  }
};

// Busca detalhes de um jogo específico baseado no identificador único
export const getGameById = async (id) => {
  try {
    const body = `
      fields name, summary, storyline, cover.image_id, genres.name, first_release_date, total_rating, screenshots.image_id;
      where id = ${id};
    `;

    const response = await api.post("/games", body);
    const game = response.data[0];

    if (!game) {
      throw new Error("Jogo não encontrado");
    }

    const description =
      game.summary || game.storyline || "Sem descrição disponível.";

    return {
      id: game.id,
      name: game.name,
      description: description,
      description_raw: description,
      background_image: getCoverUrl(game.cover?.image_id),
      genres: game.genres ? game.genres.map((g) => ({ name: g.name })) : [],
      released: game.first_release_date
        ? new Date(game.first_release_date * 1000).toLocaleDateString("pt-BR")
        : "N/A",
      rating: game.total_rating
        ? parseFloat((game.total_rating / 20).toFixed(1))
        : 4.0,
    };
  } catch (error) {
    console.error("Erro em getGameById:", error);
    throw error;
  }
};

// Busca imagens de captura de tela de um jogo específico baseado no identificador único
export const getGameScreenshots = async (id) => {
  try {
    const body = `
      fields screenshots.image_id;
      where id = ${id};
    `;

    const response = await api.post("/games", body);

    const game = response.data[0];

    if (!game || !game.screenshots) return [];

    return game.screenshots.map((s, index) => ({
      id: index,
      image: getScreenshotUrl(s.image_id),
    }));
  } catch (error) {
    console.error("Erro em getGameScreenshots (IGDB):", error);
    return [];
  }
};

// Busca jogos recomendados baseando-se nos gêneros e omitindo o registro do jogo atual
export const getRelatedGamesByGenre = async (genres, currentId) => {
  try {
    if (!genres || genres.length === 0) return [];

    const genreName = genres[0]?.name;

    const body = `
      fields name, cover.image_id, genres.name, total_rating;
      where genres.name = "${genreName}" & id != ${currentId} & cover != null;
      limit 4;
    `;

    const response = await api.post("/games", body);

    return response.data.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: getCoverUrl(game.cover?.image_id),
      genres: game.genres ? game.genres.map((g) => ({ name: g.name })) : [],
      rating: game.total_rating
        ? parseFloat((game.total_rating / 20).toFixed(1))
        : 4.0,
    }));
  } catch (error) {
    console.error("Erro em getRelatedGamesByGenre (IGDB):", error);
    return [];
  }
};

// Busca trailers curtos
export const getGameTrailers = async () => {
  return [];
};

// Extrai o identificador de vídeo do trailer oficial no YouTube
// src/services/gameService.js

export const getYoutubeTrailer = async (gameName, gameId = null) => {
  // 1. PRIMEIRA TENTATIVA: Buscar trailer oficial direto na IGDB (se gameId for passado)
  if (gameId) {
    try {
      const body = `
        fields videos.video_id;
        where id = ${gameId};
      `;

      const response = await api.post("/games", body);
      const videoId = response.data[0]?.videos?.[0]?.video_id;

      if (videoId) {
        return videoId;
      }
    } catch (err) {
      // Falha silenciosa no fallback da IGDB
    }
  }

  // 2. SEGUNDA TENTATIVA: Fallback via YouTube Search API
  const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!YOUTUBE_KEY || !gameName) return null;

  try {
    // Adiciona "game official gameplay trailer" para evitar confundir com filmes
    const searchQuery = encodeURIComponent(
      `${gameName} game official gameplay trailer`,
    );

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=1&key=${YOUTUBE_KEY}`,
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.items?.[0]?.id?.videoId || null;
  } catch (error) {
    return null;
  }
};

// Executa busca por termo textual
export const searchGames = async (
  query,
  page = 1,
  genre = "",
  ordering = "-added",
) => {
  try {
    const limit = 16;
    const offset = (page - 1) * limit;

    const genreFilter = getGenreFilter(genre);

    let sortClause = "";

    if (ordering.includes("released")) {
      sortClause = "sort first_release_date desc;";
    } else if (ordering.includes("name")) {
      sortClause = "sort name asc;";
    }

    const body = `
      fields name, cover.image_id, genres.name, first_release_date, total_rating, platforms.name, platforms.abbreviation;
      search "${query}";
      where cover != null${genreFilter};
      ${sortClause}
      limit ${limit};
      offset ${offset};
    `;

    const response = await api.post("/games", body);

    const results = response.data.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: getCoverUrl(game.cover?.image_id),
      genres: game.genres ? game.genres.map((g) => ({ name: g.name })) : [],
      // ADICIONADO: Mapeamento das plataformas
      platforms: game.platforms
        ? game.platforms.map((p) => ({
            name: p.abbreviation || p.name,
          }))
        : [],
      released: game.first_release_date
        ? new Date(game.first_release_date * 1000).toLocaleDateString("pt-BR")
        : "N/A",
      rating: game.total_rating
        ? parseFloat((game.total_rating / 20).toFixed(1))
        : 4.0,
    }));

    return {
      results,
      count: results.length,
    };
  } catch (error) {
    console.error("Erro em searchGames (IGDB):", error);
    throw error;
  }
};
