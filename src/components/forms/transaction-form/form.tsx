import React, { useCallback, useMemo } from "react";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useTranslations from "translations";
import {
  TransactionType,
  Category,
  Wallet,
  useCreateTransactionMutation,
  Transaction,
  useUpdateTransactionMutation,
  WalletsDocument,
  Label
} from "api";
import { useNotificationContext } from "services/notification-provider";
import DatePicker from "components/forms/fields/datepicker";
import TimePicker from "components/forms/fields/timepicker";
import Button from "components/core/button";
import TextField from "components/forms/fields/text-field";
import Select from "components/forms/fields/select";
import RoundBox from "components/core/round-box";
import LabelSelect from "../fields/label-select";

interface Props {
  transaction?: Transaction;
  wallets: Wallet[];
  categories: Category[];
  labels: Label[];
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
  selectedLabels: any;
}

const TransactionForm = ({
  transaction,
  wallets,
  categories,
  labels,
  onComplete,
  onError,
}: Props): JSX.Element => {
  const walletOptions = useMemo(
    () =>
      wallets.map((wallet: Wallet) => {
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
      }),
    [wallets]
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category: Category, index: number) => {
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
      }),
    [categories]
  );

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();
  const { t } = useTranslations();

  const schema = useCallback(() => {
    return Yup.object().shape({
      date: Yup.string().required("Enter record date and time"),
      description: Yup.string().required("Enter record description"),
      value: Yup.string().required("Set record amount"),
      type: Yup.string().required("Choose record type"),
      walletId: Yup.number().required("Choose record wallet"),
    });
  }, []);

  const [createTransaction] = useCreateTransactionMutation({
    onCompleted() {
      onComplete();
      showSuccessNotification(t("Record created succesfully!"));
    },
    onError() {
      onError();
      showErrorNotification(
        t("An error occured while saving the record data!")
      );
    },
    refetchQueries: [
      {
        query: WalletsDocument,
      },
    ],
  });

  const [updateTransaction] = useUpdateTransactionMutation({
    onCompleted() {
      showSuccessNotification(t("Record updated succesfully!"));
      onComplete();
    },
    onError() {
      showErrorNotification(
        t("An error occured while updating the record data!")
      );
      onError();
    },
    refetchQueries: [
      {
        query: WalletsDocument,
      },
    ],
  });

  const onSubmit = useCallback(
    (values: FormFields) => {
      if (transaction) {
        updateTransaction({
          variables: {
            id: transaction.id,
            date: moment(values.date).utc().format("YYYY-MM-D HH:mm:ss"),
            description: values.description,
            value: parseFloat(values.value ?? 0),
            type: values.type,
            categoryId:
              values.type === TransactionType.Transfer
                ? null
                : values.categoryId,
            walletId: values.walletId,
            walletReceiverId: values.walletReceiverId ?? null,
            labelIds: values.selectedLabels?.map((label: any) => label.key) ?? [],
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
              values.type === TransactionType.Transfer
                ? null
                : values.categoryId,
            walletId: values.walletId,
            walletReceiverId: values.walletReceiverId ?? null,
            labelIds: values.selectedLabels?.map((label: any) => label.key) ?? [],
          },
        });
      }
    },
    [createTransaction, updateTransaction, transaction]
  );

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
        selectedLabels: transaction?.labels?.map((label: any) => ({ key: label.id, label: label.name, value: label.id })) ?? [],
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
                label={t("Wallet")}
                name="walletId"
                selected={values.walletId}
                options={walletOptions}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Select
                label={t("Type")}
                name="type"
                selected={values.type}
                options={[
                  {
                    id: TransactionType.Expense,
                    value: t("Expense"),
                  },
                  {
                    id: TransactionType.Income,
                    value: t("Income"),
                  },
                  {
                    id: TransactionType.Transfer,
                    value: t("Transfer"),
                  },
                ]}
                onChange={handleChange}
              />
            </Grid>
            {values.type === TransactionType.Transfer && (
              <Grid item>
                <Select
                  label={t("Transfer to")}
                  name="walletReceiverId"
                  selected={values.walletReceiverId}
                  options={walletOptions}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item>
              <TextField
                label={t("Description")}
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
                label={t("Amount")}
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
                  label={t("Category")}
                  name="categoryId"
                  selected={values.categoryId}
                  options={categoryOptions}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item>
              <LabelSelect placeholder={t('Labels')} selected={values.selectedLabels} options={labels} onChange={(e: any) => {
                setFieldValue('selectedLabels', e);
              }} />
            </Grid>
            <Grid>
              <Box mt={1}>
                <Button type="submit">
                  {transaction ? t("Edit") : t("Add")}
                </Button>
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
    $labelIds: [Int]
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
        labelIds: $labelIds
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
      labels {
        id
        name
        color
      }
    }
  }
`;

export default TransactionForm;
