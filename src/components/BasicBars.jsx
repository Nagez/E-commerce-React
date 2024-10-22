import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({ data }) {
  /*data format
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
  */
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: data.products }]} 
      series={[{ data: data.quantities }]}                 
      width={500}
      height={300}
    />
  );
}
