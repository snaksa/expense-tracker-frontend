import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import { Chart } from "react-google-charts";
import moment from "moment";
import useStyles from "./styles";
import { useCategoriesQuery, Category, TransactionType } from "api";
import CategoriesTable from "components/organisms/categories-table";
import Modal from "components/molecules/modal";
import CategoryForm from "components/organisms/category-form";
import SummaryBox from "components/molecules/summary-box";
import DateRangePicker, { Range } from "components/molecules/date-range-picker";

const CategoriesPage = () => {
  const classes = useStyles();

  const { data } = useCategoriesQuery({ fetchPolicy: "network-only" });
  const categories: any = data?.categories ?? [];

  const [selectedPeriod, setSelectedPeriod] = useState(Range.Last7Days);
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);

  const currentDate: any = moment.utc().set({hour:0,minute:0,second:0,millisecond:0});
  let backDate: any = moment.utc().set({hour:0,minute:0,second:0,millisecond:0});
  if (selectedPeriod === Range.Last7Days) {
    backDate = backDate.subtract(7, "days");
  } else if (selectedPeriod === Range.Last30Days) {
    backDate = backDate.subtract(30, "days");
  } else if (selectedPeriod === Range.Last12Months) {
    backDate = backDate.subtract(12, "months");
  } else if (selectedPeriod === Range.All) {
    backDate = null;
  }

  const spendingChartData = categories.map((category: Category) => {
    let total = 0;
    const transactions = category.transactions ?? [];
    transactions?.forEach((transaction: any) => {
      const date: any = moment.utc(transaction.date);
        total +=
          transaction.type === TransactionType.Expense && date >= backDate
            ? transaction.value
            : 0;
    });
    return [category.name, total];
  });

  const incomeChartData = categories.map((category: Category) => {
    let total = 0;
    const transactions = category.transactions ?? [];
    transactions?.forEach((transaction: any) => {
      const date: any = moment.utc(transaction.date);
        total +=
          transaction.type === TransactionType.Income && date >= backDate
            ? transaction.value
            : 0;
    });
    return [category.name, total];
  });

  const flowChart = [];

  if (!backDate) {
    categories.forEach((category: Category) => {
      const transactions = category.transactions ?? [];
      transactions.forEach((transaction: any) => {
        const date: any = moment.utc(transaction.date);
        if(!backDate) {
          backDate = date;
        }
        else if (date < backDate) {
          backDate = date;
        }
      });
    });
  }

  const getFlowData = (category: Category) => {
    let total = 0;
    const transactions = category.transactions ?? [];

    transactions.forEach((transaction: any) => {
      const date: any = moment.utc(transaction.date);
      total +=
        transaction.type === TransactionType.Expense &&
        date.date() === backDate.date() &&
        date.month() === backDate.month() &&
        date.year() === backDate.year()
          ? transaction.value
          : 0;
    });
    return total;
  }

  while (backDate <= currentDate) {
    const dateData = categories.map(getFlowData);

    flowChart.push([backDate.toDate(), ...dateData]);
    backDate.add(1, "days");
  }
  const flowColumns = [
    "Date",
    ...categories.map((category: any) => category.name)
  ];

  const chartColors = categories.map((category: Category) => category.color);
  return (
    <Box className={classes.main} p={10}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={12}>
          <DateRangePicker
            onChange={(period: Range) => setSelectedPeriod(period)}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SummaryBox header="Spending flow">
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[flowColumns, ...flowChart]}
              options={{
                hAxis: {
                  title: "Time",
                  type: 'date',
                  format: 'Y-MM-dd'        
                },
                vAxis: {
                  title: "Money"
                }
              }}
            />
          </SummaryBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CategoriesTable
            categories={categories}
            onClick={() => setNewCategoryModalIsOpen(true)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SummaryBox header="Spending">
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[["Category", "Income per category"], ...spendingChartData]}
              options={{
                chartArea: { width: "100%", height: "80%" },
                legend: { position: "bottom" },
                colors: chartColors
              }}
            />
          </SummaryBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SummaryBox header="Income">
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[["Category", "Income per category"], ...incomeChartData]}
              options={{
                chartArea: { width: "100%", height: "80%" },
                legend: { position: "bottom" },
                colors: chartColors
              }}
            />
          </SummaryBox>
        </Grid>
      </Grid>
      <Modal
        title={"+ New Category"}
        isOpen={newCategoryModalIsOpen}
        handleClose={() => {
          setNewCategoryModalIsOpen(false);
        }}
      >
        <CategoryForm
          onComplete={() => setNewCategoryModalIsOpen(false)}
          onError={() => setNewCategoryModalIsOpen(false)}
        />
      </Modal>
    </Box>
  );
};

CategoriesPage.fragment = gql`
  query Categories {
    categories {
      id
      name
      color
      transactionsCount
      balance
      transactions {
        id
        value
        type
        date
      }
    }
  }
`;

export default CategoriesPage;
