import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import SummaryBox from "components/molecules/summary-box";
import TransactionSummary from "components/molecules/transaction-summary";
import Modal from "components/molecules/modal";
import TransactionForm from "components/organisms/transaction-form";
import {
  useTransactionsLazyQuery,
  Transaction,
  useWalletsQuery
} from "api";
import Loader from "components/atoms/loader";

let backupData: any[] = [];

const LastTransactions = ({ wallets }: { wallets: number[] }) => {
  const [newTransactionModalIsOpen, setNewTransactionModalIsOpen] = useState(
    false
  );

  const { data: walletsData } = useWalletsQuery();
  const userWallets: any = walletsData?.wallets ?? [];

  const [getTransactions, { data, refetch, loading }] = useTransactionsLazyQuery({fetchPolicy: 'network-only'});

  useEffect(() => {
    getTransactions({
      variables: {
        date: null,
        walletIds: wallets,
        page: 1,
        limit: 5,
        unlimited: false
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
          wallets={userWallets}
          onComplete={() => {
            refetch({
              date: null,
              walletIds: wallets,
              page: 1,
              limit: 5,
              unlimited: false
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
  query Transactions($walletIds: [Int], $page: Int, $limit: Int, $unlimited: Boolean, $date: String) {
    transactions(input: { walletIds: $walletIds, page: $page, limit: $limit, unlimited: $unlimited, date: $date}) {
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
