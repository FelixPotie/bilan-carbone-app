import {
    makeStyles,
} from '@material-ui/core/styles';
import * as React from 'react';
import { data } from '../ademe/ges-transport'
import { calculateur } from '../ademe/calcul'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AutorenewIcon from '@material-ui/icons/Autorenew';

interface ComparatorProps {
    meansOfTransport: String,
    distance: number,
    nbPers: number,
    emissions: number
}



function Comparator(props: ComparatorProps) {
    const { t} = useTranslation('simulationPage');
    return <React.Fragment>
        
            {props.distance !== 0 &&
            <Typography variant="h5">
                {t("ALTERNATIVE")}
            </Typography>}
            <List>
                {(props.distance !== 0 && props.nbPers === 1 && (props.meansOfTransport === "CAR" || props.meansOfTransport == "ELECTRIC_CAR")) && <div><ListItem><ListItemIcon><AutorenewIcon /></ListItemIcon><ListItemText>{t("CARPOOLING")}</ListItemText></ListItem></div>}
                {data.map((element) => (
                    ((props.distance > element.bornes[0] && props.distance < element.bornes[1]) &&
                        calculateur(props.distance, element.name, props.nbPers) < props.emissions) &&
                    <ListItem>
                        <ListItemIcon>
                            <AutorenewIcon />
                        </ListItemIcon>
                        <ListItemText>
                            {t("EN")} {t(element.name)} {t("REDUCE_BY")} {Math.round((1-calculateur(props.distance, element.name, props.nbPers)/props.emissions)*1000)/10} % {t("YOUR_EMISSIONS")}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        
    </React.Fragment>;
}

export default Comparator;
