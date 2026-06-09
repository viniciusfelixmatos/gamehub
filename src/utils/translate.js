// src/utils/translate.js

// Executa a tradução de um texto em inglês para o português usando um espelho alternativo estável
export const translateText = async (text) => {
  if (!text) return "";

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`,
    );

    if (!response.ok) return text;

    const data = await response.json();

    if (data && data[0]) {
      const translatedParagraphs = data[0].map((item) => item[0]).join("");
      return translatedParagraphs || text;
    }

    return text;
  } catch (error) {
    console.error("Erro ao traduzir o texto com o provedor principal:", error);
    return text;
  }
};
