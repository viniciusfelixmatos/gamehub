// src/components/GameDetails/GameAchievements.jsx

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useGameAchievements } from "../../hooks/useGameAchievements";

export function GameAchievements({ gameName, appId, steamId, apiKey }) {
  // Pega a chave do .env como fallback caso não venha via props
  const finalApiKey = apiKey || import.meta.env.VITE_STEAM_API_KEY;

  const { achievements, loading } = useGameAchievements(
    appId,
    steamId,
    finalApiKey,
  );

  const [isOpen, setIsOpen] = useState(false);

  // Estado de carregamento
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

  // Se não houver conquistas, não renderiza a seção
  if (!achievements || achievements.length === 0) {
    console.log("Nenhuma conquista encontrada para este jogo.");
    return null;
  }

  // Mostra apenas as 6 primeiras na página
  const previewAchievements = achievements.slice(0, 6);
  const hasMoreThanLimit = achievements.length > 6;

  return (
    <section className="bg-bg-surface border border-border-subtle rounded-xl p-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-zinc-200">
          Conquistas ({achievements.length})
        </h2>

        <span className="text-xs text-zinc-400 font-medium">
          Mostrando {previewAchievements.length} principais
        </span>
      </div>

      {/* Grid das conquistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previewAchievements.map((achievement) => {
          // Usa a imagem colorida se desbloqueada, ou a cinza se bloqueada
          const achievementIcon = achievement.unlocked
            ? achievement.image
            : achievement.imageGray || achievement.image;

          return (
            <div
              key={achievement.id}
              className={`flex gap-4 items-center p-3 bg-bg-element/40 border border-border-subtle/30 rounded-xl transition-colors group ${
                achievement.unlocked ? "hover:border-zinc-500" : "opacity-60"
              }`}
            >
              {/* Imagem */}
              <div className="w-14 h-14 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-border-subtle group-hover:border-zinc-500 transition-colors">
                <img
                  src={achievementIcon}
                  alt={achievement.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://via.placeholder.com/100?text=%F0%9F%8F%86";
                  }}
                />
              </div>

              {/* Informações */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-sm text-zinc-200 truncate group-hover:text-white transition-colors">
                    {achievement.name}
                  </h3>

                  {achievement.unlocked && (
                    <span className="text-[11px] font-medium bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">
                      Desbloqueada
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5 pr-2">
                  {achievement.description ||
                    "Conquista secreta ou sem descrição disponível."}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dialog */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        {/* Botão para abrir o modal */}
        {hasMoreThanLimit && (
          <div className="mt-6 flex justify-center border-t border-border-subtle/30 pt-4">
            <Dialog.Trigger asChild>
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium text-sm rounded-lg transition-colors border border-border-subtle/60 shadow-md cursor-pointer">
                Ver todas as {achievements.length} conquistas
              </button>
            </Dialog.Trigger>
          </div>
        )}

        {/* Modal */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-fade-in" />

          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-zinc-900 border border-zinc-800 w-[92vw] max-w-3xl max-h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden focus:outline-none data-[state=open]:animate-zoom-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div>
                <Dialog.Title className="text-xl font-bold text-zinc-100">
                  Conquistas de {gameName}
                </Dialog.Title>

                <Dialog.Description className="text-xs text-zinc-400 mt-0.5">
                  {achievements.length} conquistas disponíveis.
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-lg font-bold cursor-pointer">
                  ✕
                </button>
              </Dialog.Close>
            </div>

            {/* Lista */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 align-top [scrollbar-width:thin] [scrollbar-color:#3f3f46_#18181b]">
              {achievements.map((achievement) => {
                const achievementIcon = achievement.unlocked
                  ? achievement.image
                  : achievement.imageGray || achievement.image;

                return (
                  <div
                    key={`modal-${achievement.id}`}
                    className={`flex gap-4 items-center p-3.5 bg-zinc-950/40 border border-zinc-800/60 rounded-xl hover:border-zinc-700 transition-colors group ${
                      achievement.unlocked ? "" : "opacity-60"
                    }`}
                  >
                    {/* Imagem */}
                    <div className="w-14 h-14 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                      <img
                        src={achievementIcon}
                        alt={achievement.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://via.placeholder.com/100?text=%F0%9F%8F%86";
                        }}
                      />
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-semibold text-sm text-zinc-200 truncate group-hover:text-white transition-colors">
                          {achievement.name}
                        </h3>

                        {achievement.unlocked && (
                          <span className="text-[11px] font-medium bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">
                            Desbloqueada
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1 pr-1">
                        {achievement.description ||
                          "Conquista secreta ou sem descrição disponível."}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
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
