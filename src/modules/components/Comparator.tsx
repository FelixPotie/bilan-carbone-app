import {
    makeStyles,
} from '@material-ui/core/styles';
import * as React from 'react';
import { data } from '../ademe/ges-transport'
import { calculateur } from '../ademe/calcul'
import { Typography } from '@material-ui/core';

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
    const classes = useStyles();
    return <React.Fragment>
        {(props.nbPers === 1 && (props.meansOfTransport === "CAR" || props.meansOfTransport == "ELECTRIC_CAR")) && <div>pensez covoiturages</div>}
        <Typography variant="h5">
            Alternative(s) possible(s):
        </Typography>
        {data.map((element) => (
            ((props.distance > element.bornes[0] && props.distance < element.bornes[1]) &&
                calculateur(props.distance, element.name, props.nbPers) < props.emissions) &&
            <div className={classes.alternative}>- Peut mieux faire en {element.name}</div>
        ))}
    </React.Fragment>;
}

export default Comparator;
