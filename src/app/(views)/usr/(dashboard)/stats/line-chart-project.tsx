import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChartProject = () => {
  const dummyLineData = [
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 14 },
    { month: 'Mar', value: 8 },
    { month: 'Apr', value: 12 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 15 },
    { month: 'Jul', value: 20 },
    { month: 'Aug', value: 17 },
    { month: 'Sep', value: 14 },
    { month: 'Oct', value: 19 },
    { month: 'Nov', value: 13 },
    { month: 'Dec', value: 22 },
  ];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth',
      width:3
    },
    xaxis: {
      categories: dummyLineData.map(item => item.month),
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#60a5fa'],
    grid: {
      show: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
  };

  const chartSeries = [
    {
      name: 'Projects',
      data: dummyLineData.map(item => item.value),
    },
  ];

  return (
    <div className='w-full h-full'>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={'100%'}
        width={'100%'}
      />
    </div>
  );
};

export default LineChartProject;
