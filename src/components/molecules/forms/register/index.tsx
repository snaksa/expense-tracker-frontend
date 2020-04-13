import React from "react";
import { Grid, Box } from "@material-ui/core";
import TextField from "../../../atoms/form/text-field";
import Button from "../../../atoms/button";
import { useRegisterMutation } from "api";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router";
import useTranslations from "translations";

export interface FormFields {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const history = useHistory();
  const {t} = useTranslations();

  const [register] = useRegisterMutation({
    onCompleted(data) {
      history.push("/");
      console.log(data);
    },
    onError(error) {
      // TODO: show error notification
      console.log(error);
    }
  });

  const onSubmit = (values: FormFields) => {
    register({
      variables: {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword
      }
    });
  };

  const Schema = () =>
    Yup.object().shape({
      email: Yup.string()
        .email(t("Enter a valid email address"))
        .required(t("Enter your email address")),
      password: Yup.string().required(t("Enter your password")),
      confirmPassword: Yup.string().required(t("Enter password confirmation"))
    });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={Schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched, values, handleChange }) => (
        <Form>
          <Grid container direction="column">
            <Grid item>
              <TextField
                label={t("Email")}
                name="email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                error={!!(errors.email && touched.email && errors.email)}
                helperText={errors.email}
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
                <Button type="submit" style={{}} onClick={() => {}}>
                  {isSubmitting ? t("Please Wait") : t("Register")}
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
