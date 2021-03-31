import React from "react";
import { Helmet } from "react-helmet";
import { Grid, Box } from "@material-ui/core";
import useTranslations from "translations";
import AuthForm from "components/containers/auth";
import Heading from "components/core/heading";
import RegisterForm from "components/forms/register";
import useStyles from "./styles";

const RegisterPage = () => {
  const classes = useStyles();
  const { t } = useTranslations();

  return (
    <Grid container className={classes.hero} direction="column">
      <Helmet>
        <title>{t("Register | Expenses Tracker")}</title>
      </Helmet>
      <Grid item>
        <Box className={classes.heading} mx="auto">
          <Heading
            title={t("Your Finances in One Place")}
            subtitle={t(
              "Assign emotions to your expenses, learn about your real priorities and spend money on things that make you happy"
            )}
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
