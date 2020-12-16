import React from 'react';
import ProductCategories from '../modules/views/ProductCategories';
import HomeHeader from '../modules/views/HomeHeader';
import ProductValues from '../modules/views/ProductValues';
import HowItWorks from '../modules/views/HowItWorks';
import withRoot from '../modules/withRoot';

function Index() {

  return (
    <React.Fragment>
      <HomeHeader />
      <ProductValues />
      <ProductCategories />
      <HowItWorks />
    </React.Fragment>
  );
}

export default withRoot(Index);
