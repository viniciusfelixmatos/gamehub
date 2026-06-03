// src/components/GameCardSkeleton.jsx

export function GameCardSkeleton() {
  return (
    <div className="bg-bg-element border border-border-subtle rounded-xl overflow-hidden animate-pulse flex flex-col h-full">
      {/* Esqueleto da imagem do jogo (Proporção aproximada de capa/banner) */}
      <div className="w-full aspect-16/10 bg-zinc-800" />

      {/* Conteúdo do Card */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Esqueleto do Título do Jogo (Duas linhas simuladas) */}
          <div className="h-4 w-5/6 bg-zinc-700 rounded" />
          <div className="h-4 w-1/2 bg-zinc-700/60 rounded" />
        </div>

        {/* Esqueletos das plataformas */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1.5">
            <div className="h-4 w-4 bg-zinc-800 rounded-full" />
            <div className="h-4 w-4 bg-zinc-800 rounded-full" />
            <div className="h-4 w-4 bg-zinc-800 rounded-full" />
          </div>
          <div className="h-5 w-8 bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}
