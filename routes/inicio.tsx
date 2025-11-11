import { useSignal } from "@preact/signals";
import { Head,  } from "fresh/runtime";
import { define } from "../utils.ts";
import Counter from "../islands/Counter.tsx";
import NavBar from "../islands/NavBar.tsx";
import DownloadFromItch from "../components/DownloadFromItch.tsx";




export default define.page(function Home(ctx) {
  

  console.log("Shared value " + ctx.state.shared);

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <Head>
        <title>Cauquita Racer</title>
      </Head>
      
      <NavBar></NavBar>


       {/* HERO */}
      <section id="juego" class="h-[85vh] flex items-center justify-center fresh-gradient text-center">
        <div class="px-4">
          <h1 class="text-5xl md:text-7xl font-extrabold drop-shadow">Preparado para la carrera</h1>
          <p class="mt-4 text-xl text-white/80">Arcade con vibra GTA-like.</p>
        </div>
      </section>
      
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <DownloadFromItch />
      </div>
    </div>
  );
});
