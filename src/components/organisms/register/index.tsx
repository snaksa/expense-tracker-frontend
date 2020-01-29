import React from "react";
import { Grid, Box } from "@material-ui/core";
import TextField from "../../atoms/text-field";
import Button from "../../atoms/button";
import useStyles from "./styles";
import RoundImage from "../../molecules/round-image";
import Heading from "../../molecules/heading";
import { useRegisterMutation } from "../../../api";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useHistory } from 'react-router';

export interface FormFields {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const classes = useStyles({});

  const history = useHistory();

  const [register] = useRegisterMutation({
    onCompleted(data) {
      history.push('/');
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
        .email("Enter a valid email address")
        .required("Enter your email address"),
      password: Yup.string().required("Enter your password"),
      confirmPassword: Yup.string().required("Enter password confirmation")
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
                    password: "",
                    confirmPassword: ""
                  }}
                  validationSchema={Schema}
                  onSubmit={onSubmit}
                >
                  {({
                    isSubmitting,
                    errors,
                    touched,
                    values,
                    handleChange
                  }) => (
                    <Form>
                      <Grid container direction="column">
                        <Grid item>
                          <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                            error={
                              errors.email && touched.email && errors.email
                            }
                          />
                        </Grid>
                        <Grid item>
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
                        <Grid item>
                          <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            error={
                              errors.confirmPassword &&
                              touched.confirmPassword &&
                              errors.confirmPassword
                            }
                          />
                        </Grid>
                        <Grid>
                          <Box mt={1}>
                            <Button type="submit" style={{}} onClick={() => {}}>
                              {isSubmitting ? "Registering" : "Register"}
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

Register.fragment = gql`
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

export default Register;
