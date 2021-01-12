import React from 'react';
import withRoot from '../modules/withRoot';
import StatisticsView from '../modules/views/Statistics';



function Statistics() {
    return (
    <React.Fragment>
      <StatisticsView/>
    </React.Fragment>
  );
}

export default withRoot(Statistics);
