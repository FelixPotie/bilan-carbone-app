import React from 'react';
import { AppBarProps, Hidden, WithStyles } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from './AppBar';
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Toolbar, { styles as toolbarStyles } from '../Toolbar';
import NavBarLinks from './NavBarLinks';
import { useTranslation} from 'react-i18next'


// @material-ui/icons
import Menu from "@material-ui/icons/Menu";

const styles = (theme: Theme) => createStyles({
  appResponsive: {
    margin: "15% 10% 15% 10%"
  },
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  left: {
    flex: 0,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    // color: theme.palette.secondary.main,
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },

  NavBarLinks:{
    color:'white'
  },

  NavDrawerLinks:{
    display: 'flex',
    flexDirection: 'column',
  },
  
  linksContainerBar:{
    fontSize: 16,
    margin:'10px'
  },

  linksContainerDrawer:{
    color: 'black', //use theme black text 
    fontSize: 16,
    margin:'10px'
  },

  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: 260,
    boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
  }

});



function NavBar(props: WithStyles<typeof styles> & AppBarProps) {
  const { classes } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const  {t, i18n} = useTranslation();
  

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>

          <div /* left */>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/home"
            >
              {t("APP_NAME")}
            </Link>
          </div>
          <div /* center */>
            <Hidden smDown implementation="css">
              <NavBarLinks classesRow={classes.NavBarLinks} classesLinks={classes.linksContainerBar} />
            </Hidden>
          </div>
          <div /* right */>
            <Hidden smDown implementation="css">
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href="/signin"
              >
                {t("LOGIN")}
              </Link>
            </Hidden>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </div>
        </Toolbar>
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              <NavBarLinks classesRow={classes.NavDrawerLinks} classesLinks={classes.linksContainerDrawer}/>
              <Link
                style={{margin:'10px'}} //don't take his 10 px fukkk
                variant="h6"
                underline="none"
                className={classes.linksContainerDrawer}
                href="/signin"
              >
                {t("LOGIN")}
              </Link>
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

export default withStyles(styles)(NavBar);
