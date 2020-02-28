import React from "react";
import Chart from "react-google-charts";
import useCurrencyFormatter from "services/currency-formatter";

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
  const { getCurrency } = useCurrencyFormatter();
  const chartData = data.header?.length ? [data.header, ...data.data] : [];

  return (
    <React.Fragment>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="LineChart"
        data={data.data.length ? chartData : [['', ''], ['', 0]]}
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
          hAxis: {
            title: hTitle,
            type: "date",
            format: "Y-MM-dd"
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
