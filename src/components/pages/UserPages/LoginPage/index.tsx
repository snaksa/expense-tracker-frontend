import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import Heading from "../../../molecules/heading";
import Login from "components/molecules/forms/login";
import AuthForm from "components/organisms/auth-form";
import { Helmet } from "react-helmet";
import useTranslations from "translations";

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
