import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import { Chart } from "react-google-charts";
import useStyles from "./styles";
import { useCategoriesQuery, Category, TransactionType } from "api";
import CategoriesTable from "components/organisms/categories-table";
import Modal from "components/molecules/modal";
import CategoryForm from "components/organisms/category-form";
import SummaryBox from "components/molecules/summary-box";

const CategoriesPage = () => {
  const classes = useStyles();

  const { data } = useCategoriesQuery({ fetchPolicy: "network-only" });
  const categories: any = data?.categories ?? [];

  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);

  const spendingChartData = categories.map((category: Category) => {
    let total = 0;
    const transactions = category.transactions ?? [];
    transactions?.forEach((transaction: any) => {
      total +=
        transaction.type === TransactionType.Expense ? transaction.value : 0;
    });
    return [category.name, total];
  });

  const incomeChartData = categories.map((category: Category) => {
    let total = 0;
    const transactions = category.transactions ?? [];
    transactions?.forEach((transaction: any) => {
      total +=
        transaction.type === TransactionType.Income ? transaction.value : 0;
    });
    return [category.name, total];
  });

  const currentDate: Date = (new Date());
  let backDate: Date = new Date();
  backDate.setDate(currentDate.getDate() - 5);
  const flowChart = [];

  while(backDate <= currentDate) {
    const dateData = categories.map((category: Category) => {
      let total = 0;
      const transactions = category.transactions ?? [];

      transactions.forEach((transaction: any) => {
        const date = new Date(transaction.date);
        total += transaction.type === TransactionType.Expense 
        && date.getDate() === backDate.getDate() 
        && date.getMonth() === backDate.getMonth()
        && date.getFullYear() === backDate.getFullYear() ? transaction.value : 0;
      });

      return total;
    });

    flowChart.push([backDate.toLocaleDateString(), ...dateData]);
    backDate.setDate(backDate.getDate() + 1);
  }
  const flowColumns = ['Date', ...(categories.map((category: any) => category.name))];

  const chartColors = categories.map((category: Category) => category.color);

  return (
    <Box className={classes.main} p={10}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={4}>
          <CategoriesTable
            categories={categories}
            onClick={() => setNewCategoryModalIsOpen(true)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
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
        <Grid item xs={12} md={6} lg={2}>
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
        <Grid item xs={12} md={6} lg={4}>
          <SummaryBox header="Spending flow">
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                flowColumns, ...flowChart
              ]}
              options={{
                hAxis: {
                  title: "Time"
                },
                vAxis: {
                  title: "Money"
                },
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
