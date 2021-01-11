import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, Legend,
} from 'recharts';

const data = [
  { name: 'Stage', value: 700 },
  { name: 'Semestre', value: 200 },
  { name: 'Double diplôme', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (data : any) => {
   const radius = data.innerRadius + (data.outerRadius - data.innerRadius) * 0.5;
  const x = data.cx + radius * Math.cos(-data.midAngle * RADIAN);
  const y = data.cy + radius * Math.sin(-data.midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > data.cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(data.percent * 100).toFixed(0)}%`}
    </text>
  );
};

function TypeCharts() {

    return (
      <PieChart width={220} height={220}>
        <Legend />

        <Pie
          data={data}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
        >

          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>

      </PieChart>
    );
}
export default TypeCharts;
