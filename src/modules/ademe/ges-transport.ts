interface meanOfTransport{
    name: string,
    bornes: [number, number],
    parVehicule?: number,
    parPersonne?: any
}

export const data: meanOfTransport[] =[
	{	name: "PLANE",
        bornes: [500,100000],
        parPersonne:{
            de0a1000: 230,
            de1000a2000: 186,
            de2000a3500: 178,
            de3500aInf: 151
		}
	},
    {    name: "CAR",
        bornes: [0,1500],
        parVehicule: 193
	},
	{
		name: "ELECTRIC_CAR",
        bornes: [0,500],
        parVehicule: 19.8
	},
	{
		name: "BUS",
        bornes: [0,1500],
        parPersonne: 35.2
	},
	{
		name: "MOTO",
        bornes: [0,300],
        parPersonne: 168
	},
	{
		name: "TER",
        bornes: [0,500],
        parPersonne: 24.8
	},
	{
		name: "TGV",
        bornes: [0,2500],
        parPersonne: 1.73
    },
  {
    name: "FERRY_PEOPLE",
    bornes:[0,10000],
    parPersonne: 460
  }
]

export const dataTest: any ={
    PLANE : {
        bornes: 20000,
        parPersonne:{
            de0a1000: 230,
            de1000a2000: 186,
            de2000a3500: 178,
            de3500aInf: 151
        }
    },
    TGV : {
        bornes: 1000,
        parPersonne: 1.73
    },
    CAR: {
        bornes: 1500,
        parVehicule: 193
    },
    ELECTRIC_CAR: {
        bornes: 1000,
        parVehicule: 19.8
    },
    BUS : {
        bornes: 1000,
        parPersonne: 35.2
    },
    MOTO: {
        bornes: 500,
        parPersonne: 168
    },
    TER:{
        bornes: 300,
        parPersonne: 24.8
    },
    // intercites : {
    //     bornes: "à partir de 50km",
    //     parPersonne: 5.29
    // },
    // marche : {
    //     bornes: "jusqu'à 10km",
    //     parPersonne: 0
    // },
    // velo : {
    //     bornes: "jusqu'à 30km",
    //     parPersonne: 0
    // },
    // veloElectrique : {
    //     bornes: "jusqu'à 30km",
    //     parPersonne: 2
    // },
    // trotinetteElectrique : {
    //     bornes: "jusqu'à 10km",
    //     parPersonne: 2
    // },
    // busThermique: {
    //     bornes: "jusqu'à 15km",
    //     parPersonne: 103
    // },
    // tramway: {
    //     bornes: "jusqu'à 12km",
    //     parPersonne: 2.2
    // },
    // metro: {
    //     bornes: "jusqu'à 20km",
    //     parPersonne: 2.5
    // },
    // scooter: {
    //     bornes: "jusqu'à 150km",
    //     parPersonne: 61.6
    // },
    // rer:{
    //     bornes: "jusqu'à 100km",
    //     parPersonne: 61.6
    // },
}
