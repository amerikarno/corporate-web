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

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "./components/ui/Button";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

export default function Test() {
  const webcamRef = React.useRef(null);

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const [listDevices, setListDevices] = useState<MediaDeviceInfo[]>([]);

  let videoConstraints: MediaTrackConstraints = {
    facingMode: facingMode,
    width: 270,
    height: 480,
  };

  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

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
      <div className="webcam-container space-y-6">
        <div className="webcam-img">
          <Webcam
            className="webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            screenshotQuality={1}
          />
        </div>
        <Button onClick={handleClick}>Switch camera</Button>
      </div>
      <div className="space-y-20 flex flex-row space-x-4">
        <h1>list devices</h1>
        <pre>{JSON.stringify(listDevices, null, 2)}</pre>
      </div>
      <div className="space-y-20 flex flex-row space-x-4">
        <h1>facingMode</h1>
        <pre>{JSON.stringify(facingMode, null, 2)}</pre>
      </div>
      <div className="space-y-20 flex flex-row space-x-4">
        <h1>videoConstraints</h1>
        <pre>{JSON.stringify(videoConstraints, null, 2)}</pre>
      </div>
    </div>
  );
}
