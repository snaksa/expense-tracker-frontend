import React from "react";
import Grid from "@material-ui/core/Grid";
import NavigationBar from "components/containers/navigation-bar";
import useStyles from "./styles";

const HeroTemplate = ({ hero }: any) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.main}
      direction="column"
      style={{ minHeight: "100%", flexWrap: "nowrap" }}
    >
      <Grid item>
        <NavigationBar />
      </Grid>
      {hero && (
        <Grid item style={{ flexGrow: 1 }}>
          {hero}
        </Grid>
      )}
    </Grid>
  );
};

export default HeroTemplate;
