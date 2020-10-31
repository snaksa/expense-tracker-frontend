import moment from "moment";
import { CategoriesSpendingFlowQuery, CategoriesSpendingPieQuery, TransactionSpendingFlowQuery } from "api";

const useChartsFormatter = () => {
  const formatTransactionSpendingFlow = (spendingFlowData?: TransactionSpendingFlowQuery) => {
    const flowColumns = spendingFlowData?.transactionSpendingFlow?.header ?? [];
    let flowChart: any = spendingFlowData?.transactionSpendingFlow?.data ?? [];

    flowChart = flowChart.map((row: any) => [
      moment.utc(row[0]).toDate(),
      parseFloat(row[1]),
    ]);

    return [flowColumns, ...flowChart];
  };

  const formatCategoriesSpendingPie = (data?: CategoriesSpendingPieQuery) => {
    return {
      header: data?.categoriesSpendingPieChart?.header ?? [],
      colors: data?.categoriesSpendingPieChart?.colors ?? [],
      data: (
        data?.categoriesSpendingPieChart?.data ?? []
      ).map((row: any) => [row[0], parseFloat(row[1])]),
    };
  };

  const formatCategoriesSpendingFlow = (data?: CategoriesSpendingFlowQuery) => {
    return {
      header: data?.categoriesSpendingFlow?.header ?? [],
      colors: data?.categoriesSpendingFlow?.colors ?? [],
      data: (data?.categoriesSpendingFlow?.data ?? []).map(
        (row: any) => {
          const result: any = [moment.utc(row[0]).toDate()];
          for (let i = 1; i < row.length; i++) {
            result.push(parseFloat(row[i]));
          }
          return result;
        }
      ),
    };
  };

  return { formatTransactionSpendingFlow, formatCategoriesSpendingPie, formatCategoriesSpendingFlow };
};

export default useChartsFormatter;
