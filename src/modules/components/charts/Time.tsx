import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '2018', carbon: 4000,
  },
  {
    name: '2019', carbon: 3000,
  },
  {
    name: '2020', carbon: 2000,
  },
  {
    name: '2021', carbon: 2780,
  }
];

function TimeCharts(){

    return (
      <div style={{ width: 500, height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="carbon" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}
export default TimeCharts;