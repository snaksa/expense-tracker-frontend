import React, { useRef } from "react";
import Chart from "react-google-charts";
import Loader from "components/atoms/loader";

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
    <React.Fragment>
      <Loader loading={loading} />
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="LineChart"
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
    </React.Fragment>
  );
};

export default LineChart;
