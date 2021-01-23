import React, { useCallback, useState } from "react";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useTranslations from "translations";
import {
  Category,
  useUpdateBudgetMutation,
  useCreateBudgetMutation,
  useDeleteBudgetMutation,
  BudgetsDocument,
  Label,
  Budget,
  BudgetsQuery
} from "api";
import { useNotificationContext } from "services/notification-provider";
import DatePicker from "components/forms/fields/datepicker";
import TimePicker from "components/forms/fields/timepicker";
import Button from "components/core/button";
import TextField from "components/forms/fields/text-field";
import LabelSelect from "../fields/label-select";
import ConfirmationDialog from "components/core/confirmation-dialog";

interface Props {
  budget?: Budget;
  categories: Category[];
  labels: Label[];
  onComplete: Function;
  onError: Function;
}

export interface FormFields {
  startDate: string;
  endDate: string;
  name: string;
  value: string;
  selectedCategories: any;
  selectedLabels: any;
}

const BudgetForm = ({
  budget,
  categories,
  labels,
  onComplete,
  onError,
}: Props): JSX.Element => {

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();
  const { t } = useTranslations();

  const schema = useCallback(() => {
    return Yup.object().shape({
      startDate: Yup.string().required("Enter record start date and time"),
      endDate: Yup.string().required("Enter record end date and time"),
      name: Yup.string().required("Enter record name"),
      value: Yup.string().required("Set record amount"),
    });
  }, []);

  const [createBudget] = useCreateBudgetMutation({
    onCompleted() {
      onComplete();
      showSuccessNotification(t("Record created succesfully!"));
    },
    onError() {
      onError();
      showErrorNotification(
        t("An error occured while saving the record data!")
      );
    }
  });

  const [updateBudget] = useUpdateBudgetMutation({
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
  });

  const onSubmit = useCallback(
    (values: FormFields) => {
      if (budget) {
        updateBudget({
          variables: {
            id: budget.id,
            startDate: moment(values.startDate).utc().format("YYYY-MM-D HH:mm:ss"),
            endDate: moment(values.endDate).utc().format("YYYY-MM-D HH:mm:ss"),
            name: values.name,
            value: parseFloat(values.value ?? 0),
            categoryIds: values.selectedCategories?.map((category: any) => category.key) ?? [],
            labelIds: values.selectedLabels?.map((label: any) => label.key) ?? [],
          },
        });
      } else {
        createBudget({
          variables: {
            startDate: moment(values.startDate).utc().format("YYYY-MM-D HH:mm:ss"),
            endDate: moment(values.endDate).utc().format("YYYY-MM-D HH:mm:ss"),
            name: values.name,
            value: parseFloat(values.value ?? 0),
            categoryIds: values.selectedCategories?.map((category: any) => category.key) ?? [],
            labelIds: values.selectedLabels?.map((label: any) => label.key) ?? [],
          },
        });
      }
    },
    [createBudget, updateBudget, budget]
  );

  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);
  const openDeleteModal = useCallback(
    () => setConfirmDeleteModalIsOpen(true),
    []
  );
  const closeDeleteModal = useCallback(
    () => setConfirmDeleteModalIsOpen(false),
    []
  );
  const [deleteBudget] = useDeleteBudgetMutation({
    onCompleted() {
      showSuccessNotification(t("Budget deleted successfully!"));
    },
    onError() {
      showErrorNotification(t("An error occured while deleting the budget!"));
    },
    update: (store, { data }) => {
      const budget = data?.deleteBudget;

      if (!budget) {
        return;
      }

      const query = {
        query: BudgetsDocument,
      };

      const cached = store.readQuery<BudgetsQuery>(query);
      if (!cached || !cached.budgets) {
        return;
      }

      const result = cached.budgets.filter((b) => b && b.id !== budget.id);
      store.writeQuery({
        ...query,
        data: {
          budgets: result,
        },
      });
    },
  });


  const handleBudgetDelete = useCallback(() => {
    setConfirmDeleteModalIsOpen(false);
    deleteBudget({
      variables: {
        id: budget?.id ?? 0,
      },
    });
  }, [deleteBudget, budget?.id]);

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          startDate: budget?.startDate
            ? moment.utc(budget.startDate).local().format("YYYY-MM-D HH:mm:ss")
            : moment().format("YYYY-MM-D HH:mm:ss"),
          endDate: budget?.endDate
            ? moment.utc(budget.endDate).local().format("YYYY-MM-D HH:mm:ss")
            : moment().format("YYYY-MM-D HH:mm:ss"),
          name: budget?.name ?? "",
          value: budget?.value.toString() ?? "",
          selectedCategories: budget?.categories?.map((category: any) => ({ key: category.id, label: category.name, value: category.id })) ?? [],
          selectedLabels: budget?.labels?.map((label: any) => ({ key: label.id, label: label.name, value: label.id })) ?? [],
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
                      name="startDate"
                      label="Start Date"
                      date={values.startDate}
                      onChange={(date: string) => setFieldValue("startDate", date)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TimePicker
                      name="startDate"
                      date={values.startDate}
                      onChange={(date: string) => setFieldValue("startDate", date)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}>
                    <DatePicker
                      name="endDate"
                      label="End Date"
                      date={values.endDate}
                      onChange={(date: string) => setFieldValue("endDate", date)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TimePicker
                      name="endDate"
                      date={values.endDate}
                      onChange={(date: string) => setFieldValue("endDate", date)}
                    />
                  </Grid>
                </Grid>
              </Grid>


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
              <Grid item>
                <LabelSelect placeholder={t('Categories')} selected={values.selectedCategories} options={categories} onChange={(e: any) => {
                  setFieldValue('selectedCategories', e);
                }} />
              </Grid>
              <Grid item>
                <LabelSelect placeholder={t('Labels')} selected={values.selectedLabels} options={labels} onChange={(e: any) => {
                  setFieldValue('selectedLabels', e);
                }} />
              </Grid>
              <Grid>
                <Box mt={1}>
                  <Button type="submit">
                    {budget ? t("Edit") : t("Add")}
                  </Button>
                </Box>
              </Grid>
              {
                budget ? <Grid>
                  <Box mt={1}>
                    <Button onClick={openDeleteModal}>
                      {t("Delete")}
                    </Button>
                  </Box>
                </Grid> : ''
              }
            </Grid>
          </Form>
        )}
      </Formik>
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={t("Are you sure?")}
        content={t("All transactions related to this wallet will be removed!")}
        onConfirm={handleBudgetDelete}
        onCancel={closeDeleteModal}
      />
    </React.Fragment>
  );
};

BudgetForm.fragment = gql`
  mutation CreateBudget(
    $startDate: String!
    $endDate: String!
    $name: String!
    $value: Float!
    $categoryIds: [Int]
    $labelIds: [Int]
  ) {
    createBudget(
      input: {
        startDate: $startDate
        endDate: $endDate
        name: $name
        value: $value
        categoryIds: $categoryIds
        labelIds: $labelIds
      }
    ) {
      id
      name
      value
      spent
      startDate
      endDate
      categories {
        id
        name
        color
        balance
      }
      labels {
        id
        name
        color
      }
    }
  }

  mutation UpdateBudget(
    $id: Int!
    $startDate: String
    $endDate: String
    $name: String
    $value: Float
    $categoryIds: [Int]
    $labelIds: [Int]
  ) {
    updateBudget(
      input: {
        id: $id
        startDate: $startDate
        endDate: $endDate
        name: $name
        value: $value
        categoryIds: $categoryIds
        labelIds: $labelIds
      }
    ) {
      id
      name
      value
      spent
      startDate
      endDate
      categories {
        id
        name
        color
        balance
      }
      labels {
        id
        name
        color
      }
    }
  }

  mutation DeleteBudget($id: Int!) {
    deleteBudget(input: { id: $id }) {
      id
    }
  }
`;

export default BudgetForm;
