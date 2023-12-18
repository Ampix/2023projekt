import { Szökőév, ÉvHanyadikNapja } from "./balint"

export function leszVagyVoltVagyVan(dátum:Date){
    let ma = new Date()
    if((dátum.getFullYear() == ma.getFullYear()) && (dátum.getMonth() == ma.getMonth()) && (dátum.getDate() == ma.getDate())){
      return "van"
    }else if(dátum > ma){
        return "lesz"
    }else{
        return "volt"
    }
}

export function ÉvSzámDátummá (év:number,szám:number) {
    const hónapHosszuság = [31,28,31,30,31,30,31,31,30,31,30,31]	
    if (Szökőév(év).az == 'igen'){
      hónapHosszuság[1] = 29
    }
    let hónap:number = 1
    let nap:number = 1
    for (let i = 0; i < hónapHosszuság.length; i++) {
        for (let j = 0; j < hónapHosszuság[i]; j++) {
            if(ÉvHanyadikNapja(év,i+1,j+1) == szám){
                hónap = i+1
                nap = j+1
                break
            }
        }
        
    }    
    return {nap,hónap}
}