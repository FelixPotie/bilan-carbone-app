import React from 'react';
import ColabSection from '../modules/views/homePage/ColabSection';
import HomeHeader from '../modules/views/homePage/HomeHeader';
import GraphSection from '../modules/views/homePage/GraphSection';
import ShowStatSection from '../modules/views/homePage/ShowStatSection';
import withRoot from '../modules/withRoot';
import Auth from '../modules/components/Auth';
import { makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
    body: {
      backgroundColor: theme.palette.secondary.light,
    }
}));

function Index() {
  const classes = useStyles();
  return (
    <React.Fragment >
      <Auth/>
      <HomeHeader />
      <div className={classes.body}>
        <GraphSection />
        <ColabSection />
        <ShowStatSection />
      </div>
    </React.Fragment>
  );
}

export default withRoot(Index);
