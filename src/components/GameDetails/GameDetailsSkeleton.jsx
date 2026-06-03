// src/components/GameDetails/GameDetailsSkeleton.jsx

export function GameDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-bg-surface pb-12 font-primary animate-pulse">
      {/* Esqueleto do Banner / Hero */}
      <div className="w-full h-[40vh] md:h-[60vh] bg-bg-element relative">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 pb-6 md:pb-12 space-y-4">
          {/* Linha do link voltar */}
          <div className="h-4 w-32 bg-zinc-700/50 rounded" />
          {/* Linha do título do jogo */}
          <div className="h-10 md:h-14 w-2/3 md:w-1/2 bg-zinc-700 rounded-lg" />
        </div>
      </div>

      {/* Esqueleto do Conteúdo em duas colunas */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna da Esquerda (Sobre o jogo + Screenshots) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Caixa do "Sobre" */}
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 space-y-4">
            <div className="h-6 w-36 bg-zinc-700 rounded" />{" "}
            {/* Título da seção */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-800 rounded" />
              <div className="h-4 w-full bg-zinc-800 rounded" />
              <div className="h-4 w-5/6 bg-zinc-800 rounded" />
              <div className="h-4 w-4/5 bg-zinc-800 rounded" />
            </div>
          </div>

          {/* Caixa das Screenshots */}
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 space-y-4">
            <div className="h-6 w-40 bg-zinc-700 rounded" />
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-video bg-zinc-800 rounded-lg" />
              <div className="aspect-video bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Coluna da Direita (Ficha Técnica / Sidebar) */}
        <div className="space-y-6">
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 space-y-6">
            {/* Avaliação */}
            <div className="space-y-2">
              <div className="h-3 w-16 bg-zinc-800 rounded" />
              <div className="h-9 w-24 bg-zinc-700 rounded" />
            </div>
            <div className="border-b border-border-subtle" />

            {/* Plataformas */}
            <div className="space-y-2">
              <div className="h-3 w-20 bg-zinc-800 rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-zinc-700 rounded" />
                <div className="h-6 w-20 bg-zinc-700 rounded" />
                <div className="h-6 w-14 bg-zinc-700 rounded" />
              </div>
            </div>
            <div className="border-b border-border-subtle" />

            {/* Gêneros */}
            <div className="space-y-2">
              <div className="h-3 w-16 bg-zinc-800 rounded" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-zinc-700 rounded" />
                <div className="h-6 w-16 bg-zinc-700 rounded" />
              </div>
            </div>
            <div className="border-b border-border-subtle" />

            {/* Info de lançamento e metascore */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-zinc-800 rounded" />
                <div className="h-5 w-24 bg-zinc-700 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 bg-zinc-800 rounded" />
                <div className="h-5 w-12 bg-zinc-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
