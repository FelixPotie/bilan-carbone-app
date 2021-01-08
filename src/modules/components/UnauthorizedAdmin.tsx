import { makeStyles } from "@material-ui/core";
import React from "react";
import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
    }
}));


function UnauthorizedAdminContainer() {

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h2" gutterBottom marked="center" align="center" className={classes.title}>
                Erreur 401 !
            </Typography>
            <Typography variant="h5" gutterBottom marked="center" align="center">
                Bonjour, le contenu que vous recherchez nécessite une connexion administrateur. Connectez vous pour y accéder.
            </Typography>
        </div>
        
    );
}
export default UnauthorizedAdminContainer;

