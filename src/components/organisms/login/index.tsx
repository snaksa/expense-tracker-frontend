import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "../../atoms/text-field";
import Button from "../../atoms/button";
import useStyles from "./styles";
import RoundImage from "../../molecules/round-image";
import Heading from "../../molecules/heading";
import { useLoginMutation } from "../../../api";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { Formik, Form } from "formik";

export interface FormFields {
  email: string;
  password: string;
}

const Login = () => {
  const classes = useStyles();

  const [login] = useLoginMutation({
    onCompleted(data) {
      localStorage.setItem('token', data?.loginUser ?? '');
    },
    onError(error) {
      // TODO: show error notification
      console.log(error);
    }
  });

  const onSubmit = (values: FormFields) => {
    login({
      variables: {
        email: values.email,
        password: values.password
      }
    });
  };

  const Schema = () =>
    Yup.object().shape({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Enter your email address"),
      password: Yup.string().required("Enter your password")
    });

  return (
    <Grid container className={classes.main} direction="column">
      <Grid item>
        <Grid container className={classes.hero} direction="column">
          <Grid item>
            <Box className={classes.heading} mx="auto">
              <Heading
                title="Your Finances in One Place"
                subtitle="Assign emotions to your expenses, learn about your real priorities and spend money on things that make you happy"
              />
            </Box>
          </Grid>
          <Grid item>
            <Grid container className={classes.form} direction="column">
              <Grid item>
                <Box className={classes.image} mt={-10} mb={3} mx="auto">
                  <RoundImage src="https://pngimage.net/wp-content/uploads/2018/05/expense-icon-png-3.png" />
                </Box>
              </Grid>
              <Grid item>
                <Formik
                  initialValues={{
                    email: "",
                    password: ""
                  }}
                  validationSchema={Schema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched, values, handleChange }) => (
                    <Form>
                      <Grid container direction="column">
                        <Grid item>
                          <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            error={
                              errors.email && touched.email && errors.email
                            }
                          />
                        </Grid>
                        <Grid>
                          <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            error={
                              errors.password &&
                              touched.password &&
                              errors.password
                            }
                          />
                        </Grid>
                        <Grid>
                          <Box mt={1}>
                            <Button type="submit" style={{}} onClick={onSubmit}>
                              Login
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Login.fragment = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password })
  }
`;

export default Login;
