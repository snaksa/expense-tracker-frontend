import React, { useRef } from "react";
import Chart from "react-google-charts";
import Loader from "components/atoms/loader";

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
    <React.Fragment>
      <Loader loading={loading} />
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="PieChart"
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
    </React.Fragment>
  );
};

export default PieChart;
