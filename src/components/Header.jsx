export function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 px-4 py-4 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 uppercase">
          Game<span className="text-white">Hub</span>
        </h1>
        <div className="w-full max-w-md mx-4 hidden sm:block">
          <input
            type="text"
            placeholder="Buscar jogos..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
            disabled
          />
        </div>
        <div className="w-8 h-8 rounded-full bg-zinc-700 animate-pulse" />
      </div>
    </header>
  );
}
