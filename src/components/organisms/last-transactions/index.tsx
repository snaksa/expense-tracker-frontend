import React, { useState } from "react";
import { gql } from "apollo-boost";
import {
  useTransactionsQuery,
  Transaction,
  useWalletsQuery,
  Category,
  Wallet,
} from "api";
import useTranslations from "translations";
import SummaryBox from "components/molecules/summary-box";
import TransactionSummary from "components/molecules/transaction-summary";
import Modal from "components/molecules/modal";
import TransactionForm from "components/molecules/forms/transaction-form/form";
import Loader from "components/atoms/loader";
import useStyles from "./styles";

let backupData: any[] = [];

const LastTransactions = ({
  categories,
  onChange,
}: {
  categories: Category[];
  onChange: Function;
}) => {
  const classes = useStyles();
  const { t } = useTranslations();

  const [newTransactionModalIsOpen, setNewTransactionModalIsOpen] = useState(
    false
  );

  const { data: walletsData } = useWalletsQuery();
  const userWallets: any = walletsData?.wallets ?? [];

  const { data, refetch, loading } = useTransactionsQuery({
    variables: {
      date: null,
      walletIds: userWallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
      page: 1,
      limit: 5,
      unlimited: false,
    },
    fetchPolicy: "cache-and-network",
  });

  const transactionsData: any = data?.transactions?.data ?? null;
  if (transactionsData) {
    backupData = transactionsData;
  }

  const transactions = transactionsData ?? backupData;

  return (
    <SummaryBox
      header={t("Last 5 records")}
      onClick={() => setNewTransactionModalIsOpen(true)}
    >
      <Loader loading={loading && !transactions.length} />
      {!transactions.length && !loading && (
        <div className={classes.noData}>No data</div>
      )}
      {transactions.map((transaction: Transaction, index: number) => (
        <TransactionSummary key={index} transaction={transaction} />
      ))}
      <Modal
        title={t("+ New Record")}
        isOpen={newTransactionModalIsOpen}
        handleClose={() => {
          setNewTransactionModalIsOpen(false);
        }}
      >
        <TransactionForm
          wallets={userWallets}
          categories={categories}
          onComplete={() => {
            refetch();
            onChange();
            setNewTransactionModalIsOpen(false);
          }}
          onError={() => setNewTransactionModalIsOpen(false)}
        />
      </Modal>
    </SummaryBox>
  );
};

LastTransactions.fragment = gql`
  query Transactions(
    $walletIds: [Int]
    $categoryIds: [Int]
    $page: Int
    $limit: Int
    $unlimited: Boolean
    $date: String
  ) {
    transactions(
      input: {
        walletIds: $walletIds
        categoryIds: $categoryIds
        page: $page
        limit: $limit
        unlimited: $unlimited
        date: $date
      }
    ) {
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
        walletReceiver {
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
