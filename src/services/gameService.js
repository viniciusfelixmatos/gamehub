// src/services/gameService.js

import api from "./api";
import steamApi from "./steamApi";

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

    const body = `
      fields name, cover.image_id, genres.name, first_release_date, total_rating;
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

// Função para buscar o AppID da Steam pelo nome do jogo via loja pública da Steam
export const searchSteamAppIdByName = async (gameName) => {
  try {
    const cleanName = encodeURIComponent(gameName.trim());

    // 1. Tenta via endpoint público do Steam Community (muito mais permissivo que o storesearch)
    const targetUrl = `https://steamcommunity.com/actions/SearchApps/${cleanName}`;

    // Usamos um fetch direto ou com fallback
    const response = await fetch(targetUrl);

    if (response.ok) {
      const data = await response.json();

      // Se retornar uma lista válida de jogos
      if (Array.isArray(data) && data.length > 0) {
        // Tenta encontrar um nome exato
        const exactMatch = data.find(
          (item) => item.name.toLowerCase() === gameName.toLowerCase(),
        );

        const selectedItem = exactMatch || data[0];

        console.log(
          `--> [Steam Fallback] AppID encontrado via busca por nome ("${gameName}"):`,
          selectedItem.appid,
          `(${selectedItem.name})`,
        );

        return String(selectedItem.appid);
      }
    }
  } catch (error) {
    console.warn(
      "[Steam Fallback] Tentativa 1 (SteamCommunity) falhou. Tentando alternativa...",
      error,
    );
  }

  // 2. Alternativa Fallback: Busca pública na API sem bloqueio
  try {
    const cleanName = encodeURIComponent(gameName.trim());
    const response = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(
        `https://store.steampowered.com/api/storesearch/?term=${cleanName}&l=portuguese&cc=BR`,
      )}`,
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.items && data.items.length > 0) {
        const selectedItem = data.items[0];
        console.log(
          `--> [Steam Fallback] AppID encontrado via fallback secundário:`,
          selectedItem.id,
        );
        return String(selectedItem.id);
      }
    }
  } catch (fallbackError) {
    console.warn(
      "[Steam Fallback] Todas as tentativas de busca de AppID falharam:",
      fallbackError,
    );
  }

  return null;
};

// Busca detalhes de um jogo específico baseado no identificador único
export const getGameById = async (id) => {
  try {
    console.log("--> [getGameById] Buscando detalhes para o ID:", id);

    const body = `
      fields name, summary, storyline, cover.image_id, genres.name, first_release_date, total_rating, screenshots.image_id, external_games.category, external_games.uid;
      where id = ${id};
    `;

    const response = await api.post("/games", body);
    const game = response.data[0];

    if (!game) {
      throw new Error("Jogo não encontrado");
    }

    const description =
      game.summary || game.storyline || "Sem descrição disponível.";

    // 1. Primeira tentativa: Tenta pegar o AppID via IGDB
    let steamExternal = game.external_games?.find(
      (ext) => Number(ext.category) === 1 || Number(ext.category) === 13,
    );

    let steamAppId = steamExternal?.uid ? String(steamExternal.uid) : null;

    // 2. Segunda tentativa (FALLBACK AUTOMÁTICO): Busca na Steam pelo nome do jogo
    if (!steamAppId && game.name) {
      console.log(
        `--> [getGameById] AppID ausente na IGDB. Tentando buscar pelo nome: "${game.name}"...`,
      );
      steamAppId = await searchSteamAppIdByName(game.name);
    }

    console.log(
      "--> [getGameById] AppID da Steam final resolvido:",
      steamAppId,
    );

    return {
      id: game.id,
      steamAppId,
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
export const getYoutubeTrailer = async (gameName) => {
  const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  if (!YOUTUBE_KEY) return null;

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

/**
 * Busca conquistas de um jogo usando a Steam Web API.
 */
export const getGameAchievements = async (appId, steamId, apiKey) => {
  // Usa a chave do .env se nenhuma apiKey for fornecida explicitamente
  const finalApiKey = apiKey || import.meta.env.VITE_STEAM_API_KEY;

  console.log("--> [getGameAchievements] Parâmetros recebidos:", {
    appId,
    steamId: steamId || "não informado",
    temApiKey: !!finalApiKey,
  });

  if (!appId || !finalApiKey) {
    console.warn(
      "[gameService] appId e apiKey são obrigatórios para buscar conquistas.",
    );
    return [];
  }

  try {
    const promises = [
      steamApi.get("/ISteamUserStats/GetSchemaForGame/v2/", {
        params: {
          appid: appId,
          key: finalApiKey,
        },
      }),
    ];

    if (steamId) {
      promises.push(
        steamApi.get("/ISteamUserStats/GetPlayerAchievements/v1/", {
          params: {
            appid: appId,
            steamid: steamId,
            key: finalApiKey,
          },
        }),
      );
    }

    const results = await Promise.allSettled(promises);

    const schemaResult = results[0];
    const playerResult = steamId ? results[1] : null;

    if (schemaResult.status === "rejected") {
      console.warn(
        "[gameService] Falha ao obter schema do jogo na Steam:",
        schemaResult.reason,
      );
      return [];
    }

    console.log(
      "--> [getGameAchievements] Resposta bruta da API da Steam:",
      schemaResult.value?.data,
    );

    const achievements =
      schemaResult.value?.data?.game?.availableGameStats?.achievements ?? [];

    console.log(
      `--> [getGameAchievements] Total de conquistas encontradas no Schema: ${achievements.length}`,
    );

    const playerAchievements =
      playerResult && playerResult.status === "fulfilled"
        ? (playerResult.value?.data?.playerstats?.achievements ?? [])
        : [];

    const playerMap = new Map(
      playerAchievements.map((achievement) => [
        achievement.apiname,
        achievement,
      ]),
    );

    const formattedAchievements = achievements.map((achievement) => {
      const playerAchievement = playerMap.get(achievement.name);
      const unlocked = playerAchievement?.achieved === 1;

      return {
        id: achievement.name,
        name: achievement.displayName || "Conquista sem nome",
        description: achievement.description || "Sem descrição disponível.",
        image: achievement.icon || null,
        imageGray: achievement.icongray || null,
        hidden: achievement.hidden === 1,
        unlocked,
        unlockTime: unlocked ? playerAchievement.unlocktime : null,
      };
    });

    console.log(
      "--> [getGameAchievements] Lista final formatada:",
      formattedAchievements,
    );

    return formattedAchievements;
  } catch (error) {
    console.error("[gameService] Erro ao buscar conquistas na Steam:", error);
    return [];
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
      fields name, cover.image_id, genres.name, first_release_date, total_rating;
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
