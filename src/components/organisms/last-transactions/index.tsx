import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import SummaryBox from "components/molecules/summary-box";
import TransactionSummary from "components/molecules/transaction-summary";
import Modal from "components/molecules/modal";
import TransactionForm from "components/organisms/transaction-form";
import {
  useTransactionsLazyQuery,
  Transaction,
  useCategoriesQuery,
  useWalletsQuery
} from "api";
import Loader from "components/atoms/loader";

let backupData: any[] = [];

const LastTransactions = ({ wallets }: { wallets: number[] }) => {
  const [newTransactionModalIsOpen, setNewTransactionModalIsOpen] = useState(
    false
  );

  const { data: categoriesData } = useCategoriesQuery();
  const userCategories: any = categoriesData?.categories ?? [];

  const { data: walletsData } = useWalletsQuery();
  const userWallets: any = walletsData?.wallets ?? [];

  const [getTransactions, { data, refetch, loading }] = useTransactionsLazyQuery();

  useEffect(() => {
    getTransactions({
      variables: {
        walletIds: wallets,
        page: 1,
        limit: 5
      }
    });
  }, [getTransactions, wallets]);

  const transactionsData: any = data?.transactions?.data ?? null;
  if (transactionsData) {
    backupData = transactionsData;
  }

  const transactions = transactionsData ?? backupData;

  return (
    <SummaryBox
      header={"Last 5 records"}
      onClick={() => setNewTransactionModalIsOpen(true)}
    >
      <Loader loading={loading}/>

      {transactions.map((transaction: Transaction) => (
        <TransactionSummary transaction={transaction} />
      ))}
      <Modal
        title={"+ New Record"}
        isOpen={newTransactionModalIsOpen}
        handleClose={() => {
          setNewTransactionModalIsOpen(false);
        }}
      >
        <TransactionForm
          categories={userCategories}
          wallets={userWallets}
          onComplete={() => {
            refetch({
              walletIds: wallets,
              page: 1,
              limit: 5
            });
            setNewTransactionModalIsOpen(false);
          }}
          onError={() => setNewTransactionModalIsOpen(false)}
        />
      </Modal>
    </SummaryBox>
  );
};

LastTransactions.fragment = gql`
  query Transactions($walletIds: [Int], $page: Int, $limit: Int) {
    transactions(input: { walletIds: $walletIds, page: $page, limit: $limit }) {
      data {
        id
        description
        type
        value
        date
        wallet {
          id
          name
          color
        }
        category {
          id
          name
          color
        }
      }
      currentPage
      totalPages
      totalResults
      hasNextPage
      hasPrevPage
    }
  }
`;

export default LastTransactions;
