

export const displayMobilityDate = (date: string): string => {
    return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
}

export const mobilityCarbonEmission = (travels: any): number => {
    var sum = 0;
    travels.forEach((travel: any) => {
        travel.steps.forEach((step: any) => {
            sum = sum + step.carboneEmission;
        })
    });
    return sum;
}

export const mobilityTravelsType = (travels: any): string[] => {
    return travels.map((travel: any) => travel.type)
}
