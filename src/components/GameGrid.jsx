// src/components/GameGrid.jsx
import { GameCard } from "./GameCard";
import { Select } from "./Select";
import { useGames } from "../hooks/useGame";
import { GameCardSkeleton } from "./GameCardSkeleton";

export function GameGrid() {
  const { games, loading, error } = useGames();

  const genreOptions = [
    { value: "action", label: "Ação" },
    { value: "rpg", label: "RPG" },
    { value: "shooter", label: "Tiro" },
    { value: "strategy", label: "Estratégia" },
  ];

  const orderOptions = [
    { value: "-added", label: "Mais Populares" },
    { value: "name", label: "Nome (A-Z)" },
    { value: "-released", label: "Lançamento Recente" },
    { value: "-rating", label: "Melhor Avaliados" },
  ];

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center font-primary">
        <p className="text-red-400">Erro ao carregar os jogos.</p>
      </div>
    );
  }

  // Criamos um array falso com 8 posições para renderizar 8 skeletons na tela
  const skeletonCards = Array.from({ length: 8 }, (_, index) => index);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 xl:px-0">
      {/* O cabeçalho e filtros SEMPRE aparecem, mesmo carregando */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-primary font-bold text-zinc-100">
            Jogos Populares
          </h2>
          <p className="text-sm font-primary text-zinc-400">
            Baseado nas escolhas da comunidade
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            placeholder="Todos os Gêneros"
            options={genreOptions}
            onValueChange={(value) => console.log(value)}
            disabled={loading}
          />

          <Select
            defaultValue="-added"
            options={orderOptions}
            onValueChange={(value) => console.log(value)}
            disabled={loading}
          />
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? // Se estiver carregando, renderiza a lista de Skeletons
            skeletonCards.map((id) => <GameCardSkeleton key={id} />)
          : // Se terminou, renderiza os jogos reais
            games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </section>
  );
}
