import { Header } from "./components/Header";
import { GameGrid } from "./components/GameGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 antialiased selection:bg-violet-500 selection:text-white">
      <Header />
      <main>
        <GameGrid />
      </main>
    </div>
  );
}
