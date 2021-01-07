import { Link } from "@material-ui/core";
import { AppBarProps } from "material-ui";
import React from "react";
import { useTranslation} from 'react-i18next'
import NavBarIn from "./NavBarIn";


interface NavBarLinksProps {
    classesRow: string
    classesLinks: string
}


function NavBarLinks(props: AppBarProps & NavBarLinksProps) {
    const { classesRow, classesLinks } = props;

    const  {t, i18n} = useTranslation();

    return (
        <div className={classesRow}>
            <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classesLinks}
                href="/home"
            >
                {t("HOME")}
            </Link>
            <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classesLinks}
                href="/simulation"
            >
                {t("SIMULATE")}
            </Link>
            <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classesLinks}
                href="statistics"
            >
                {t("STATISTICS")}
            </Link>
            <NavBarIn classesLinks={classesLinks}/>
        </div>
    );
}

export default NavBarLinks;
