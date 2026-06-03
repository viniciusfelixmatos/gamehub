// src/components/GameDetails/GameScreenshots.jsx
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export function GameScreenshots({ screenshots }) {
  const [index, setIndex] = useState(-1);

  if (!screenshots || screenshots.length === 0) return null;

  // O Lightbox espera um array de objetos no formato: [{ src: "url" }, { src: "url" }]
  const slides = screenshots.map((shot) => ({ src: shot.image }));

  return (
    <section className="bg-bg-surface border border-border-subtle rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">Imagens oficiais</h2>

      {/* Grid de 2 colunas para as fotos */}
      <div className="grid grid-cols-2 gap-3">
        {screenshots.slice(0, 4).map((shot, idx) => (
          <div
            key={shot.id}
            onClick={() => setIndex(idx)}
            className="relative aspect-video rounded-lg overflow-hidden bg-bg-element border border-border-subtle group cursor-pointer"
          >
            <img
              src={shot.image}
              alt="Screenshot do jogo"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Componente do Lightbox */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </section>
  );
}
