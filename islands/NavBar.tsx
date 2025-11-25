// islands/NavBar.tsx
import { useState } from "preact/hooks";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header class="sticky top-0 z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <nav class="max-w-6xl mx-auto h-14 px-4 flex items-center gap-6 text-white">
        <a href="/" class="font-extrabold tracking-wide">Cauquita Racer</a>

        {/* menú desktop */}
        <div class="hidden md:flex items-center gap-6 text-sm">
          <a href="/#juego" class="hover:underline">Informacion</a>
          <a href="/#caracteristicas" class="hover:underline"></a>
          <a href="/#galeria" class="hover:underline"></a>
          <a href="/#contacto" class="hover:underline"></a>
        </div>

        <a href="/descargar"
           class="hidden md:inline-block ml-auto px-3 py-1 rounded bg-pink-600 hover:bg-pink-700 text-sm">
          Trailer
        </a>

        {/* botón mobile */}
        <button
          class="md:hidden ml-auto p-2 rounded hover:bg-white/10"
          aria-label="Abrir menú"
          onClick={() => setOpen(v => !v)}
        >
          ☰
        </button>
      </nav>

      {/* menú mobile */}
      {open && (
        <div class="md:hidden border-t border-white/10 text-white">
          <div class="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
            <a href="/#juego" onClick={() => setOpen(false)}>El juego</a>
            <a href="/#caracteristicas" onClick={() => setOpen(false)}>Características</a>
            <a href="/#galeria" onClick={() => setOpen(false)}>Galería</a>
            <a href="/#contacto" onClick={() => setOpen(false)}>Contacto</a>
            <a href="/descargar" class="px-3 py-2 rounded bg-pink-600 text-center">Descargar</a>
          </div>
        </div>
      )}
    </header>
  );
}
