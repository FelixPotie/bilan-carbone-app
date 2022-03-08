import { data } from './ges-transport'


const dansIntervalle = (distance: number, inter: string) => {
	const de : number = +inter.split('de')[1].split('a')[0];
	const aRaw : string = inter.split('a')[1];
	const a : number = (aRaw==="Inf") ? Infinity : +aRaw;
	return distance >= de && distance < a;

}


const findData = (meansOfTransport: String) => data.findIndex((element:any) => element.name === meansOfTransport)

export const calculateur = (distance : number, moyen: string, voyageurs :number = 1) : number => {
	let index= findData(moyen)
	switch(moyen){
		case "PLANE": {
			const intervalle = Object.keys(data[index].parPersonne).find(inter => dansIntervalle(distance, inter))
			if(intervalle){
				return data[index].parPersonne[intervalle]*distance
			}
			return -1;
		}
		case "CAR" : case "ELECTRIC_CAR": {
			return data[index].parVehicule!*distance/voyageurs;
		}
		case "TER" : case "MOTO" : case "TGV" : case "BUS" : case "FERRY_PEOPLE" : {
			return data[index].parPersonne*distance;
		}

		default:{
			return -1
		}
	}
}
