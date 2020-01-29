import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "../../atoms/text-field";
import Button from "../../atoms/button";
import useStyles from "./styles";
import RoundImage from "../../molecules/round-image";
import Heading from "../../molecules/heading";
import { useRegisterMutation } from "../../../api";
import { gql } from "apollo-boost";

const Register = () => {
  const classes = useStyles({});

  const [register] = useRegisterMutation({
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    }
  });

  return (
    <Grid container className={classes.main} direction="column">
      <Grid item>
        <Grid container className={classes.hero} direction="column">
          <Grid item>
            <Box className={classes.heading} mx="auto">
              <Heading
                title="Your Finances in One Place"
                subtitle="Assign emotions to your expenses, learn about your real priorities and spend money on things that make you happy"
              />
            </Box>
          </Grid>
          <Grid item>
            <Grid container className={classes.form} direction="column">
              <Grid item>
                <Box className={classes.image} mt={-10} mb={3} mx='auto'>
                  <RoundImage src="https://pngimage.net/wp-content/uploads/2018/05/expense-icon-png-3.png" />
                </Box>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <TextField label="Email" variant="outlined" />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid>
                    <Box mt={1}>
                      <Button
                        style={{}}
                        onClick={() => {
                          register({
                            variables: {
                              email: "test2@abv.bg",
                              password: "123456",
                              confirmPassword: "123456"
                            }
                          });
                        }}
                      >
                        Register
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Register.fragment = gql`
  mutation Register(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      input: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
    }
  }
`;

export default Register;
