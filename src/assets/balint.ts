function Szökőév(év: number) {
	let output: { az: 'igen' | 'nem'; eddig?: number; next?: number } = { az: 'nem' }
	if (!(év % 4)) {
		output.az = 'igen'
		output.next = év + 4
	} else {
		if ((év + 1) % 4 == 0) {
			output.next = év + 1
		}
		if ((év + 2) % 4 == 0) {
			output.next = év + 2
		}
		if ((év + 3) % 4 == 0) {
			output.next = év + 3
		}
	}
	let count = 0
	for (let index = 0; index < év; index++) {
		if (index % 4 == 0) {
			count++
		}
	}
	output.eddig = count - 1
	return output
}