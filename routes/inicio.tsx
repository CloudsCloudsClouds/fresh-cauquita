import { useSignal } from "@preact/signals";
import { Head,  } from "fresh/runtime";
import { define } from "../utils.ts";
import Counter from "../islands/Counter.tsx";
import DownloadFromItch from "../components/DownloadFromItch.tsx";




export default define.page(function Home(ctx) {
  

  console.log("Shared value " + ctx.state.shared);

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <Head>
        <title>Cauquita Racer</title>
        
          {/* Fuente pixel art */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/styles.css" />

      </Head>
      



       {/* HERO */}
         <section
              id="juego"
              class="h-[85vh] flex items-center justify-center fresh-gradient text-center"
            >
            <div class="px-4">
                <h1 class="pixel-title text-3xl md:text-5xl">
                  PREPARADO PARA COMPETIR
                </h1>
            </div>
      </section>

      
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <DownloadFromItch />
      </div>
    </div>
  );
});
