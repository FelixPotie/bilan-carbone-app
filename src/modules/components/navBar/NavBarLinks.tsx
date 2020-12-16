import { Link } from "@material-ui/core";
import { AppBarProps } from "material-ui";
import React from "react";

interface NavBarLinksProps {
    classesRow: string
    classesLinks: string
}


function NavBarLinks(props: AppBarProps & NavBarLinksProps) {
    const { classesRow, classesLinks } = props;

    return (
        <div className={classesRow}>
            <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classesLinks}
                href="/home"
            >
                {'Accueil'}
            </Link>
            <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classesLinks}
                href="/simulation"
            >
                {'Simuler'}
            </Link>
            <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classesLinks}
                href="statistics"
            >
                {'Statistiques'}
            </Link>
        </div>
    );
}

export default NavBarLinks;
