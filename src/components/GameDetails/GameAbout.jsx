// pages/GameDetails/GameAbout.jsx

export function GameAbout({ description }) {
  return (
    <section className="bg-bg-surface border border-border-subtle rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">Sobre o jogo</h2>

      {/* O RAWG retorna a descrição em HTML, por isso usamos dangerouslySetInnerHTML */}
      <div
        className="text-zinc-400 leading-relaxed text-sm md:text-base space-y-4 prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
}
