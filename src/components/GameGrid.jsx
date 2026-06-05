// src/components/GameGrid.jsx
import { useState } from "react";
import { GameCard } from "./GameCard";
import { Select } from "./Select";
import { useGames } from "../hooks/useGame";
import { GameCardSkeleton } from "./GameCardSkeleton";
import { Pagination } from "./Pagination";

export function GameGrid() {
  const [page, setPage] = useState(1);

  // RFoi usado o hook personalizado para buscar os jogos, total de jogos, estado de carregamento e erros
  const { games, totalGames, loading, error } = useGames(page);

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

  // Lógica para quando o usuário muda de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Faz a tela rolar suavemente para o topo quando a página mudar
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center font-primary">
        <p className="text-red-400">Erro ao carregar os jogos.</p>
      </div>
    );
  }

  // Criamos um array de 16 itens para renderizar os skeletons enquanto carrega (16 é o número de jogos por página)
  const skeletonCards = Array.from({ length: 16 }, (_, index) => index);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 xl:px-0">
      {/* Cabeçalho e filtros */}
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
          ? skeletonCards.map((id) => <GameCardSkeleton key={id} />)
          : games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>

      {/* Componente de paginação */}
      {!loading && (
        <Pagination
          currentPage={page}
          totalItems={totalGames}
          itemsPerPage={16}
          onPageChange={handlePageChange}
          disabled={loading}
        />
      )}
    </section>
  );
}
