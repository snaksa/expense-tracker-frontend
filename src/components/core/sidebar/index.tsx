import React, { useMemo } from "react";
import { Grid, Box } from "@material-ui/core";
import SidebarOption from "components/core/sidebar-option";
import useStyles from "./styles";

export interface Props {
  isVisible: boolean;
  options: object[];
  onOptionClick: Function;
}

const Sidebar: React.FunctionComponent<Props> = ({
  isVisible,
  options,
  onOptionClick,
}: Props): JSX.Element => {
  const classes = useStyles();

  const renderOptions = useMemo(
    () =>
      options.map((option, index) => (
        <Grid item key={index}>
          <SidebarOption option={option} onClick={onOptionClick} />
        </Grid>
      )),
    [options, onOptionClick]
  );

  return (
    <Box height={"100%"}>
      {isVisible ? (
        <Box className={classes.mobile}>
          <Grid container className={classes.main} direction="column">
            {options.map((option, index) => (
              <Grid item key={index}>
                <SidebarOption option={option} onClick={onOptionClick} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <Box className={classes.desktop}>
        <Grid container className={classes.main} direction="column">
          {renderOptions}
        </Grid>
      </Box>
    </Box>
  );
};

export default Sidebar;
