import { Header } from "./components/Header";
import { GameGrid } from "./components/GameGrid";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-zinc-50 antialiased selection:bg-brand-primary selection:text-white">
      <Header />
      <main className="flex-1">
        <GameGrid />
      </main>
      <Footer />
    </div>
  );
}
