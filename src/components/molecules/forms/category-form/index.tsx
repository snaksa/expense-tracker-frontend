import React from "react";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "components/atoms/button";
import TextField from "components/atoms/form/text-field";
import { useNotificationContext } from "services/notification-provider";
import {
  useCreateCategoryMutation,
  CategoriesDocument,
  CategoriesQuery,
  Category,
  useUpdateCategoryMutation
} from "api";
// import ColorPicker from "material-ui-color-picker";
import { useUpdateDetectionContext } from "services/update-detection-provider";

interface Props {
  category?: Category;
  onComplete: Function;
  onError: Function;
}

export interface FormFields {
  name: string;
  color: string;
}

const schema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Enter category name"),
    color: Yup.string().required("Enter category color")
  });
};

const CategoryForm = ({
  category,
  onComplete,
  onError
}: Props): JSX.Element => {
  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const {
    setCategoryUpdate
  } = useUpdateDetectionContext();

  const [createCategory] = useCreateCategoryMutation({
    onCompleted() {
      showSuccessNotification("Category created succesfully!");
      setCategoryUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification("An error occured while saving the category data!");
      onError();
    },
    update: (store, { data }) => {
      const category = data?.createCategory;
      if (!category) {
        return;
      }

      const query = {
        query: CategoriesDocument
      };

      const cached = store.readQuery<CategoriesQuery>(query);
      if (!cached || !cached.categories) {
        return;
      }

      cached.categories.push(category);
      store.writeQuery({
        ...query,
        data: cached
      });
    }
  });

  const [updateCategory] = useUpdateCategoryMutation({
    onCompleted() {
      showSuccessNotification("Category updated succesfully!");
      setCategoryUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification(
        "An error occured while updating the category data!"
      );
      onError();
    }
  });

  const onSubmit = (values: FormFields) => {
    if (category) {
      updateCategory({
        variables: {
          id: category.id,
          name: values.name,
          color: values.color
        }
      });
    } else {
      createCategory({
        variables: {
          name: values.name,
          color: values.color
        }
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: category?.name ?? "",
        color: category?.color ?? "#DE60D4"
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <Grid container direction="column">
            <Grid item>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                error={!!(errors.name && touched.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item>
              <Box style={{ backgroundColor: values.color }}>
                {/* <ColorPicker
                  name="color"
                  defaultValue="#000"
                  value={values.color}
                  onChange={color => setFieldValue("color", color)}
                  fullWidth
                /> */}
              </Box>
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
