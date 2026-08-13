import { Link } from "react-router-dom";

export function GameCard({ game }) {
  return (
    // Adicionamos 'flex flex-col' e 'h-full' no Link para que ele herde e transmita a altura correta do Grid
    <Link to={`/game/${game.id}`} className="flex flex-col h-full group">
      <article className="bg-bg-surface border border-border-subtle rounded-xl overflow-hidden hover:border-border-focus hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 cursor-pointer flex flex-col justify-between flex-1 h-full">
        {/* Container da Imagem */}
        <div className="relative aspect-video overflow-hidden bg-bg-element">
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
          <h3 className="font-primary font-bold text-zinc-100 text-base md:text-lg line-clamp-2 group-hover:text-brand-primary transition-colors">
            {game.name}
          </h3>

          {/* Plataformas */}
          <div className="flex flex-wrap gap-2">
            {game.platforms?.map((platform, index) => (
              <span
                key={index}
                className="text-[10px] font-primary uppercase font-semibold tracking-wider text-zinc-400 bg-bg-element px-2 py-0.5 rounded"
              >
                {platform.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
