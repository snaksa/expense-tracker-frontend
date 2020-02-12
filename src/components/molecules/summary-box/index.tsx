import React from "react";
import { Grid, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import Button from "../../atoms/button";

interface Props {
  header: string;
  children: any;
  onClick?: Function;
}

const SummaryBox = ({ header, children, onClick }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} p={2}>
      <Box className={classes.main} p={3}>
        <Grid container direction="column">
          <Grid item className={classes.header}>
            <Grid container justify={"space-between"}>
              <Grid item>
                <Box mb={3} pb={3}>
                  {header}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {onClick && (
                    <Button onClick={onClick}>
                      <AddIcon fontSize={"small"} />
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.content}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SummaryBox;
