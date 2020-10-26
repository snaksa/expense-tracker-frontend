import React from "react";
import { Grid, Box } from "@material-ui/core";
import { Helmet } from "react-helmet";
import useTranslations from "translations";
import useStyles from "./styles";

const SplashScreen = () => {
  const { t } = useTranslations();
  const classes = useStyles();

  return (
    <Box>
      <Helmet>
        <title>{t("Expenses Tracker - Your Finances in One Place")}</title>
      </Helmet>
      <Grid
        container
        direction='column'
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Grid item>
        {t("Expenses Tracker")}
        </Grid>
        <Grid item>
        {t("Your Finances in One Place")}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SplashScreen;
