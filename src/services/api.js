import axios from "axios";

// Configuração do Axios para a API do RAWG
const api = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY,
  },
});

export default api;
