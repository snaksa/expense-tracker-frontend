import React from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

const AdminTemplate = ({ header, sidebar, content }: any) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" style={{ height: "100%", flexWrap: 'nowrap' }}>
      <Grid item>{header}</Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <Grid container direction="row" style={{ height: "100%" }}>
          <Grid item xs={12} sm={12} md={2} lg={1} className={classes.sidebar}>
            {sidebar}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={10}
            lg={11}
            className={classes.content}
          >
            {content}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminTemplate;
