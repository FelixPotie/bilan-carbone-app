import React from 'react';
import withRoot from '../modules/withRoot';
import StatisticsView from '../modules/views/Statistics';
import Auth from '../modules/components/Auth';



function Statistics() {
    return (
    <React.Fragment>
      <Auth/>
      <StatisticsView/>
    </React.Fragment>
  );
}

export default withRoot(Statistics);
