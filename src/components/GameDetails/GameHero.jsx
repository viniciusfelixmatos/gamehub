// src/components/GameDetails/GameHero.jsx
import { useNavigate } from "react-router-dom"; // Alterado de Link para useNavigate

export function GameHero({ name, backgroundImage }) {
  const navigate = useNavigate();

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
      <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-6 md:pb-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 hover:bg-brand-primary/10 border border-zinc-700/40 hover:border-brand-primary text-zinc-300 hover:text-brand-primary text-xs md:text-sm rounded-full backdrop-blur-md transition-all duration-300 mb-4 shadow-lg group cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Voltar
        </button>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 drop-shadow-md">
          {name}
        </h1>
      </div>
    </div>
  );
}
