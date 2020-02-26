import React from "react";
import Chart from "react-google-charts";

interface Props {
  data: {
    header?: string[];
    colors?: string[];
    data: string[];
  };
}

const PieChart = ({ data }: Props): JSX.Element => {
  const chartData = [data.header, ...data.data];
  return (
    <React.Fragment>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="PieChart"
        data={data.data.length ? chartData : [['', '']]}
        options={{
          chartArea: { width: "100%", height: "80%" },
          legend: { position: "bottom" },
          colors: data.colors ?? []
        }}
      />
    </React.Fragment>
  );
};

export default PieChart;
