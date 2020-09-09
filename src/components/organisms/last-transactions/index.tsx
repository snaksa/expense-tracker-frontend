import React, { useState, useCallback } from "react";
import { gql } from "apollo-boost";
import {
  useTransactionsQuery,
  Transaction,
  useWalletsQuery,
  Category,
  Wallet,
} from "api";
import useTranslations from "translations";
import SummaryBox from "components/core/summary-box";
import TransactionSummary from "components/organisms/transaction-summary";
import Modal from "components/core/modal";
import TransactionForm from "components/forms/transaction-form/form";
import Loader from "components/core/loader";
import useStyles from "./styles";
import DateUtils from "utils/dateUtils";

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
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
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

  const showNewModal = useCallback(
    () => setNewTransactionModalIsOpen(true),
    []
  );
  const hideNewModal = useCallback(
    () => setNewTransactionModalIsOpen(false),
    []
  );

  const onComplete = useCallback(() => {
    refetch();
    onChange();
    hideNewModal();
  }, [onChange, hideNewModal, refetch]);

  return (
    <SummaryBox header={t("Last 5 records")} onClick={showNewModal}>
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
        handleClose={hideNewModal}
      >
        <TransactionForm
          wallets={userWallets}
          categories={categories}
          onComplete={onComplete}
          onError={hideNewModal}
        />
      </Modal>
    </SummaryBox>
  );
};

LastTransactions.fragment = gql`
  query Transactions(
    $walletIds: [Int]!
    $categoryIds: [Int]
    $page: Int
    $limit: Int
    $unlimited: Boolean
    $startDate: String
    $endDate: String
    $timezone: String
  ) {
    transactions(
      input: {
        walletIds: $walletIds
        categoryIds: $categoryIds
        page: $page
        limit: $limit
        unlimited: $unlimited
        startDate: $startDate
        endDate: $endDate
        timezone: $timezone
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
