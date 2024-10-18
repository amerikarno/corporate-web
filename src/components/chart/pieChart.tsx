import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PieChartProps {
  series: number[];
  colors: string[];
  labels: string[];
  width: string | number;
  height: string | number;
}

const PieChart: React.FC<PieChartProps> = (props: PieChartProps) => {
  const options: ApexOptions = {
    chart: {
      events: {
        mounted: (chart: any) => {
          chart.windowResizeHandler();
        },
      },
      width: props.width,
      type: "pie",
    },
    colors: props.colors,
    labels: props.labels,
    legend: {
      position: "bottom",
      labels: {
        colors: "#74767c",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        height={props.height}
        options={options}
        series={props.series}
        type="pie"
      />
    </div>
  );
};

export default PieChart;
