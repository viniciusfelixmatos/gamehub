// src/components/GameGrid.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GameCard } from "./GameCard";
import { Select } from "./Select";
import { useGames } from "../hooks/useGame";
import { GameCardSkeleton } from "./GameCardSkeleton";
import { Pagination } from "./Pagination";

export function GameGrid() {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  // Captura o termo '?search=...' da URL. Se não existir, fica vazio.
  const searchTerm = searchParams.get("search") || "";

  // Se o usuário fizer uma nova busca, queremos resetar para a primeira página. Por isso, usamos um useEffect que depende do searchTerm.
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchTerm]);

  // Passamos o searchTerm como segundo argumento para o hook atualizado
  const { games, totalGames, loading, error } = useGames(page, searchTerm);

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

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center font-primary">
        <p className="text-red-400">Erro ao carregar os jogos.</p>
      </div>
    );
  }

  const skeletonCards = Array.from({ length: 16 }, (_, index) => index);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 xl:px-0">
      {/* Cabeçalho e filtros */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          {/* Títulos e subtitulos baseados na busca de forma dinâmica */}
          <h2 className="text-xl md:text-2xl font-primary font-bold text-zinc-100">
            {searchTerm
              ? `Resultados para: "${searchTerm}"`
              : "Jogos Populares"}
          </h2>
          <p className="text-sm font-primary text-zinc-400">
            {searchTerm
              ? "Resultados encontrados na pesquisa"
              : "Baseado nas escolhas da comunidade"}
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

      {/* Feedback visual caso a busca não retorne nada */}
      {!loading && games?.length === 0 && (
        <div className="w-full text-center py-12 font-primary text-zinc-400">
          Nenhum jogo encontrado para sua pesquisa.
        </div>
      )}

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? skeletonCards.map((id) => <GameCardSkeleton key={id} />)
          : games?.map((game) => <GameCard key={game.id} game={game} />)}
      </div>

      {/* Componente de paginação - Só renderiza se houver jogos na lista */}
      {!loading && games?.length > 0 && (
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
