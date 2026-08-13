// src/pages/GameDetails.jsx

import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useGameDetails } from "../hooks/useGameDetails";

// Componentes de cada seção da página de detalhes
import { GameHero } from "../components/GameDetails/GameHero";
import { GameAbout } from "../components/GameDetails/GameAbout";
import { GameTrailer } from "../components/GameDetails/GameTrailer";
import { GameScreenshots } from "../components/GameDetails/GameScreenshots";
import { GameRelated } from "../components/GameDetails/GameRelated";
import { GameSidebar } from "../components/GameDetails/GameSidebar";

// Importando o esqueleto de carregamento
import { GameDetailsSkeleton } from "../components/GameDetails/GameDetailsSkeleton";

export function GameDetails() {
  const { id } = useParams();

  const { game, screenshots, loading, error } = useGameDetails(id);

  // Rola a tela para o topo e atualiza o título da aba
  useEffect(() => {
    window.scrollTo(0, 0);

    if (game?.name) {
      document.title = `${game.name} | GameHub`;
    }

    return () => {
      document.title = "GameHub";
    };
  }, [id, game?.name]);

  // Tela de carregamento
  if (loading) {
    return <GameDetailsSkeleton />;
  }

  // Tela de erro
  if (error || !game) {
    return (
      <div className="min-h-screen bg-bg-surface flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 font-primary">
          {error || "Jogo não encontrado."}
        </p>

        <Link
          to="/"
          className="text-brand-primary hover:underline text-sm font-primary"
        >
          Voltar para a Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-surface text-zinc-100 pb-12 font-primary">
      {/* Banner Superior */}
      <GameHero name={game.name} backgroundImage={game.background_image} />

      {/* Container Layout de duas colunas */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna da Esquerda */}
        <div className="lg:col-span-2 space-y-6">
          <GameAbout description={game.description} />

          {/* Player de vídeo */}
          <GameTrailer gameName={game.name} />

          <GameScreenshots screenshots={screenshots} />

          <GameRelated currentId={id} genres={game.genres} />
        </div>

        {/* Coluna da Direita */}
        <div className="space-y-6">
          <GameSidebar game={game} />
        </div>
      </div>
    </div>
  );
}
