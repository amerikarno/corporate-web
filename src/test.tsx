import ColumnChart from "./components/chart/columnChart";
import PieChart from "./components/chart/pieChart";
import { prepareDataForColumnChart, prepareDataForPieChart } from "./lib/utils";
import { portMock } from "./pages/portfolio/__mock__/portMock";
import { TPortfolio } from "./pages/portfolio/types";

export default function TestChart() {
  const port: TPortfolio[] = portMock;
  const dataPieChart = prepareDataForPieChart(port);
  const dataColumnChart = prepareDataForColumnChart(port);

  return (
    <>
      <PieChart
        series={dataPieChart.series}
        colors={dataPieChart.colors}
        labels={dataPieChart.labels}
        width={300}
        height={240}
      />
      <ColumnChart
        categories={dataColumnChart?.categories}
        height={160}
        series={dataColumnChart?.series}
      />
    </>
  );
}
