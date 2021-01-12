import { data } from './ges-transport'


const dansIntervalle = (distance: number, inter: string) => {
	const de : number = +inter.split('de')[1].split('a')[0];
	const aRaw : string = inter.split('a')[1];
	const a : number = (aRaw==="Inf") ? Infinity : +aRaw;
	return distance >= de && distance < a;

}

export const calculateur = (distance : number, moyen: string, voyageurs :number = 1) : number => {
	switch(moyen){
		case "PLANE": {
			const intervalle = Object.keys(data[moyen].parPersonne).find(inter => dansIntervalle(distance,inter))
			if(intervalle){
				return data[moyen].parPersonne[intervalle]*distance;
			}
			return -1;
		}
		case "CAR" : case "ELECTRIC_CAR": {
			return (data[moyen].parVehicule*distance)/voyageurs;
		}
		case "TER" : case "MOTO" : case "TGV" : case "BUS" : {
			return (data[moyen].parPersonne*distance);
		}

		default:{
			return -1
		}
	}
}