import React from "react";
import Chart from "react-google-charts";
import useCurrencyFormatter from "services/currency-formatter";

interface Props {
  data: {
    header?: string[];
    colors?: string[];
    data: string[];
  };
}

const PieChart = ({ data }: Props): JSX.Element => {
  const { getCurrency } = useCurrencyFormatter();
  const chartData = [data.header, ...data.data];
  return (
    <React.Fragment>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="PieChart"
        data={data.data.length ? chartData : [["", ""]]}
        formatters={[
          {
            type: "NumberFormat",
            column: 1,
            options: {
              suffix: ` ${getCurrency()}`
            }
          }
        ]}
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
