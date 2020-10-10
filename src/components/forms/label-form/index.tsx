import React from "react";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  LabelsDocument,
  LabelsQuery,
  Label,
   useCreateLabelMutation, 
   useUpdateLabelMutation
} from "api";
import { useNotificationContext } from "services/notification-provider";
import useTranslations from "translations";
import Button from "components/core/button";
import TextField from "components/forms/fields/text-field";
import ColorPicker from "components/forms/fields/color-picker";

interface Props {
  label?: Label;
  onComplete: Function;
  onError: Function;
}

export interface FormFields {
  name: string;
  color: string;
}

const LabelForm = ({
  label,
  onComplete,
  onError,
}: Props): JSX.Element => {
  const { t } = useTranslations();

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const schema = () => {
    return Yup.object().shape({
      name: Yup.string().required(t("Enter label name")),
      color: Yup.string().required(t("Enter label color")),
    });
  };

  const [createLabel] = useCreateLabelMutation({
    onCompleted() {
      showSuccessNotification(t("Label created succesfully!"));
      onComplete();
    },
    onError() {
      showErrorNotification(
        t("An error occured while saving the label data!")
      );
      onError();
    },
    update: (store, { data }) => {
      const label = data?.createLabel;
      if (!label) {
        return;
      }

      const query = {
        query: LabelsDocument,
      };

      const cached = store.readQuery<LabelsQuery>(query);
      if (!cached || !cached.labels) {
        return;
      }

      cached.labels.push(label);
      store.writeQuery({
        ...query,
        data: cached,
      });
    },
  });

  const [updateLabel] = useUpdateLabelMutation({
    onCompleted() {
      showSuccessNotification(t("Label updated succesfully!"));
      onComplete();
    },
    onError() {
      showErrorNotification(
        t("An error occured while updating the label data!")
      );
      onError();
    },
  });

  const onSubmit = (values: FormFields) => {
    if (label) {
      updateLabel({
        variables: {
          id: label.id,
          name: values.name,
          color: values.color,
        },
      });
    } else {
      createLabel({
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
        name: label?.name ?? "",
        color: label?.color ?? "#DE60D4",
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
                <Button type="submit">{label ? t("Edit") : t("Add")}</Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

LabelForm.fragment = gql`
  mutation CreateLabel($name: String!, $color: String!) {
    createLabel(input: { name: $name, color: $color }) {
      id
      name
      color
    }
  }
  mutation DeleteLabel($id: Int!) {
    deleteLabel(input: { id: $id }) {
      id
    }
  }
  mutation UpdateLabel($id: Int!, $name: String, $color: String) {
    updateLabel(input: { id: $id, name: $name, color: $color }) {
      id
      name
      color
    }
  }
`;

export default LabelForm;
