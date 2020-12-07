import React from 'react';
import ProductCategories from '../modules/views/ProductCategories';
import ProductHero from '../modules/views/ProductHero';
import ProductValues from '../modules/views/ProductValues';
import HowItWorks from '../modules/views/HowItWorks';
import withRoot from '../modules/withRoot';
function Index() {
  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <HowItWorks />
    </React.Fragment>
  );
}

export default withRoot(Index);
