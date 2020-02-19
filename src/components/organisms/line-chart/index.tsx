import React, { useRef } from "react";
import Chart from "react-google-charts";

interface Props {
  hTitle: string;
  vTitle: string;
  loading: boolean;
  data: {
    header?: string[];
    colors?: string[];
    data: string[];
  };
}

const LineChart = ({ data, loading, hTitle, vTitle }: Props): JSX.Element => {
  const oldData: any = useRef([]);

  const chartData = [data.header, ...data.data];
  if (data.header && data.header.length > 0) {
    oldData.current = data.data;
  }

  return (
    <Chart
      width={"100%"}
      height={"300px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={
        chartData && !loading
          ? chartData
          : oldData.current.length
          ? oldData.current
          : [""]
      }
      options={{
        hAxis: {
          title: hTitle
        },
        vAxis: {
          title: vTitle
        },
        series: {
          ...(data.colors ?? []).map((color: string) => {
            return { color: color };
          })
        }
      }}
    />
  );
};

export default LineChart;
