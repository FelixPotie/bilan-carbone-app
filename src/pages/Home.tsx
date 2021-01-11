import React from 'react';
import ColabSection from '../modules/views/ColabSection';
import HomeHeader from '../modules/views/HomeHeader';
import GraphSection from '../modules/views/GraphSection';
import ShowStatSection from '../modules/views/ShowStatSection';
import withRoot from '../modules/withRoot';


function Index() {

  return (
    <React.Fragment>
      <HomeHeader />
      <GraphSection />
      <ColabSection />
      <ShowStatSection />
    </React.Fragment>
  );
}

export default withRoot(Index);
