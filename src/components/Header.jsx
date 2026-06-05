import { useHeaderSearch } from "../hooks/useHeaderSearch"; // Ajuste o caminho se necessário

export function Header() {
  const { searchQuery, setSearchQuery, handleSearchSubmit, clearSearch } =
    useHeaderSearch();

  return (
    <header className="bg-bg-surface border-b border-border-subtle sticky top-0 z-2 px-4 py-4 backdrop-blur-md bg-opacity-80">
      {/* ALINHAMENTO DO COMPONENTE */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* TÍTULO COM O GRADIENTE DA MARCA */}
        <h1
          className="text-2xl font-primary font-black tracking-wider text-transparent bg-clip-text bg-brand-gradient uppercase cursor-pointer"
          onClick={clearSearch}
        >
          Game<span className="text-white">Hub</span>
        </h1>

        {/* BARRA DE PESQUISA (DESKTOP) */}
        <div className="w-full max-w-md hidden sm:block">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Buscar jogos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-element border border-border-focus rounded-lg px-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-brand-primary transition-colors font-primary"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
