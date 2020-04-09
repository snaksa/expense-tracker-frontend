import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import Heading from "../../../molecules/heading";
import RegisterForm from "components/molecules/forms/register";
import AuthForm from "components/organisms/auth-form";
import { Helmet } from "react-helmet";

const RegisterPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.hero} direction="column">
      <Helmet>
        <title>Register | Expenses Tracker</title>
      </Helmet>
      <Grid item>
        <Box className={classes.heading} mx="auto">
          <Heading
            title="Your Finances in One Place"
            subtitle="Assign emotions to your expenses, learn about your real priorities and spend money on things that make you happy"
          />
        </Box>
      </Grid>
      <Grid item>
        <AuthForm>
          <RegisterForm />
        </AuthForm>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
