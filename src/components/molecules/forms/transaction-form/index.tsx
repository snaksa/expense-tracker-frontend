import React from "react";
import { useWalletsQuery, useCategoriesQuery, Transaction } from "api";
import TransactionForm from "./form";

interface Props {
  transaction?: Transaction;
  onComplete: Function;
  onError: Function;
}

const TransactionFormWrapper = ({
  transaction,
  onComplete,
  onError,
}: Props) => {
  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  return (
    <TransactionForm
      transaction={transaction}
      wallets={wallets}
      categories={categories}
      onComplete={onComplete}
      onError={onError}
    />
  );
};

export default TransactionFormWrapper;
