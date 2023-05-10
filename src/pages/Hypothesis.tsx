import withRoot from "../modules/withRoot";
import Auth from "../modules/components/Auth";
import React from "react";
import Typography from "../modules/components/Typography";
import {data} from "../modules/ademe/ges-transport";
import {useTranslation} from "react-i18next";

function Hypothesis() {
    const { t } = useTranslation('simulationPage');

    return (
        <div style={{marginBottom: '32px'}}>
            <Auth/>
            <Typography style={{fontSize: '2.5rem', margin: '16px'}} color="inherit" align="center" variant="h2" >
                Hypothèse du calculateur d'émission
            </Typography>
            <Typography style={{ margin: '16px'}} color="inherit" align="center" variant="h5">
                Ci-dessous les hypothèses de notre calculateur carbone basé sur les données de l'ADEME.
            </Typography>
            {data.map((meanOfTransport) => {
                if (meanOfTransport.name !== "PLANE") {
                    return (
                        <Typography style={{ margin: '8px'}} color="inherit" align="center" variant="h5">
                            {t(meanOfTransport.name)} :
                            de {meanOfTransport.bornes[0]} à {meanOfTransport.bornes[1]} km,
                            équivalent CO2 par km : <b>{ meanOfTransport.parPersonne !== undefined ? meanOfTransport.parPersonne + ' gCO2e/km/personne' : meanOfTransport.parVehicule + ' gCO2e/km/vehicule' }</b>
                        </Typography>
                    )
                } else {
                    return (
                        <Typography style={{ margin: '8px'}} color="inherit" align="center" variant="h5">
                            {t(meanOfTransport.name)} :
                            de {meanOfTransport.bornes[0]} à {meanOfTransport.bornes[1]} km,
                            équivalent CO2 par km  :<br/>
                            de 0 à 1000: <b>126 gCO2e/km/personne</b>, <br/>
                            de 1000 à 2000: <b>102 gCO2e/km/personne</b>,<br/>
                            de 2000 à 3500: <b>97.4 gCO2e/km/personne</b>,<br/>
                            de 3500 à Inf: <b>82.8 gCO2e/km/personne</b><br/>
                        </Typography>)
                }
            })}
        </div>
    )
}

export default withRoot(Hypothesis);
