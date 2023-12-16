<script lang="ts">
  import {ÉvHanyadikNapja,PéntekTizenHárom,Szökőév,HusvétVasárnap} from './assets/balint'

  let szokoev: {selected?: number, back?: {az?: 'igen' | 'nem'; eddig?: number; next?: number }} = {}
  let hvasarbap: {selected?: number, back?:{hónap?:String,nap?:Number,ev?:Number}} = {}
  let p13: {selected?:number, back?: string[], backYear?:number} = {}
  let évnap: {év?:number,hónap?:number,nap?:number,back?:string,backYear?:number} = {}

  const calcSzokoev = () => {
    szokoev.back = Szökőév(Number(szokoev.selected!))
  }
  const calcHvasar = () => {
    hvasarbap.back = HusvétVasárnap(Number(hvasarbap.selected!))
  }
  const calcP13 = () => {
    p13.back = PéntekTizenHárom(Number(p13.selected!))
    p13.backYear = p13.selected
  }
  const calcévnap = () => {
    if(évnap.hónap > 12 || évnap.hónap < 1 || évnap.nap > 31 || évnap.nap < 1){
      évnap.back = "sokadik"
    }else{
      évnap.back = ÉvHanyadikNapja(Number(évnap.év!),Number(évnap.hónap!),Number(évnap.nap!)).toString() + "."
    }
    évnap.backYear = évnap.év
  }
</script>

<main class="text-white text-center bg-slate-600">
  <h1 class="text-3xl m-3">A 2023-as projekthét legjobb projektje</h1>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
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
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={szokoev.selected}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg w-28 text-lg p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Húsvét vasárnap számoló</h2>
    <h3>{#if hvasarbap.back?.ev}{hvasarbap.back.ev}{/if}-ban/ben {#if hvasarbap.back?.hónap}{hvasarbap.back.hónap}{/if} {#if hvasarbap.back?.nap}{hvasarbap.back.nap}{/if}. napján lesz húsvét vasárnap</h3>
    <form on:submit|preventDefault={calcHvasar}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={hvasarbap.selected}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Péntek 13 számoló</h2>
    <h3>{#if p13.backYear}{p13.backYear}{/if}-ban/ben a következő hónapokban lesz 13. péntek: {#if p13.back}{p13.back}{/if}</h3>
    <form on:submit|preventDefault={calcP13}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={p13.selected}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Év hányadik napja</h2>
    <h3>{#if évnap.backYear}{évnap.backYear}{/if} {#if évnap.back}{évnap.back}{/if} napja lesz</h3>
    <form on:submit|preventDefault={calcévnap}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={évnap.év}>
      <input type="number" required placeholder="hónap" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={évnap.hónap}>
      <input type="number" required placeholder="nap" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={évnap.nap}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
</main>
