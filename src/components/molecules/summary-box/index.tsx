import React from "react";
import { Grid, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles";
import Button from "../../atoms/button";
import { useState } from "react";

interface Props {
  header: string;
  children: any;
  responsiveHeight?: boolean;
  onClick?: Function;
  toggle?: boolean;
}

const SummaryBox = ({ header, children, responsiveHeight, onClick, toggle }: Props) => {
  const classes = useStyles();
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Box className={classes.wrapper} p={2}>
      <Box className={classes.main} p={3}>
        <Grid container direction="column">
          <Grid item className={classes.header}>
            <Grid container justify={"space-between"}>
              <Grid item>
                <Box mb={toggle && !visible ? 0 : 3} pb={toggle ? 0 : 3}>
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
                  {
                    toggle && visible && <ExpandLessIcon fontSize={"small"} onClick={() => setVisible(!visible)} style={{cursor: 'pointer'}} />
                  }
                  {
                    toggle && !visible && <ExpandMoreIcon fontSize={"small"} onClick={() => setVisible(!visible)} style={{cursor: 'pointer'}} />
                  }
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={`${classes.content} ${responsiveHeight ? classes.noMinHeight : ''} ${toggle && !visible ? classes.hiddenContent : ''}`}
          >
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SummaryBox;
