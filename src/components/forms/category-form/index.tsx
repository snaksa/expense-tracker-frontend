import React from "react";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useCreateCategoryMutation,
  CategoriesDocument,
  CategoriesQuery,
  Category,
  useUpdateCategoryMutation,
  CategoriesSpendingPieDocument,
  TransactionType,
  TransactionSpendingFlowDocument,
  CategoriesSpendingFlowDocument,
  Wallet,
  useWalletsQuery,
} from "api";
import { useNotificationContext } from "services/notification-provider";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import useTranslations from "translations";
import Button from "components/core/button";
import TextField from "components/forms/fields/text-field";
import ColorPicker from "components/forms/fields/color-picker";

interface Props {
  category?: Category;
  onComplete: Function;
  onError: Function;
}

export interface FormFields {
  name: string;
  color: string;
}

const CategoryForm = ({
  category,
  onComplete,
  onError,
}: Props): JSX.Element => {
  const { t } = useTranslations();

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const { setCategoryUpdate } = useUpdateDetectionContext();

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const schema = () => {
    return Yup.object().shape({
      name: Yup.string().required(t("Enter category name")),
      color: Yup.string().required(t("Enter category color")),
    });
  };

  const [createCategory] = useCreateCategoryMutation({
    onCompleted() {
      showSuccessNotification(t("Category created succesfully!"));
      setCategoryUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification(
        t("An error occured while saving the category data!")
      );
      onError();
    },
    update: (store, { data }) => {
      const category = data?.createCategory;
      if (!category) {
        return;
      }

      const query = {
        query: CategoriesDocument,
      };

      const cached = store.readQuery<CategoriesQuery>(query);
      if (!cached || !cached.categories) {
        return;
      }

      cached.categories.push(category);
      store.writeQuery({
        ...query,
        data: cached,
      });
    },
  });

  const [updateCategory] = useUpdateCategoryMutation({
    onCompleted() {
      showSuccessNotification(t("Category updated succesfully!"));
      setCategoryUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification(
        t("An error occured while updating the category data!")
      );
      onError();
    },
    refetchQueries: [
      {
        query: CategoriesSpendingPieDocument,
        variables: {
          date: null,
          walletIds: wallets.map((wallet: Wallet) => wallet.id),
          categoryIds: [],
          type: TransactionType.Expense,
        },
      },
      {
        query: CategoriesSpendingPieDocument,
        variables: {
          date: null,
          walletIds: wallets.map((wallet: Wallet) => wallet.id),
          categoryIds: [],
          type: TransactionType.Income,
        },
      },
      {
        query: TransactionSpendingFlowDocument,
        variables: {
          date: null,
          walletIds: wallets.map((wallet: Wallet) => wallet.id),
          categoryIds: [],
        },
      },
      {
        query: CategoriesSpendingFlowDocument,
        variables: {
          date: null,
          walletIds: wallets.map((wallet: Wallet) => wallet.id),
          categoryIds: [],
        },
      },
    ],
  });

  const onSubmit = (values: FormFields) => {
    if (category) {
      updateCategory({
        variables: {
          id: category.id,
          name: values.name,
          color: values.color,
        },
      });
    } else {
      createCategory({
        variables: {
          name: values.name,
          color: values.color,
        },
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: category?.name ?? "",
        color: category?.color ?? "#DE60D4",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <Grid container direction="column">
            <Grid item>
              <TextField
                label={t("Name")}
                name="name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                error={!!(errors.name && touched.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item>
              <ColorPicker
                name="color"
                selected={values.color}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <Box mt={1}>
                <Button type="submit">{category ? t("Edit") : t("Add")}</Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

CategoryForm.fragment = gql`
  mutation CreateCategory($name: String!, $color: String!) {
    createCategory(input: { name: $name, color: $color }) {
      id
      color
      name
      icon
      transactionsCount
      balance
      transactions {
        id
        value
        type
        date
      }
    }
  }
`;

export default CategoryForm;
