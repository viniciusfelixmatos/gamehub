// src/components/GameDetails/GameAchievements.jsx
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useGameAchievements } from "../../hooks/useGameAchievements";

export function GameAchievements({ id }) {
  const { achievements, loading } = useGameAchievements(id);
  const [isOpen, setIsOpen] = useState(false);

  // 1️⃣ Estado de Carregamento (Skeleton Screen)
  if (loading) {
    return (
      <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 space-y-4 animate-pulse">
        <div className="h-6 w-40 bg-zinc-700 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <div className="w-12 h-12 bg-zinc-800 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-zinc-700 rounded w-1/2" />
                <div className="h-3 bg-zinc-800 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!achievements || achievements.length === 0) return null;

  // Vitrine estática na página pai (mostra sempre até 6 conquistas)
  const previewAchievements = achievements.slice(0, 6);

  // 🎯 LÓGICA DE TRANSPARÊNCIA: Se o RAWG bater no limite de 40, sinalizamos que há mais no jogo original
  const hasMoreThanLimit = achievements.length >= 40;

  return (
    <section className="bg-bg-surface border border-border-subtle rounded-xl p-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-zinc-200">
          {/* 🔄 Alterado de "Conquistas (40)" para "Conquistas (40+)" caso passe do teto da API */}
          Conquistas {hasMoreThanLimit ? "(40+)" : `(${achievements.length})`}
        </h2>
        <span className="text-xs text-zinc-400 font-medium">
          Mostrando {previewAchievements.length} principais
        </span>
      </div>

      {/* Grid da Vitrine na Página Pai */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previewAchievements.map((ach) => (
          <div
            key={ach.id}
            className="flex gap-4 items-center p-3 bg-bg-element/40 border border-border-subtle/30 rounded-xl hover:border-border-subtle transition-colors group"
          >
            <div className="w-14 h-14 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-border-subtle group-hover:border-zinc-500 transition-colors">
              <img
                src={ach.image}
                alt={ach.name}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100?text=🏆";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold text-sm text-zinc-200 truncate group-hover:text-white transition-colors">
                  {ach.name}
                </h3>
                {ach.percent && (
                  <span className="text-[11px] font-medium bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full flex-shrink-0">
                    {parseFloat(ach.percent).toFixed(1)}%
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5 pr-2">
                {ach.description ||
                  "Conquista secreta ou sem descrição disponível."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Componente Root do Radix Dialog */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        {/* Botão de Trigger */}
        {achievements.length > 6 && (
          <div className="mt-6 flex justify-center border-t border-border-subtle/30 pt-4">
            <Dialog.Trigger asChild>
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium text-sm rounded-lg transition-colors border border-border-subtle/60 shadow-md cursor-pointer">
                {/* 🔄 Texto ajustado para refletir de forma honesta o que será aberto */}
                {hasMoreThanLimit
                  ? "Ver lista de conquistas disponíveis"
                  : `Ver todas as ${achievements.length} conquistas`}
              </button>
            </Dialog.Trigger>
          </div>
        )}

        {/* Modal Portal */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-fade-in" />

          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-zinc-900 border border-zinc-800 w-[92vw] max-w-3xl max-h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden focus:outline-none data-[state=open]:animate-zoom-in">
            {/* Header Fixo */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <Dialog.Title className="text-xl font-bold text-zinc-100">
                  {hasMoreThanLimit
                    ? "Conquistas Principais"
                    : "Todas as Conquistas"}
                </Dialog.Title>
                <Dialog.Description className="text-xs text-zinc-400 mt-0.5">
                  {/* 🔄 Explicação clara sobre a limitação da listagem */}
                  {hasMoreThanLimit
                    ? "Exibindo uma seleção com as 40 conquistas mais populares e conquistadas deste título."
                    : `Lista completa com os ${achievements.length} troféus disponíveis.`}
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-lg font-bold cursor-pointer">
                  ✕
                </button>
              </Dialog.Close>
            </div>

            {/* Conteúdo Rolável */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 align-top [scrollbar-width:thin] [scrollbar-color:#3f3f46_#18181b]">
              {achievements.map((ach) => (
                <div
                  key={`modal-${ach.id}`}
                  className="flex gap-4 items-center p-3.5 bg-zinc-950/40 border border-zinc-800/60 rounded-xl hover:border-zinc-700 transition-colors group"
                >
                  <div className="w-14 h-14 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                    <img
                      src={ach.image}
                      alt={ach.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100?text=🏆";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-sm text-zinc-200 truncate group-hover:text-white transition-colors">
                        {ach.name}
                      </h3>
                      {ach.percent && (
                        <span className="text-[11px] font-medium bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full flex-shrink-0">
                          {parseFloat(ach.percent).toFixed(1)}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1 pr-1">
                      {ach.description ||
                        "Conquista secreta ou sem descrição disponível."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Fixo */}
            <div className="p-4 bg-zinc-950/40 border-t border-zinc-800 flex justify-end">
              <Dialog.Close asChild>
                <button className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-lg transition-colors cursor-pointer">
                  Fechar Painel
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
