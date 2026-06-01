import { GameCard } from "./GameCard";
import { mockGames } from "../data/mockGames";

export function GameGrid() {
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100">
          Jogos Populares
        </h2>
        <p className="text-sm text-zinc-400">
          Baseado nas escolhas da comunidade
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
