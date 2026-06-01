export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-surface border-t border-border-subtle mt-auto px-4 py-6">
      {/* Alinhamento equivalente ao .container-xl do Bootstrap */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-primary text-zinc-400">
        {/* Lado Esquerdo: Marca e Copyright */}
        <div className="flex items-center gap-2">
          <span className="font-black tracking-wider text-transparent bg-clip-text bg-brand-gradient uppercase">
            GameHub
          </span>
          <span>&copy; {currentYear}. Todos os direitos reservados.</span>
        </div>

        {/* Lado Direito: Créditos à API e Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <p>
            Dados fornecidos por{" "}
            <a
              href="https://rawg.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:text-brand-secondary transition-colors font-medium hover:underline"
            >
              RAWG.io
            </a>
          </p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-200 cursor-pointer transition-colors">
              Termos
            </span>
            <span className="hover:text-zinc-200 cursor-pointer transition-colors">
              Privacidade
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
