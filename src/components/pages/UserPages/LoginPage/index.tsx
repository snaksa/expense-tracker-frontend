import React from "react";
import { Helmet } from "react-helmet";
import { Grid, Box } from "@material-ui/core";
import useTranslations from "translations";
import AuthForm from "components/organisms/auth-form";
import Heading from "components/core/heading";
import Login from "components/forms/login";
import useStyles from "./styles";

const LoginPage = () => {
  const classes = useStyles();
  const { t } = useTranslations();

  return (
    <Grid container className={classes.hero} direction="column">
      <Helmet>
        <title>{t("Login | Expenses Tracker")}</title>
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
          <Login />
        </AuthForm>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
