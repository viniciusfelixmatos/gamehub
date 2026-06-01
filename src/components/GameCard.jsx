export function GameCard({ game }) {
  return (
    <article
      className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
      onClick={() => console.log(`Abrir detalhes do jogo: ${game.name}`)}
    >
      {/* Container da Imagem */}
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        <img
          src={game.background_image}
          alt={game.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs px-2 py-1 rounded flex items-center gap-1">
          <span>★</span> {game.rating}
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <h3 className="font-bold text-zinc-100 text-base md:text-lg line-clamp-2 group-hover:text-violet-400 transition-colors">
          {game.name}
        </h3>

        {/* Plataformas */}
        <div className="flex flex-wrap gap-2">
          {game.parent_platforms.map(({ platform }) => (
            <span
              key={platform.id}
              className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded"
            >
              {platform.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
