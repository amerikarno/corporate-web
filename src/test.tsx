// import ColumnChart from "./components/chart/columnChart";
// import PieChart from "./components/chart/pieChart";
// import { prepareDataForColumnChart, prepareDataForPieChart } from "./lib/utils";
// import { portMock } from "./pages/portfolio/__mock__/portMock";
// import { TPortfolio } from "./pages/portfolio/types";

// export default function Test() {
//   const port: TPortfolio[] = portMock;
//   const dataPieChart = prepareDataForPieChart(port);
//   const dataColumnChart = prepareDataForColumnChart(port);

//   return (
//     <>
//       <PieChart
//         series={dataPieChart.series}
//         colors={dataPieChart.colors}
//         labels={dataPieChart.labels}
//         width={300}
//         height={240}
//       />
//       <ColumnChart
//         categories={dataColumnChart?.categories}
//         height={160}
//         series={dataColumnChart?.series}
//       />
//     </>
//   );
// }

import { useEffect, useState } from "react";

const Test = () => {
  const [listDevices, setListDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        if (device.kind === "videoinput") {
          var option = document.createElement("option");
          option.value = device.deviceId;
          option.text = device.label || "camera " + (i + 1);
          document.querySelector("select#videoSource")?.appendChild(option);
        }
        setListDevices(devices);
      }
    });
  }, []);

  return (
    <div className="space-y-20">
      <pre>{JSON.stringify(listDevices, null, 2)}</pre>
    </div>
  );
};

export default Test;
