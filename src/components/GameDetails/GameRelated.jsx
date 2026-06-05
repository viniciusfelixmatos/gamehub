// src/components/GameDetails/GameRelated.jsx
import { Link } from "react-router-dom";
import { useGameRelated } from "../../hooks/useGameRelated";

export function GameRelated({ genres, currentId }) {
  const { relatedGames, loading, error } = useGameRelated(genres, currentId);

  // Se der erro ou se a API não retornar nenhum jogo relacionado,
  // o componente não renderiza nada para não quebrar o layout
  if (error || (!loading && relatedGames.length === 0)) return null;

  return (
    <section className="bg-bg-surface border border-border-subtle rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">
        Jogos semelhantes
      </h2>
      {/* Grid de 2 colunas no mobile e 4 colunas em telas maiores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {loading
          ? // Skeletons de carregamento locais para a seção de recomendados
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-2 animate-pulse">
                <div className="aspect-[16/10] bg-zinc-800 rounded-lg border border-border-subtle/50" />
                <div className="h-4 bg-zinc-700/60 rounded w-5/6" />
              </div>
            ))
          : // Renderização dos jogos semelhantes encontrados
            relatedGames.map((game) => (
              <Link
                key={game.id}
                to={`/game/${game.id}`} // Altere para o padrão de rota do seu projeto (ex: /games/${game.id})
                className="group block space-y-2 focus:outline-none"
              >
                {/* Container da Capa com Efeito de Hover */}
                <div className="aspect-[16/10] bg-bg-element border border-border-subtle rounded-lg overflow-hidden relative">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay sutil para dar um ganho de contraste */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Título do Jogo Relacionado */}
                <h3 className="text-sm font-semibold text-zinc-400 group-hover:text-brand-primary group-focus:text-brand-primary transition-colors line-clamp-1">
                  {game.name}
                </h3>
              </Link>
            ))}
      </div>
    </section>
  );
}
