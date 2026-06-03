// pages/GameDetails/GameSidebar.jsx

export function GameSidebar({ game }) {
  return (
    <aside className="bg-bg-surface border border-border-subtle rounded-xl p-6 space-y-6">
      {/* Avaliação */}
      <div>
        <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
          Avaliação
        </span>
        <div className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-amber-400 font-bold text-lg px-3 py-1 rounded border border-border-subtle">
          <span>★</span> {game.rating}{" "}
          <span className="text-zinc-500 text-xs font-normal">/ 5</span>
        </div>
      </div>

      <hr className="border-border-subtle" />

      {/* Plataformas */}
      <div>
        <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
          Plataformas
        </span>
        <div className="flex flex-wrap gap-2">
          {game.parent_platforms?.map(({ platform }) => (
            <span
              key={platform.id}
              className="text-xs uppercase font-semibold tracking-wider text-zinc-300 bg-bg-element border border-border-subtle px-3 py-1 rounded"
            >
              {platform.name}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-border-subtle" />

      {/* Gêneros */}
      <div>
        <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
          Gêneros
        </span>
        <div className="flex flex-wrap gap-2">
          {game.genres?.map((genre) => (
            <span
              key={genre.id}
              className="text-xs text-zinc-400 bg-bg-element/50 px-2.5 py-1 rounded border border-border-subtle"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      {/* Desenvolvedores */}
      {game.developers?.length > 0 && (
        <>
          <hr className="border-border-subtle" />
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
              Desenvolvedor
            </span>
            <span className="text-sm text-zinc-300">
              {game.developers.map((dev) => dev.name).join(", ")}
            </span>
          </div>
        </>
      )}

      <hr className="border-border-subtle" />

      {/* Metacritic e Lançamento */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
            Lançamento
          </span>
          <span className="text-sm font-medium text-zinc-300">
            {game.released
              ? new Date(game.released).toLocaleDateString("pt-BR")
              : "N/A"}
          </span>
        </div>

        {game.metacritic && (
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
              Metascore
            </span>
            <span className="inline-block text-sm font-bold text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded">
              {game.metacritic}
            </span>
          </div>
        )}
      </div>

      {/* Onde Comprar */}
      {game.stores?.length > 0 && (
        <>
          <hr className="border-border-subtle" />
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
              Onde comprar
            </span>
            <div className="grid grid-cols-1 gap-2">
              {game.stores.map(({ store }) => (
                <span
                  key={store.id}
                  className="text-xs text-zinc-400 bg-bg-element/30 border border-border-subtle px-3 py-2 rounded-lg flex items-center justify-between"
                >
                  {store.name}
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">
                    Disponível
                  </span>
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {game.website && (
        <>
          <hr className="border-border-subtle" />
          <a
            href={game.website}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center bg-bg-element hover:bg-brand-primary/10 hover:text-brand-primary border border-border-subtle text-zinc-200 font-semibold text-sm py-2.5 px-4 rounded-lg transition-all duration-200"
          >
            Visitar Website Oficial
          </a>
        </>
      )}
    </aside>
  );
}
