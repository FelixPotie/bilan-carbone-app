import * as React from 'react';
import { data } from '../ademe/ges-transport'
import { calculateur } from '../ademe/calcul'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CheckIcon from '@material-ui/icons/Check';

interface ComparatorProps {
    meansOfTransport: String,
    distance: number,
    nbPers: number,
    emissions: number
}



function Comparator(props: ComparatorProps) {
    const { t } = useTranslation('simulationPage');

    function alternative(): string[] {
        let t: string[] = []
        if (props.distance !== 0 && props.nbPers === 1 && (props.meansOfTransport === "CAR" || props.meansOfTransport === "ELECTRIC_CAR"))
            t.push("CARPOOLING")
        data.map((element) => {
            if (props.distance > element.bornes[0] && props.distance < element.bornes[1]) {
                if (calculateur(props.distance, element.name, props.nbPers) < props.emissions)
                    t.push(element.name)
            }
        })
        return t
    }

    return <React.Fragment>

        {props.distance !== 0 &&
            <Typography variant="h5">
                {t("ALTERNATIVE")}
            </Typography>}
        <List>
            {
                alternative().map(element =>
                    element === "CARPOOLING" ?
                        <ListItem><ListItemIcon><AutorenewIcon /></ListItemIcon><ListItemText>{t("CARPOOLING")}</ListItemText></ListItem>
                        :
                        <ListItem>
                            <ListItemIcon>
                                <AutorenewIcon />
                            </ListItemIcon>
                            <ListItemText>
                                {t("EN")} {t(element)} {t("REDUCE_BY")} {Math.round((1 - calculateur(props.distance, element, props.nbPers) / props.emissions) * 1000) / 10} % {t("YOUR_EMISSIONS")}
                            </ListItemText>
                        </ListItem>)
            }
        </List>
        <List>
            {props.distance !== 0 && alternative().length == 0 &&
                <ListItem>
                    <ListItemIcon>
                        <CheckIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        {t("BEST_SOLUTION")}
                    </ListItemText>
                </ListItem>}
        </List>

    </React.Fragment>;
}

export default Comparator;
