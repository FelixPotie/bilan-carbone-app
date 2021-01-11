import React from 'react';
import withRoot from '../modules/withRoot';
import DepartmentCharts from '../modules/components/charts/Department';
import SchoolYearCharts from '../modules/components/charts/SchoolYear';
import TypeCharts from '../modules/components/charts/Type';
import TimeCharts from '../modules/components/charts/Time';


function Statistics() {

  return (
    <div>
      <TimeCharts />
      <DepartmentCharts />
      <SchoolYearCharts />
      <TypeCharts />
    </div>
  );
}

export default withRoot(Statistics);
