import React from "react";
import Chart from "react-google-charts";

interface Props {
  hTitle: string;
  vTitle: string;
  data: {
    header?: string[];
    colors?: string[];
    data: string[];
  };
}

const LineChart = ({ data, hTitle, vTitle }: Props): JSX.Element => {

  const chartData = data.header?.length ? [data.header, ...data.data] : [];

  return (
    <React.Fragment>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="LineChart"
        data={data.data.length ? chartData : [['', ''], []]}
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
