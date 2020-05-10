import React, { useState } from "react";
import { useHistory } from "react-router";
import { Grid, Box } from "@material-ui/core";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useRegisterMutation } from "api";
import useTranslations from "translations";
import TextField from "components/atoms/form/text-field";
import Button from "components/atoms/button";

export interface FormFields {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const history = useHistory();
  const { t } = useTranslations();

  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [register] = useRegisterMutation({
    onCompleted() {
      setIsSubmitting(false);
      history.push("/login");
    },
    onError() {
      setIsSubmitting(false);
      setError("User with this email already exists!");
    },
  });

  const onSubmit = (values: FormFields) => {
    setIsSubmitting(true);
    register({
      variables: {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
    });
  };

  const Schema = () =>
    Yup.object().shape({
      email: Yup.string()
        .email(t("Enter a valid email address"))
        .required(t("Enter your email address")),
      password: Yup.string().required(t("Enter your password")),
      confirmPassword: Yup.string().required(t("Enter password confirmation")),
    });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <Grid container direction="column">
            <Grid item>
              <TextField
                label={t("Email")}
                name="email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                error={
                  !!(
                    (errors.email && touched.email && errors.email) ||
                    (error && !isSubmitting)
                  )
                }
                helperText={errors.email || error}
              />
            </Grid>
            <Grid item>
              <TextField
                label={t("Password")}
                type="password"
                variant="outlined"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={
                  !!(errors.password && touched.password && errors.password)
                }
                helperText={errors.password}
              />
            </Grid>
            <Grid item>
              <TextField
                label={t("Confirm Password")}
                type="password"
                variant="outlined"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={
                  !!(
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
                  )
                }
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid>
              <Box mt={1}>
                <Button type="submit" disabled={isSubmitting}>
                  {t("Register")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

RegisterForm.fragment = gql`
  mutation Register(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      input: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
    }
  }
`;

export default RegisterForm;
