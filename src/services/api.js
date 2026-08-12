import axios from "axios";

let accessToken = null;

// Função para obter o Token de Acesso da Twitch
async function getIGDBToken() {
  if (accessToken) return accessToken;

  const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET;

  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    );
    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Erro ao autenticar na Twitch/IGDB:", error);
    throw error;
  }
}

// Aponta para a rota de proxy criada no vite.config.js
const api = axios.create({
  baseURL: "/igdb",
  timeout: 10000,
});

// Interceptor que injeta o Token e o Client-ID automaticamente
api.interceptors.request.use(async (config) => {
  const token = await getIGDBToken();
  config.headers["Client-ID"] = import.meta.env.VITE_TWITCH_CLIENT_ID;
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Content-Type"] = "text/plain";
  return config;
});

export default api;
