// islands/Carousel.tsx
import { useEffect, useState } from "preact/hooks";

type Props = {
  images: string[];
  interval?: number; // ms
};

export default function Carousel({ images, interval = 4000 }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images, interval]);

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  return (
    <div class="relative w-full max-w-5xl mx-auto aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt=""
          class={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
                  ${i === idx ? "opacity-100" : "opacity-0"}`}
          loading="eager"
        />
      ))}

      {/* controles */}
      <button onClick={prev}
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded">
        ‹
      </button>
      <button onClick={next}
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded">
        ›
      </button>

      {/* indicadores */}
      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            class={`w-2.5 h-2.5 rounded-full ${i === idx ? "bg-pink-500" : "bg-white/50"}`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
