// src/components/Pagination.jsx
export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  disabled,
}) {
  // Calcula o total de páginas disponíveis (ex: 852230 jogos / 16 por página)
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Evita renderizar se não houver páginas suficientes
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-6 mt-12 border-t border-zinc-800/60 pt-6 font-primary">
      {/* Botão Voltar */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        className="px-4 py-2 text-sm font-medium bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 hover:text-white disabled:opacity-40 disabled:hover:bg-zinc-800 disabled:hover:text-zinc-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        ← Anterior
      </button>

      {/* Indicador de Status */}
      <span className="text-sm text-zinc-400 font-medium">
        Página <strong className="text-zinc-200">{currentPage}</strong> de{" "}
        <strong className="text-zinc-200">{totalPages.toLocaleString()}</strong>
      </span>

      {/* Botão Avançar */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        className="px-4 py-2 text-sm font-medium bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 hover:text-white disabled:opacity-40 disabled:hover:bg-zinc-800 disabled:hover:text-zinc-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        Próximo →
      </button>
    </div>
  );
}
