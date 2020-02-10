import React from "react";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "components/atoms/button";
import TextField from "components/atoms/text-field";
import Select from "components/atoms/select";
import RoundBox from "components/atoms/round-box";
import { useNotificationContext } from "services/notification-provider";
import {
  TransactionType,
  Category,
  Wallet,
  useCreateTransactionMutation,
  Transaction,
  useCategoriesQuery,
  useUpdateTransactionMutation
} from "api";

interface Props {
  transaction?: Transaction;
  wallets: Wallet[];
  onComplete: Function;
  onError: Function;
}

export interface FormFields {
  description: string;
  value: string;
  type: TransactionType;
  categoryId: number;
  walletId: number;
}

const schema = () => {
  return Yup.object().shape({
    description: Yup.string().required("Enter record description"),
    value: Yup.string().required("Set record amount"),
    type: Yup.string().required("Choose record type"),
    categoryId: Yup.number().required("Choose record category"),
    walletId: Yup.number().required("Choose record wallet")
  });
};

const TransactionForm = ({
  transaction,
  wallets,
  onComplete,
  onError
}: Props): JSX.Element => {
  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  const walletOptions = wallets.map((wallet: Wallet) => {
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

  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const [createTransaction] = useCreateTransactionMutation({
    onCompleted() {
      showSuccessNotification("Record created succesfully!");
      onComplete();
    },
    onError() {
      showErrorNotification("An error occured while saving the record data!");
      onError();
    }
  });

  const [updateTransaction] = useUpdateTransactionMutation({
    onCompleted() {
      showSuccessNotification("Record updated succesfully!");
      onComplete();
    },
    onError() {
      showErrorNotification("An error occured while updating the record data!");
      onError();
    }
  });

  const onSubmit = (values: FormFields) => {
    if (transaction) {
      updateTransaction({
        variables: {
          id: transaction.id,
          description: values.description,
          value: parseFloat(values.value ?? 0),
          type: values.type,
          categoryId: values.categoryId,
          walletId: values.walletId
        }
      });
    } else {
      createTransaction({
        variables: {
          description: values.description,
          value: parseFloat(values.value ?? 0),
          type: values.type,
          categoryId: values.categoryId,
          walletId: values.walletId
        }
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        description: transaction?.description ?? "",
        value: transaction?.value.toString() ?? "",
        type: transaction?.type ?? TransactionType.Expense,
        categoryId: transaction?.category
          ? transaction.category.id
          : categoryOptions.length
          ? categoryOptions[0].id
          : 0,
        walletId: transaction?.wallet
          ? transaction.wallet.id
          : walletOptions.length
          ? walletOptions[0].id
          : 0
      }}
      validationSchema={schema}
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
                <Button type="submit">Add</Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

TransactionForm.fragment = gql`
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
        amount
      }
      category {
        id
        name
        color,
        balance,
        transactionsCount
      }
    }
  }
`;

export default TransactionForm;
