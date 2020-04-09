import React from "react";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "components/atoms/button";
import TextField from "components/atoms/form/text-field";
import Select from "components/atoms/form/select";
import RoundBox from "components/atoms/round-box";
import { useNotificationContext } from "services/notification-provider";
import {
  TransactionType,
  Category,
  Wallet,
  useCreateTransactionMutation,
  Transaction,
  useUpdateTransactionMutation,
  TransactionsDocument,
} from "api";
import { useSharedDataContext } from "services/shared-data-provider";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import DatePicker from "components/atoms/form/datepicker";
import TimePicker from "components/atoms/form/timepicker";
import moment from "moment";

interface Props {
  transaction?: Transaction;
  wallets: Wallet[];
  categories: Category[];
  onComplete: Function;
  onError: Function;
}

export interface FormFields {
  date: string;
  description: string;
  value: string;
  type: TransactionType;
  categoryId: any;
  walletId: number;
  walletReceiverId: any;
}

const schema = () => {
  return Yup.object().shape({
    date: Yup.string().required("Enter record date and time"),
    description: Yup.string().required("Enter record description"),
    value: Yup.string().required("Set record amount"),
    type: Yup.string().required("Choose record type"),
    walletId: Yup.number().required("Choose record wallet"),
  });
};

const TransactionForm = ({
  transaction,
  wallets,
  categories,
  onComplete,
  onError,
}: Props): JSX.Element => {
  const { setTransactionUpdate } = useUpdateDetectionContext();

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
      ),
    };
  });

  const categoryOptions = categories.map(
    (category: Category, index: number) => {
      return {
        id: category.id,
        value: (
          <Grid container alignItems="center" spacing={1} key={index}>
            <Grid item>
              <RoundBox color={category.color} width={20} height={20} />
            </Grid>
            <Grid item>{category.name}</Grid>
          </Grid>
        ),
      };
    }
  );

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const { usedTranasctionParams } = useSharedDataContext();

  const getRefetchQueries = () => {
    const result: any = [];
    for (let params of usedTranasctionParams) {
      result.push({
        query: TransactionsDocument,
        variables: params,
      });
    }

    return result;
  };

  const [createTransaction] = useCreateTransactionMutation({
    onCompleted() {
      onComplete();
      showSuccessNotification("Record created succesfully!");
      setTransactionUpdate();
    },
    onError() {
      onError();
      showErrorNotification("An error occured while saving the record data!");
    },
    refetchQueries: getRefetchQueries(),
  });

  const [updateTransaction] = useUpdateTransactionMutation({
    onCompleted() {
      showSuccessNotification("Record updated succesfully!");
      setTransactionUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification("An error occured while updating the record data!");
      onError();
    },
    refetchQueries: getRefetchQueries(),
  });

  const onSubmit = (values: FormFields) => {
    if (transaction) {
      updateTransaction({
        variables: {
          id: transaction.id,
          date: moment(values.date).utc().format("YYYY-MM-D HH:mm:ss"),
          description: values.description,
          value: parseFloat(values.value ?? 0),
          type: values.type,
          categoryId:
            values.type === TransactionType.Transfer ? null : values.categoryId,
          walletId: values.walletId,
          walletReceiverId: values.walletReceiverId ?? null,
        },
      });
    } else {
      createTransaction({
        variables: {
          date: moment(values.date).utc().format("YYYY-MM-D HH:mm:ss"),
          description: values.description,
          value: parseFloat(values.value ?? 0),
          type: values.type,
          categoryId:
            values.type === TransactionType.Transfer ? null : values.categoryId,
          walletId: values.walletId,
          walletReceiverId: values.walletReceiverId ?? null,
        },
      });
    }
  };

  return (
    <Formik
      initialValues={{
        date: transaction?.date
          ? moment.utc(transaction.date).local().format("YYYY-MM-D HH:mm:ss")
          : moment().format("YYYY-MM-D HH:mm:ss"),
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
          : 0,
        walletReceiverId: null,
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, handleChange, setFieldValue }) => (
        <Form>
          <Grid container direction="column">
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <DatePicker
                    name="date"
                    date={values.date}
                    onChange={(date: string) => setFieldValue("date", date)}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TimePicker
                    name="date"
                    date={values.date}
                    onChange={(date: string) => setFieldValue("date", date)}
                  />
                </Grid>
              </Grid>
            </Grid>
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
                    value: "Expense",
                  },
                  {
                    id: TransactionType.Income,
                    value: "Income",
                  },
                  {
                    id: TransactionType.Transfer,
                    value: "Transfer",
                  },
                ]}
                onChange={handleChange}
              />
            </Grid>
            {values.type === TransactionType.Transfer && (
              <Grid item>
                <Select
                  label="Transfer to"
                  name="walletReceiverId"
                  selected={values.walletReceiverId}
                  options={walletOptions}
                  onChange={handleChange}
                />
              </Grid>
            )}
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
            {values.type !== TransactionType.Transfer && (
              <Grid item>
                <Select
                  label="Category"
                  name="categoryId"
                  selected={values.categoryId}
                  options={categoryOptions}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid>
              <Box mt={1}>
                <Button type="submit">{transaction ? "Edit" : "Add"}</Button>
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
    $date: String!
    $description: String!
    $value: Float!
    $type: TransactionType!
    $categoryId: Int
    $walletId: Int!
    $walletReceiverId: Int
  ) {
    createTransaction(
      input: {
        date: $date
        description: $description
        value: $value
        type: $type
        categoryId: $categoryId
        walletId: $walletId
        walletReceiverId: $walletReceiverId
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
      walletReceiver {
        id
        name
        color
        amount
      }
      category {
        id
        name
        color
        balance
        transactionsCount
        transactions {
          id
          value
          type
          date
        }
      }
    }
  }
`;

export default TransactionForm;
