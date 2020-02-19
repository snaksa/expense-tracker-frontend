import React, { useRef } from "react";
import Chart from "react-google-charts";

interface Props {
  loading: boolean;
  data: {
    header?: string[];
    colors?: string[];
    data: string[];
  };
}

const PieChart = ({ data, loading }: Props): JSX.Element => {

  const oldData: any = useRef([]);

  const chartData = [data.header, ...data.data];
  if (data.header && data.header.length > 0) {
    oldData.current = data.data;
  }

  return (
    <Chart
      width={"100%"}
      height={"300px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={
        chartData && !loading
          ? chartData
          : oldData.current.length
          ? oldData.current
          : ["", ""]
      }
      options={{
        chartArea: { width: "100%", height: "80%" },
        legend: { position: "bottom" },
        colors: data.colors ?? []
      }}
    />
  );
};

export default PieChart;