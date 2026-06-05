// src/components/GameDetails/GameTrailer.jsx
import { useYoutubeTrailer } from "../../hooks/useYoutubeTrailer";

export function GameTrailer({ gameName }) {
  // Passamos o nome do jogo para o novo hook buscar no YouTube
  const { videoId, loading } = useYoutubeTrailer(gameName);

  if (loading) {
    return (
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-zinc-700 rounded" />
        <div className="w-full aspect-video bg-zinc-800 rounded-lg" />
      </div>
    );
  }

  // Se o YouTube falhar e não achar nada, some em silêncio
  if (!videoId) return null;

  return (
    <section className="bg-bg-surface border border-border-subtle rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">Trailer Oficial</h2>

      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-border-subtle">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
