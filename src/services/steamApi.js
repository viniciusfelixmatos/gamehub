import axios from "axios";

const steamApi = axios.create({
  baseURL: "/steam",
  timeout: 10000,
});

/**
 * Busca todas as conquistas de um jogo
 * e informa quais foram desbloqueadas pelo jogador.
 */
export async function getGameAchievements(appId, steamId, apiKey) {
  try {
    const [schemaResponse, playerResponse] = await Promise.all([
      // Todas as conquistas disponíveis no jogo
      steamApi.get("/ISteamUserStats/GetSchemaForGame/v2/", {
        params: {
          appid: appId,
          key: apiKey,
        },
      }),

      // Conquistas do jogador
      steamApi.get("/ISteamUserStats/GetPlayerAchievements/v1/", {
        params: {
          appid: appId,
          steamid: steamId,
          key: apiKey,
        },
      }),
    ]);

    const achievements =
      schemaResponse.data.game?.availableGameStats?.achievements ?? [];

    const playerAchievements =
      playerResponse.data.playerstats?.achievements ?? [];

    // Facilita encontrar o progresso de cada conquista
    const playerMap = new Map(
      playerAchievements.map((achievement) => [
        achievement.apiname,
        achievement,
      ]),
    );

    // Junta as informações das duas APIs
    return achievements.map((achievement) => {
      const playerAchievement = playerMap.get(achievement.name);

      return {
        id: achievement.name,
        name: achievement.displayName,
        description: achievement.description,
        icon: achievement.icon,
        iconGray: achievement.icongray,
        hidden: achievement.hidden === 1,

        unlocked: playerAchievement?.achieved === 1,

        unlockTime:
          playerAchievement?.achieved === 1
            ? playerAchievement.unlocktime
            : null,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar conquistas da Steam:", error);

    throw error;
  }
}

export default steamApi;
