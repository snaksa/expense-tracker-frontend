import React from "react";
import { Box, Grid } from "@material-ui/core";
import Title from "../../atoms/title";
import useStyles from "./styles";
import { NavLink } from "react-router-dom";
import useTranslations from "translations";

const HeroMenu = () => {
  const classes = useStyles();
  const { t } = useTranslations();

  return (
    <Box className={classes.wrapper}>
      <Grid container className={classes.main} justify="flex-end" spacing={2}>
        <Grid item>
          <NavLink
            to="/"
            exact
            className={classes.link}
            activeClassName={classes.active}
          >
            <Title variant="subtitle2" display="inline">
              {t("Login")}
            </Title>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink
            to="/register"
            exact
            className={classes.link}
            activeClassName={classes.active}
          >
            <Title variant="subtitle2" display="inline">
              {t("Register")}
            </Title>
          </NavLink>
        </Grid>
        <Grid item>
          <NavLink
            to="/about"
            exact
            className={classes.link}
            activeClassName={classes.active}
          >
            <Title variant="subtitle2" display="inline">
              {t("About")}
            </Title>
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroMenu;
