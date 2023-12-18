<script lang="ts">
  import {öröknaptár,HónapSzámToSzöveg,NapSzámToSzöveg,SzületésnapEsélyek,ÉvHanyadikNapja,PéntekTizenHárom,Szökőév,HusvétVasárnap} from './assets/balint'
import {leszVagyVoltVagyVan,ÉvSzámDátummá} from './assets/csano'

  let szokoev: {selected?: number, ejnye?:boolean, back?: {az?: 'igen' | 'nem'; eddig?: number; next?: number }} = {}
  let hvasarbap: {selected?: number,megnevezo?:"van"|"lesz"|"volt", back?:{hónap?:number|string,nap?:number,ev?:number}} = {}
  let p13: {selected?:number, back?: string[], backYear?:number,megnevezo?:"van"|"lesz"|"volt"} = {}
  let évnap: {év?:number,hónap?:number,nap?:number,back?:string,backYear?:number} = {}
  let szülszal: {emberek?:number,back?:number} = {}
  let örökpapi: {év?:number,hónap?:number,nap?:number,backNap?:string,backYear?:number,backHónap?:string,megnevezo?:"van"|"volt"|"lesz",backNapszám?:number} = {}
  let évszám: {év?:number,szám?:number,back?:{év?:number,nap?:number,hónap?:number|string}} = {}

  const calcSzokoev = () => {
    if(szokoev.selected > 1581){
      szokoev.back = Szökőév(Number(szokoev.selected!))
      szokoev.ejnye = false
    }else{
      szokoev.back = undefined
      szokoev.ejnye = true
    }
  }
  const calcHvasar = () => {
    hvasarbap.back = HusvétVasárnap(hvasarbap.selected)
    let dátum = new Date()
    dátum.setFullYear(hvasarbap.selected,Number(hvasarbap.back.hónap)-1,hvasarbap.back.nap)
    hvasarbap.back.hónap = HónapSzámToSzöveg(Number(hvasarbap.back.hónap))
    hvasarbap.megnevezo = leszVagyVoltVagyVan(dátum)
  }
  const calcP13 = () => {
    let dátum = new Date()
    dátum.setFullYear(p13.selected,1,1)
    p13.back = PéntekTizenHárom(Number(p13.selected!))
    p13.megnevezo = leszVagyVoltVagyVan(dátum)
    p13.backYear = p13.selected
  }
  const calcszülszal = () => {
    szülszal.back = SzületésnapEsélyek(Number(szülszal.emberek!))
  }
  const calcévnap = () => {
    const hónapHosszuság = [31,28,31,30,31,30,31,31,30,31,30,31]	
    if (Szökőév(örökpapi.év).az == 'igen'){
      hónapHosszuság[1] = 29
    }
    if(évnap.hónap > 12 || évnap.hónap < 1 || évnap.nap > hónapHosszuság[évnap.hónap-1] || évnap.nap < 1){
      évnap.back = "sokadik"
    }else{
      évnap.back = ÉvHanyadikNapja(évnap.év,évnap.hónap,évnap.nap).toString() + "."
    }
    évnap.backYear = évnap.év
  }
  const calcÖrökpapi = () => {
    const hónapHosszuság = [31,28,31,30,31,30,31,31,30,31,30,31]	
    if (Szökőév(örökpapi.év).az == 'igen'){
      hónapHosszuság[1] = 29
    }
    if(örökpapi.hónap > 12 || örökpapi.hónap < 1 || örökpapi.nap > hónapHosszuság[örökpapi.hónap-1] || örökpapi.nap < 1){
      örökpapi.backNap = "Holnapután kiskedden"
      örökpapi.backHónap = undefined
      örökpapi.backYear = undefined
      örökpapi.backNapszám = undefined
    }else{
      örökpapi.backNap = öröknaptár(örökpapi.év,örökpapi.hónap,örökpapi.nap)
      örökpapi.backHónap = HónapSzámToSzöveg(örökpapi.hónap)
      örökpapi.backYear = örökpapi.év
      örökpapi.backNapszám = örökpapi.nap
    }
    let dátum = new Date()
    dátum.setFullYear(örökpapi.év,örökpapi.hónap-1,örökpapi.nap)
    örökpapi.megnevezo = leszVagyVoltVagyVan(dátum)
  }
  const calcÉvszám = () => {
    const hónapHosszuság = [31,28,31,30,31,30,31,31,30,31,30,31]	
    let évnapjai=0
    if (Szökőév(évszám.év).az == 'igen'){
      hónapHosszuság[1] = 29
    }
    for (let i = 0; i < hónapHosszuság.length; i++) {
      évnapjai += hónapHosszuság[i]
    }
    if((évszám.szám <= évnapjai) && (évszám.szám>0)){
      évszám.back = ÉvSzámDátummá(évszám.év,évszám.szám)
      évszám.back.év = évszám.év
      évszám.back.hónap = HónapSzámToSzöveg(Number(évszám.back.hónap))
    }
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
    <h3>A kiválasztott év előtt {#if szokoev.back?.eddig != undefined}
      {szokoev.back.eddig}
    {/if} szökőév volt</h3>
    {#if szokoev.ejnye}
      <h3 class="text-red-900 font-bold">A szökőéveket 1582-től számítjuk!</h3>
    {/if}
    <form on:submit|preventDefault={calcSzokoev}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={szokoev.selected}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg w-28 text-lg p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Húsvét vasárnap számoló</h2>
    <h3>{#if hvasarbap.back?.ev}{hvasarbap.back.ev}{/if}-ban/ben {#if hvasarbap.back?.hónap}{hvasarbap.back.hónap}{/if} {#if hvasarbap.back?.nap}{hvasarbap.back.nap}{/if}. napján {#if hvasarbap.megnevezo}{hvasarbap.megnevezo}{/if} húsvét vasárnap</h3>
    <form on:submit|preventDefault={calcHvasar}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={hvasarbap.selected}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Péntek 13 számoló</h2>
    <h3>{#if p13.backYear}{p13.backYear}{/if}-ban/ben a következő hónapokban {#if p13.megnevezo}{p13.megnevezo}{/if} 13. péntek: {#if p13.back}{p13.back}{/if}</h3>
    <form on:submit|preventDefault={calcP13}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={p13.selected}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Év hányadik napja</h2>
    <h3>{#if évnap.backYear}{évnap.backYear}{/if} {#if évnap.back}{évnap.back}{/if} napja</h3>
    <form on:submit|preventDefault={calcévnap}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={évnap.év}>
      <input type="number" required placeholder="hónap" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={évnap.hónap}>
      <input type="number" required placeholder="nap" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={évnap.nap}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Születési számoló</h2>
    <h3>{#if szülszal.back !==undefined}{szülszal.back}{/if}% annak az esélye, hogy ketten egy napon születtek</h3>
    <form on:submit|preventDefault={calcszülszal}>
      <input type="number" required placeholder="emberek" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={szülszal.emberek}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Öröknaptár</h2>
    <h3>{#if örökpapi.backYear !==undefined}{örökpapi.backYear+"."}{/if} {#if örökpapi.backHónap !==undefined}{örökpapi.backHónap}{/if} {#if örökpapi.backNapszám !==undefined}{örökpapi.backNapszám+"."}{/if} {#if örökpapi.backNap !==undefined}{örökpapi.backNap}{/if} {#if örökpapi.megnevezo !== undefined}{örökpapi.megnevezo}{/if}</h3>
    <form on:submit|preventDefault={calcÖrökpapi}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={örökpapi.év}>
      <input type="number" required placeholder="hónap" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={örökpapi.hónap}>
      <input type="number" required placeholder="nap" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={örökpapi.nap}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
  <div class="bg-blue-600 md:mx-56 xl:mx-96 mx-2 p-5 my-5 rounded-3xl">
    <h2 class="text-2xl mb-2">Év hányadik napja milyen dátum</h2>
    <h3>{#if évszám.back?.év !==undefined}{évszám.back.év+"."}{/if} {#if évszám.back?.hónap !==undefined}{évszám.back.hónap}{/if} {#if évszám.back?.nap !==undefined}{évszám.back.nap+"."}{/if}</h3>
    <form on:submit|preventDefault={calcÉvszám}>
      <input type="number" required placeholder="év" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={évszám.év}>
      <input type="number" required placeholder="szám" class="text-white duration-200 focus:bg-blue-700 text-lg placeholder:text-white text-center w-28 rounded-lg p-1 bg-blue-500" bind:value={évszám.szám}>
      <button type="submit" class="bg-blue-500 duration-200 mt-2 hover:bg-blue-700 rounded-lg text-lg w-28 p-1">Számolás</button>
    </form>
  </div>
</main>

<div class="text-white md:fixed md:bottom-2 md:right-4 text-center mb-3 md:mb-0">
  <h1 class="text-xl sticky">Ampix 2021-2023</h1>
</div>