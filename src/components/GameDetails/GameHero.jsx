// pages/GameDetails/GameHero.jsx
import { Link } from "react-router-dom";

export function GameHero({ name, backgroundImage }) {
  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden bg-bg-element">
      {/* Imagem de fundo borrada */}
      <img
        src={backgroundImage}
        alt={name}
        className="w-full h-full object-cover opacity-40 blur-[2px]"
      />

      {/* Gradiente para suavizar a transição com o fundo da página */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/60 to-transparent" />

      {/* Conteúdo flutuante (Botão Voltar e Título) */}
      <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 pb-6 md:pb-12">
        <Link
          to="/"
          className="inline-block text-zinc-400 hover:text-brand-primary text-sm mb-4 transition-colors"
        >
          ← Voltar para o início
        </Link>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 drop-shadow-md">
          {name}
        </h1>
      </div>
    </div>
  );
}
