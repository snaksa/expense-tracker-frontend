import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import useStyles from "./styles";
import {
  useCategoriesQuery,
  TransactionType,
  useCategoriesSpendingPieQuery,
  Wallet,
  useWalletsQuery,
  useCategoriesSpendingFlowQuery
} from "api";
import CategoriesTable from "components/organisms/categories-table";
import Modal from "components/molecules/modal";
import CategoryForm from "components/organisms/category-form";
import SummaryBox from "components/molecules/summary-box";
import DateRangePicker, {
  calculateBackDate,
  Range
} from "components/molecules/date-range-picker";
import PieChart from "components/organisms/pie-chart";
import LineChart from "components/organisms/line-chart";
import moment from "moment";
import { useUpdateDetectionContext } from "services/update-detection-provider";

const CategoriesPage = () => {
  const classes = useStyles();

  const {
    lastTransactionAction,
    lastCategoryAction,
    lastWalletAction
  } = useUpdateDetectionContext();

  const [backDate, setBackDate] = useState(calculateBackDate(Range.Last7Days));
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);

  const { data } = useCategoriesQuery({
    fetchPolicy: "network-only"
  });
  const categories: any = data?.categories ?? [];

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const {
    data: spendingFlowQueryData,
    loading: spendingFlowLoading,
    refetch: refetchReport
  } = useCategoriesSpendingFlowQuery({
    variables: {
      date: backDate,
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: []
    },
    fetchPolicy: "network-only"
  });

  const spendingFlowData: any = {
    header: spendingFlowQueryData?.categoriesSpendingFlow?.header ?? [],
    colors: spendingFlowQueryData?.categoriesSpendingFlow?.colors ?? [],
    data: (spendingFlowQueryData?.categoriesSpendingFlow?.data ?? []).map(
      (row: any) => {
        const result: any = [moment.utc(row[0]).toDate()];
        for (let i = 1; i < row.length; i++) {
          result.push(parseFloat(row[i]));
        }
        return result;
      }
    )
  };

  const {
    data: spendingQueryData,
    loading: spendingPieLoading,
    refetch: refetchSpendingPie
  } = useCategoriesSpendingPieQuery({
    variables: {
      date: backDate,
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
      type: TransactionType.Expense
    },
    fetchPolicy: "cache-and-network"
  });

  const spendingData: any = {
    header: spendingQueryData?.categoriesSpendingPieChart?.header ?? [],
    colors: spendingQueryData?.categoriesSpendingPieChart?.colors ?? [],
    data: (
      spendingQueryData?.categoriesSpendingPieChart?.data ?? []
    ).map((row: any) => [row[0], parseFloat(row[1])])
  };

  const {
    data: incomeQueryData,
    loading: incomePieLoading,
    refetch: refetchIncomePie
  } = useCategoriesSpendingPieQuery({
    variables: {
      date: backDate,
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
      type: TransactionType.Income
    },
    fetchPolicy: "cache-and-network"
  });

  const incomeData: any = {
    header: incomeQueryData?.categoriesSpendingPieChart?.header ?? [],
    colors: incomeQueryData?.categoriesSpendingPieChart?.colors ?? [],
    data: (
      incomeQueryData?.categoriesSpendingPieChart?.data ?? []
    ).map((row: any) => [row[0], parseFloat(row[1])])
  };

  useEffect(() => {
    refetchReport();
    refetchSpendingPie();
    refetchIncomePie();
  }, [
    wallets,
    backDate,
    refetchReport,
    refetchSpendingPie,
    refetchIncomePie,
    lastTransactionAction,
    lastCategoryAction,
    lastWalletAction
  ]);

  return (
    <Box className={classes.main} p={10}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={12}>
          <DateRangePicker
            onChange={(date: any) => {
              setBackDate(date);
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SummaryBox header="Spending flow">
            <LineChart
              hTitle="Time"
              vTitle="Money"
              data={spendingFlowData}
              loading={spendingFlowLoading}
            />
          </SummaryBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CategoriesTable
            categories={categories}
            onClick={() => setNewCategoryModalIsOpen(true)}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SummaryBox header="Spending">
            <PieChart data={spendingData} loading={spendingPieLoading} />
          </SummaryBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SummaryBox header="Income">
            <PieChart data={incomeData} loading={incomePieLoading} />
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
  query CategoriesSpendingFlow(
    $date: String
    $walletIds: [Int]
    $categoryIds: [Int]
  ) {
    categoriesSpendingFlow(
      input: { date: $date, walletIds: $walletIds, categoryIds: $categoryIds }
    ) {
      header
      data
      colors
    }
  }
  query CategoriesSpendingPie(
    $date: String
    $walletIds: [Int]
    $categoryIds: [Int]
    $type: TransactionType
  ) {
    categoriesSpendingPieChart(
      input: {
        date: $date
        walletIds: $walletIds
        categoryIds: $categoryIds
        type: $type
      }
    ) {
      header
      data
      colors
    }
  }
`;

export default CategoriesPage;
