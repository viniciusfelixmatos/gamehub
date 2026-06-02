import { GameCard } from "./GameCard";
import { Select } from "./Select";
import { useGames } from "../hooks/useGame";

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

  if (loading) {
    return <p>Carregando jogos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os jogos.</p>;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 xl:px-0">
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
          />

          <Select
            defaultValue="-added"
            options={orderOptions}
            onValueChange={(value) => console.log(value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
