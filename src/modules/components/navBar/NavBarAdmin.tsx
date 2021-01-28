import React from 'react';
import { AppBarProps, Hidden, WithStyles } from '@material-ui/core';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import SignInOutButton from './SignInOutButton';
import Toolbar, { styles as toolbarStyles } from '../Toolbar';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { RootState } from '../../../redux';
import { connect, ConnectedProps } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  appResponsive: {
    margin: "15% 10% 15% 10%"
  },
  title: {
    fontSize: 24,
    color: theme.palette.common.white,
    textDecoration: 'none',
    textTransform: 'uppercase'
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
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
    textDecoration: 'none',
    textTransform: 'uppercase'
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
    margin:'10px',
    color: "white",
    textDecoration: "none",
    textTransform: "uppercase"
    
  },

  linksContainerDrawer:{
    color: 'black', //use theme black text 
    margin:'10px',
    textDecoration: 'none',
    textTransform: 'uppercase'
  },

  empty:{ //should be deleted
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

}));

const mapState = (state: RootState, ownProps: any) => {
  return {
      admin: state.admin
  }
}

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function NavBarAdmin(props: Props) {
    const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <div  >
            <a
              className={classes.title}
              href='/home'
            >
              Retourner sur MOBILAN
            </a>
            </div>
            { props.admin.isLoggedIn &&
              <div  >
                <Hidden mdDown implementation="css">
                  <Link
                    className={classes.rightLink}
                    to='/admin/export-data'
                  >
                    Exporter les données
                  </Link>
                  <Link
                      className={classes.rightLink}
                      to='/admin/list'
                  >
                    Gestion des admins
                  </Link>
                  <Link
                      className={classes.rightLink}
                      to='/admin/departments'
                  >
                    Gestion des sections
                  </Link> 
                </Hidden>
              </div>
            }
            
            <div /* right */>
              <Hidden mdDown implementation="css">
                <div className={classes.rightLink}>
                  <SignInOutButton classesName={classes.rightLink} classes={classes} label="admin"/>
                </div>
              </Hidden>
              <Hidden lgUp>
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
          <Hidden lgUp implementation="js">
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
                { props.admin.isLoggedIn &&
                  <div className={classes.NavDrawerLinks}>
                    <Link
                      className={classes.linksContainerDrawer} 
                      onClick={handleDrawerToggle}
                      to='/admin/export-data'
                    >
                      Exporter les données
                    </Link>
                    <Link
                        className={classes.linksContainerDrawer}
                        onClick={handleDrawerToggle}
                        to='/admin/list'
                    >
                      Gestion des admins
                    </Link>
                    <Link
                        className={classes.linksContainerDrawer}
                        onClick={handleDrawerToggle}
                        to='/admin/departments'
                    >
                      Gestion des sections
                    </Link> 
                  </div>
                }
                <div className={classes.NavDrawerLinks} >
                  <SignInOutButton classesName={classes.linksContainerDrawer} classes={classes}/>
                </div>
              </div>
            </Drawer>
          </Hidden>
        </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

export default connector(NavBarAdmin);
