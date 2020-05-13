import React, { useState, useCallback } from "react";
import { Grid, Box } from "@material-ui/core";
import {
  Add as AddIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import Button from "components/atoms/button";
import useStyles from "./styles";

interface Props {
  header: string;
  children: any;
  responsiveHeight?: boolean;
  onClick?: Function;
  toggle?: boolean;
}

const SummaryBox = ({
  header,
  children,
  responsiveHeight,
  onClick,
  toggle,
}: Props) => {
  const classes = useStyles();
  const [visible, setVisible] = useState<boolean>(true);

  const toggleVisible = useCallback(() => setVisible(!visible), [visible]);

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
                  {toggle && visible && (
                    <ExpandLessIcon
                      fontSize={"small"}
                      onClick={toggleVisible}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  {toggle && !visible && (
                    <ExpandMoreIcon
                      fontSize={"small"}
                      onClick={toggleVisible}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={`${classes.content} ${
              responsiveHeight ? classes.noMinHeight : ""
            } ${toggle && !visible ? classes.hiddenContent : ""}`}
          >
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SummaryBox;
