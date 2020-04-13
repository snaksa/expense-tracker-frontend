import React from "react";
import { Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "components/atoms/form/text-field";
import { useNotificationContext } from "services/notification-provider";
import { useCurrenciesQuery, useUpdateUserMutation } from "api";
import { gql } from "apollo-boost";
import Select from "components/atoms/form/select";
import Button from "components/atoms/button";
import useTranslations from "translations";

interface Props {
  user?: any;
  onComplete: Function;
  onError: Function;
}

export interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  currency: string;
  language: string;
}

const ProfileForm = ({ user, onComplete, onError }: Props): JSX.Element => {
  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();
  const { t } = useTranslations();

  const { data: currenciesData } = useCurrenciesQuery();
  const currencies: any = currenciesData?.currencies ?? [];

  const schema = () => {
    return Yup.object().shape({
      firstName: Yup.string().required(t("Enter first name")),
      lastName: Yup.string().required(t("Enter last name")),
      email: Yup.string().email().required(t("Enter а valid email")),
      currency: Yup.string().required(t("Choose currency")),
      language: Yup.string().required(t("Choose language")),
    });
  };

  const [updateUser] = useUpdateUserMutation({
    onCompleted() {
      showSuccessNotification(t("Profile info save succesfully!"));
      onComplete();
    },
    onError() {
      showErrorNotification(
        t("An error occured while saving the profile info!")
      );
      onError();
    },
  });

  const onSubmit = (values: FormFields) => {
    updateUser({
      variables: {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        currency: values.currency,
        language: values.language,
      },
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: user?.email ?? "",
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        currency: user?.currency ?? "",
        language: user?.language ?? "",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                label={t("First Name")}
                name="firstName"
                type="text"
                variant="outlined"
                value={values.firstName}
                onChange={handleChange}
                error={
                  !!(errors.firstName && touched.firstName && errors.firstName)
                }
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                label={t("Last Name")}
                name="lastName"
                type="text"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange}
                error={
                  !!(errors.lastName && touched.lastName && errors.lastName)
                }
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                label={t("Email")}
                name="email"
                type="text"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                error={!!(errors.email && touched.email && errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Select
                label={t("Currency")}
                name="currency"
                selected={values.currency}
                options={currencies}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Select
                label={t("Language")}
                name="language"
                options={[
                  {
                    id: "BG",
                    value: t("Bulgarian"),
                  },
                  {
                    id: "EN",
                    value: t("English"),
                  },
                ]}
                onChange={handleChange}
                selected={values.language}
              />
            </Grid>
            <Grid item>
              <Button type="submit">{t("Save")}</Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

ProfileForm.fragment = gql`
  mutation UpdateUser(
    $email: String
    $firstName: String
    $lastName: String
    $currency: String
    $language: String
  ) {
    updateUser(
      input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        currency: $currency
        language: $language
      }
    ) {
      id
      email
      firstName
      lastName
      currency
      language
    }
  }
`;

export default ProfileForm;
