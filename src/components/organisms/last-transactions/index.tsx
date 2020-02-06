import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import {
  useTransactionsLazyQuery,
  Transaction,
  useCreateTransactionMutation,
  TransactionType,
  useCategoriesQuery,
  Category,
  useWalletsQuery,
  Wallet,
  TransactionsDocument
} from "../../../api";
import SummaryBox from "components/molecules/summary-box";
import TransactionSummary from "components/molecules/transaction-summary";
import { useNotificationContext } from "../../../services/notification-provider";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../molecules/modal";
import Button from "../../atoms/button";
import TextField from "../../atoms/text-field";
import Select from "../../atoms/select";
import { Grid, Box } from "@material-ui/core";
import RoundBox from "components/atoms/round-box";

export interface FormFields {
  description: string;
  value: string;
  type: TransactionType;
  categoryId: number;
  walletId: number;
}

const LastTransactions = ({ wallets }: { wallets: number[] }) => {
  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];
  const categoryOptions = categories.map((category: Category) => {
    return {
      id: category.id,
      value: (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <RoundBox color={category.color} width={20} height={20} />
          </Grid>
          <Grid item>{category.name}</Grid>
        </Grid>
      )
    };
  });

  const { data: walletsData } = useWalletsQuery();
  const fetchedWallets: any = walletsData?.wallets ?? [];
  const walletOptions = fetchedWallets.map((wallet: Wallet) => {
    return {
      id: wallet.id,
      value: (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <RoundBox color={wallet.color} width={20} height={20} />
          </Grid>
          <Grid item>{wallet.name}</Grid>
        </Grid>
      )
    };
  });

  const [getTransactions, { data }] = useTransactionsLazyQuery();

  const [newTransactionModalIsOpen, setNewTransactionModalIsOpen] = useState(
    false
  );

  useEffect(() => {
    getTransactions({
      variables: {
        walletIds: wallets,
        page: 1,
        limit: 5
      }
    });
  }, [getTransactions, wallets]);

  const transactions: any = data?.transactions?.data ?? [];

  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const [createTransaction] = useCreateTransactionMutation({
    onCompleted() {
      setNewTransactionModalIsOpen(false);
      showSuccessNotification("Record created succesfully!");
    },
    onError() {
      showErrorNotification("An error occured while saving the record data!");
    }
  });

  const onSubmit = (values: FormFields) => {
    createTransaction({
      variables: {
        description: values.description,
        value: parseFloat(values.value ?? 0),
        type: values.type,
        categoryId: values.categoryId,
        walletId: values.walletId
      },
      refetchQueries: [
        {
          query: TransactionsDocument,
          variables: {
            walletIds: wallets,
            page: 1,
            limit: 5,
          }
        }
      ]
    });
  };

  const CreateTransactionSchema = () =>
    Yup.object().shape({
      description: Yup.string().required("Enter record description"),
      value: Yup.string().required("Set record amount"),
      type: Yup.string().required("Choose record type"),
      categoryId: Yup.number().required("Choose record category"),
      walletId: Yup.number().required("Choose record wallet")
    });

  return (
    <SummaryBox
      header={"Last 5 records"}
      onClick={() => setNewTransactionModalIsOpen(true)}
    >
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
        <Formik
          enableReinitialize
          initialValues={{
            description: "",
            value: '',
            type: TransactionType.Expense,
            categoryId: categoryOptions.length ? categoryOptions[0].id : 0,
            walletId: walletOptions.length ? walletOptions[0].id : 0
          }}
          validationSchema={CreateTransactionSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Grid container direction="column">
                <Grid item>
                  <Select
                    label="Wallet"
                    name="walletId"
                    selected={values.walletId}
                    options={walletOptions}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Select
                    label="Type"
                    name="type"
                    selected={values.type}
                    options={[
                      {
                        id: TransactionType.Expense,
                        value: "Expense"
                      },
                      {
                        id: TransactionType.Income,
                        value: "Income"
                      }
                    ]}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    value={values.description}
                    onChange={handleChange}
                    error={!!(errors.description && touched.description)}
                    helperText={errors.description}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Amount"
                    name="value"
                    type="number"
                    variant="outlined"
                    value={values.value}
                    onChange={handleChange}
                    error={!!(errors.value && touched.value)}
                    helperText={errors.value}
                  />
                </Grid>
                <Grid item>
                  <Select
                    label="Category"
                    name="categoryId"
                    selected={values.categoryId}
                    options={categoryOptions}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid>
                  <Box mt={1}>
                    <Button type="submit" style={{}}>
                      Add
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
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
  mutation CreateTransaction(
    $description: String!
    $value: Float!
    $type: TransactionType!
    $categoryId: Int!
    $walletId: Int!
  ) {
    createTransaction(
      input: {
        description: $description
        value: $value
        type: $type
        categoryId: $categoryId
        walletId: $walletId
      }
    ) {
      id
      description
      value
      type
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
  }
  query Categories {
    categories {
      id
      name
      color
    }
  }
`;

export default LastTransactions;
