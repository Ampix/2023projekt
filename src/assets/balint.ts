/**
 * Kiszámolja a megadott év szökőév-e és mikor lesz a következő
 * @param év - Az év amit ellenőrizni kell
 * @returns output.az = igen/nem, output.next = következő, output.eddig = hány szökőév volt az évig
 */
export function Szökőév(év: number) {
	let output: { az: 'igen' | 'nem'; eddig?: number; next?: number } = { az: 'nem' }
	if (év > 1582){
	if (!(év % 4)) {
		if(((év%100)!=0) || !(év%400)){
			output.az = 'igen'
			if(((év+4)%100)!=0){
				output.next = év + 4
			}else{
				output.next = év + 8
			}
		}else{
			if(((év+4)%100)!=0){
				output.next = év + 4
			}else{
				output.next = év + 8
			}
		}
	} else {
		if (((év + 1) % 4 == 0)&&((év+1)% 100 !=0)|| (!((év+1)%400))) {
			output.next = év + 1
		}
		if (((év + 2) % 4 == 0)&&((év+2)% 100 !=0)|| (!((év+2)%400))) {
			output.next = év + 2
		}
		if (((év + 3) % 4 == 0)&&((év+3)% 100 !=0)|| (!((év+3)%400))) {
			output.next = év + 3
		}
	}}
	if(év == 1582){
		output.next = 1584
	}
	let count = 0
	for (let index = 1582; index < Math.abs(év); index++) {
		if ((!(index % 4) && (((index%100)!=0)) || (!(index%400)))) {
			count++
		}
	}
	output.eddig = count
	return output
}
export function HónapSzámToSzöveg(HónapSzám:number){
	let hónapok = ['január','február','március','április','május','június','július','augusztus','szeptember','október','november','december']
	return hónapok[HónapSzám-1]
}
/**
 * Kiszámítja hogy az adott évben mikorra esik húsvét vasárnapja
 * @param év - a kivánt év
 * @returns output.hónap = hónap, output.nap = nap
 */
export function HusvétVasárnap(év: number){
	var a = év % 19;
    var b = Math.floor(év / 100);
    var c = év % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
	let hónap:string|number = Math.floor((h + l - 7 * m + 114) / 31)
	let nap = ((h + l - 7 * m + 114) % 31) + 1
	let output:{hónap?:number,nap?:number,ev?:number} = {}
	
	output.hónap = hónap
	output.nap = nap
	output.ev = év
	return output
}
export function NapSzámToSzöveg(napSzám:number){
	let napok = ['hétfő','kedd','szerda','csütörtök','péntek','szombat','vasárnap']
	return napok[napSzám]
}

export function öröknaptár(év:number,hónap:number,dátum:number){
	return NapSzámToSzöveg(MilyenNap(év,hónap,dátum)-1)
}

function MilyenNap(év:number,hónap:number,dátum:number){
	if (hónap < 3) {
		hónap += 12;
		év -= 1;
	  }
	const J:number = Math.floor(év/100)
	const K:number =(év%100)

	let h:number|string = (dátum + Math.floor((13 * (hónap + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J) % 7;
	let nap = ((h+5)%7)+1
	return nap
}
export function PéntekTizenHárom(év: number){
	let output = []
	for (let index = 1;index < 13; index++) {
		if(output.length>3){
			index = 13
		}else{
			if (MilyenNap(év,index,13) == 5){
				output.push(HónapSzámToSzöveg(index))
			}
		}
	}
	return output
}

export function ÉvHanyadikNapja(év:number,hónap:number,nap:number) {
	const hónapHosszuság = [31,28,31,30,31,30,31,31,30,31,30,31]	
	if (Szökőév(év).az == 'igen'){
		hónapHosszuság[1] = 29
	}
	let output:number = 0
	for (let index = 0; index < hónap-1; index++) {
		output += hónapHosszuság[index]
	}
	output += nap
	return output
}

export function SzületésnapEsélyek(emberek:number):number{
	let output = 1
	for (let index = 1; index < emberek; index++) {
		output *= (365-index)/365
	}
    return Math.floor((1-output)*100)
}