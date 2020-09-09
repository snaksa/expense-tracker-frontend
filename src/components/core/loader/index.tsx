import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

export interface Props {
  loading: boolean;
}

const Loader: React.FunctionComponent<Props> = ({
  loading,
}: Props): JSX.Element => {
  const classes = useStyles({});

  if (!loading) {
    return <Box></Box>;
  }

  return (
    <Box className={classes.main}>
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Loader;
