import React from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

const AdminTemplate = ({ header, sidebar, content }: any) => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {header}
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={1} className={classes.sidebar}>
        {sidebar}
      </Grid>
      <Grid item xs={12} sm={12} md={10} lg={11} className={classes.content}>
        {content}
      </Grid>
    </Grid>
  );
};

export default AdminTemplate;
