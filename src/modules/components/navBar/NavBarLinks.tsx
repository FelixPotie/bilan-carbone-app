import { AppBarProps } from "material-ui";
import React from "react";
import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";
import NavBarIn from "./NavBarIn";


interface NavBarLinksProps {
    classesRow: string
    classesLinks: string
}


function NavBarLinks(props: AppBarProps & NavBarLinksProps) {
    const { classesRow, classesLinks } = props;

    const { t } = useTranslation();

    return (
        <div className={classesRow}>
            <Link
                className={classesLinks}
                to="/home"
            >
                {t("HOME")}
            </Link>
            <Link
                className={classesLinks}
                to="/simulation"
            >
                {t("SIMULATE")}
            </Link>
            <Link
                className={classesLinks}
                to="/statistics"
            >
                {t("STATISTICS")}
            </Link>
            <NavBarIn classesLinks={classesLinks} />
        </div>
    );
}

export default NavBarLinks;
