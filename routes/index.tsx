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
      </Head>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold mb-4 text-blue-950"> Bienvenido Cauquita Racer</h1>
        <TheCoolerButton coolerLink="/inicio" />

      </div>
    </div>
  );
});
