// src/components/GameDetails/GameTrailer.jsx
import { useYoutubeTrailer } from "../../hooks/useYoutubeTrailer";

export function GameTrailer({ gameName, gameId }) {
  // Passamos o nome e o ID do jogo para o hook buscar a melhor opção de trailer
  const { videoId, loading, error } = useYoutubeTrailer(gameName, gameId);

  // Enquanto as informações do jogo não chegaram ou a busca está em andamento
  if (loading || (!gameName && !gameId)) {
    return (
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-zinc-700 rounded" />
        <div className="w-full aspect-video bg-zinc-800 rounded-lg" />
      </div>
    );
  }

  // Se houver erro ou nenhum vídeo for encontrado, oculta o componente silenciosamente
  if (error || !videoId) {
    return null;
  }

  return (
    <section className="bg-bg-surface border border-border-subtle rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">Trailer Oficial</h2>

      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-border-subtle">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0`}
          title={`Trailer oficial de ${gameName}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
