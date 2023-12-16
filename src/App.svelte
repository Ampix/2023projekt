<script lang="ts">
  import {Szökőév,HusvétVasárnap} from './assets/balint'
  let szokoev: {selected?: number, back?: {az?: 'igen' | 'nem'; eddig?: number; next?: number }} = {}
  let hvasarbap: {selected?: number, back?:{hónap?:String,nap?:Number,ev?:Number}} = {}

  const calcSzokoev = () => {
    szokoev.back = Szökőév(Number(szokoev.selected!))
  }
  const calcHvasar = () => {
    hvasarbap.back = HusvétVasárnap(Number(hvasarbap.selected!))
  }
</script>

<main class="text-white text-center bg-slate-600">
  <h1 class="text-3xl m-3">A 2023-as projekthét legjobb projektje</h1>
  <div class="bg-green-400 mx-56 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Szökőév számoló</h2>
    <h3>Szökőév: {#if szokoev.back?.az}
      {szokoev.back.az}
    {/if}</h3>
    <h3>Következő szökőév: {#if szokoev.back?.next}
      {szokoev.back.next}
    {/if}</h3>
    <h3>A kiválasztott év előtt {#if szokoev.back?.eddig}
      {szokoev.back.eddig}
    {/if} szökőév volt</h3>
    <form on:submit|preventDefault={calcSzokoev}>
      <input type="number" placeholder="év" class="text-white duration-200 focus:bg-green-600 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-green-500" bind:value={szokoev.selected}>
      <button type="submit" class="bg-green-500 duration-200 mt-2 hover:bg-green-600 rounded-lg w-28 text-lg p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-green-400 mx-56 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Húsvét vasárnap számoló</h2>
    <h3>{#if hvasarbap.back?.ev}{hvasarbap.back.ev}{/if}-ban/ben {#if hvasarbap.back?.hónap}{hvasarbap.back.hónap}{/if} {#if hvasarbap.back?.nap}{hvasarbap.back.nap}{/if}. napján lesz húsvét vasárnap</h3>
    <form on:submit|preventDefault={calcHvasar}>
      <input type="number" placeholder="év" class="text-white duration-200 focus:bg-green-600 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-green-500" bind:value={hvasarbap.selected}>
      <button type="submit" class="bg-green-500 duration-200 mt-2 hover:bg-green-600 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
</main>
