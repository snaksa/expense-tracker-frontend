import React, { useState } from "react";
import { useHistory } from "react-router";
import { Grid, Box } from "@material-ui/core";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useLoginMutation, useCurrentUserLazyQuery } from "api";
import { useAuthDataContext } from "services/auth-provider";
import useTranslations from "translations";
import TextField from "components/atoms/form/text-field";
import Button from "components//atoms/button";
import useStyles from "./styles";

export interface FormFields {
  email: string;
  password: string;
}

const Login = () => {
  const classes = useStyles();
  const { t } = useTranslations();

  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const { onLogin } = useAuthDataContext();

  const [getCurrentUser] = useCurrentUserLazyQuery();

  const [login] = useLoginMutation({
    onCompleted(data) {
      localStorage.setItem("token", data?.loginUser ?? "");
      onLogin(data.loginUser);
      getCurrentUser();
      history.push("/admin");
    },
    onError() {
      setErrorMessage(t("Incorrect username or password"));
    },
  });

  const onSubmit = (values: FormFields) => {
    login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  };

  const Schema = () =>
    Yup.object().shape({
      email: Yup.string()
        .email(t("Enter a valid email address"))
        .required(t("Enter your email address")),
      password: Yup.string().required(t("Enter your password")),
    });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
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
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={!!(errors.email && touched.email)}
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
                error={!!(errors.password && touched.password)}
                helperText={errors.password}
              />
            </Grid>
            <Grid item className={classes.errorMessage}>
              {errorMessage}
            </Grid>
            <Grid item>
              <Box mt={1}>
                <Button type="submit" style={{}}>
                  {t("Login")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

Login.fragment = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password })
  }
  query CurrentUser {
    me {
      id
      email
      firstName
      lastName
      currency
      language
    }
  }
`;

export default Login;
