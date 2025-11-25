import { useSignal } from "@preact/signals";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Counter from "../islands/Counter.tsx";
import TheCoolerButton from "../islands/TheCoolerButton.tsx";




export default define.page(function Home(ctx) {
  

  console.log("Shared value " + ctx.state.shared);

  return (
    <div class="px-4 py-8 mx-auto min-h-screen">
      <Head>
        <title>Cauquita Racer</title>
         <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">

        <h1 class="pixel-inicio text-3xl md:text-5xl"> Bienvenido Cauquita Racer</h1>
        <TheCoolerButton coolerLink="/inicio" />

      </div>
    </div>
  );
});
