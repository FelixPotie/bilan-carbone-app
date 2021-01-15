import {
    makeStyles,
} from '@material-ui/core/styles';
import * as React from 'react';
import { data } from '../ademe/ges-transport'
import { calculateur } from '../ademe/calcul'
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface ComparatorProps {
    meansOfTransport: String,
    distance: number,
    nbPers: number,
    emissions: number
}

const useStyles = makeStyles((theme) => ({
    alternative: {
        marginLeft: "10px"
    },
}));




function Comparator(props: ComparatorProps) {
    const { t} = useTranslation('simulationPage');
    const classes = useStyles();
    return <React.Fragment>
        {(props.distance !== 0 && props.nbPers === 1 && (props.meansOfTransport === "CAR" || props.meansOfTransport == "ELECTRIC_CAR")) && <div>{t("CARPOOLING")}</div>}
        {props.distance !== 0 &&
            <Typography variant="h5">
                {t("ALTERNATIVE")}
        </Typography>}
        {data.map((element) => (
            ((props.distance > element.bornes[0] && props.distance < element.bornes[1]) &&
                calculateur(props.distance, element.name, props.nbPers) < props.emissions) &&
            <div>
                <div className={classes.alternative}>- {t("IN")} {t(element.name)} {t("REDUCE_BY")} {Math.round((1-calculateur(props.distance, element.name, props.nbPers)/props.emissions)*1000)/10} % {t("YOUR_EMISSIONS")}</div>
            </div>
        ))}
    </React.Fragment>;
}

export default Comparator;
