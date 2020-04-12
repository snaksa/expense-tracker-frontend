import React from "react";
import useStyles from "./styles";
import { Grid } from "@material-ui/core";
import Button from "components/atoms/button";
import { NavLink } from "react-router-dom";
import useTranslations from "translations";

const NavigationBar = () => {
  const classes = useStyles();
  const { t } = useTranslations();

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      className={classes.navigation}
    >
      <Grid item xs={12} md={3}>
        <Grid container direction="row" spacing={4} justify="center">
          <Grid item>
            <Button variant="outlined">
              <NavLink to={"/login"} className={classes.link} exact>
                {t("Log In")}
              </NavLink>
            </Button>
          </Grid>
          <Grid item>
            <Button>
              <NavLink to={"/register"} className={classes.link} exact>
                {t("Sign up")}
              </NavLink>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NavigationBar;
