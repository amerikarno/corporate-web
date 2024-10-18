import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ColumnChartProps {
  height: number;
  categories: string[];
  series: ApexOptions["series"];
}

const ColumnChart: React.FC<ColumnChartProps> = ({
  height,
  series,
  categories,
}) => {
  const columnWidth = "15%";
  const options: ApexOptions = {
    chart: {
      events: {
        mounted: (chart: any) => {
          chart.windowResizeHandler();
        },
      },
      type: "bar",
      height: 320,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: columnWidth,
      },
    },
    grid: {
      borderColor: "rgba(119, 119, 142, 0.05)",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#6366f1", "#60a5fa", "#f43f63"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    legend: {
      show: true,
      labels: {
        colors: "#74767c",
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      title: {
        style: {
          color: "#8c9097",
        },
      },
      labels: {
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return "$ " + val + " Bath";
        },
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        height={height}
        options={options}
        series={series}
        type="bar"
      />
    </div>
  );
};

export default ColumnChart;
