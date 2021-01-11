import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'IG', carbon: 4000,
  },
  {
    name: 'GBA', carbon: 3000,
  },
  {
    name: 'STE', carbon: 2000,
  },
  {
    name: 'MEA', carbon: 2780,
  },
  {
    name: 'MAT', carbon: 1890,
  },
  {
    name: 'MI', carbon: 2390,
  },
  {
    name: 'SE', carbon: 3490,
  },
  {
    name: 'EGC', carbon: 2490,
  },
  {
    name: 'DO', carbon: 1490,
  },
  {
    name: 'MSI', carbon: 3090,
  },
];


function DepartmentCharts(){

    return (
      <BarChart
        width={500}
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="carbon" barSize={20} fill="#8884d8" />
      </BarChart>
    );
}

export default DepartmentCharts;
