import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";
import { Helmet } from "react-helmet";
import useTranslations from "translations";
import NavigationBar from "components/containers/navigation-bar";
import Heading from "components/core/heading";
import Image from "components/core/image";
import Button from "components/core/button";
import Title from "components/core/title";
import useStyles from "./styles";

const LandingPage = () => {
  const classes = useStyles();
  const { t } = useTranslations();

  return (
    <Box>
      <Helmet>
        <title>{t("Expenses Tracker - Your Finances in One Place")}</title>
      </Helmet>

      <NavigationBar />

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.hero}
      >
        <Grid item xs={12} md={4} lg={3}>
          <Grid container direction="column">
            <Box margin={10}>
              <Grid item>
                <Box padding={4}>
                  <Heading title={"Your Finances"} />
                  <Heading title={"in One Place"} />
                </Box>
              </Grid>
              <Grid item>
                <Box margin={5}>
                  <Button className={classes.tryNow}>
                    <NavLink to={"/register"} className={classes.link} exact>
                      {t("Try Now For Free")}
                    </NavLink>
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={4}>
          <Image src={"../hero.png"} alt={"Hero image"} />
        </Grid>
      </Grid>

      <Box className={classes.summary} padding={10}>
        Managing your personal finance is like taking care of your health.
        <br />
        Both are essential to lead and enjoy the richness of your life.
      </Box>

      <Box marginTop={15} marginBottom={10}>
        <Heading subtitle="With Our App You Can" color="#000" />
      </Box>
      <Grid container direction={"row"} justify="center">
        <Grid item xs={12} md={4} lg={3} className={classes.youCanItem}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Image
                maxWidth={"150px"}
                alt="See the whole picture"
                src={"./bank.png"}
              />
            </Grid>
            <Grid item>
              <Box className={classes.youCanItemTitle}>
                <Title variant="h5">See the Whole Picture</Title>
              </Box>
              <Box className={classes.youCanItemContent}>
                One app to unite your finances
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3} className={classes.youCanItem}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Image
                maxWidth={"150px"}
                alt="Manage your cash"
                src={"./charts.png"}
              />
            </Grid>
            <Grid item>
              <Box className={classes.youCanItemTitle}>
                <Title variant="h5">Manage Your Cash</Title>
              </Box>
              <Box className={classes.youCanItemContent}>
                Get ahead of the curve
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3} className={classes.youCanItem}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Image
                maxWidth={"150px"}
                alt="Use your date your way"
                src={"./money.png"}
              />
            </Grid>
            <Grid item>
              <Box className={classes.youCanItemTitle}>
                <Title variant="h5">Use Your Data Your Way</Title>
              </Box>
              <Box className={classes.youCanItemContent}>
                We never sells customer data to anyone
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.smartGuy}
      >
        <Grid item xs={12} md={5} lg={3}>
          <Grid container direction="column">
            <Box marginRight={10}>
              <Grid item>
                <Box padding={4}>
                  <Heading title={"Be Ready"} />
                </Box>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  spacing={5}
                  className={classes.smartGuyText}
                >
                  <Grid item>
                    Our lives can change overnight, and one of the things that
                    affects us the most is our money.
                  </Grid>
                  <Grid item>
                    ExpensesTracker was built on the idea that knowing is better
                    than hoping. We make apps for people who ask tough questions
                    and want real answers.
                  </Grid>
                  <Grid item>
                    Am I ready for the future? Am I doing all I can? It’s never
                    too early, or too late, to start asking.
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} lg={3}>
          <Image src={"../smartGuy.png"} alt={"Smart Guy"} />
        </Grid>
      </Grid>

      <Box marginTop={15} marginBottom={10}>
        <Heading subtitle="Own Your Future" color="#000" />
      </Box>
      <Grid container direction={"row"} justify="center">
        <Grid item xs={12} md={3} lg={2} className={classes.youCanItem}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Image
                maxWidth={"150px"}
                alt="Ask the questions"
                src={"./askQuestions.png"}
              />
            </Grid>
            <Grid item>
              <Box className={classes.youCanItemTitle}>
                <Title variant="h5">Ask the Questions</Title>
              </Box>
              <Box className={classes.youCanItemContent}>
                Where does my money go?
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} lg={2} className={classes.youCanItem}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Image
                maxWidth={"150px"}
                alt="See the data"
                src={"./pinkBags.png"}
              />
            </Grid>
            <Grid item>
              <Box className={classes.youCanItemTitle}>
                <Title variant="h5">See the Data</Title>
              </Box>
              <Box className={classes.youCanItemContent}>
                Unlock key insights
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} lg={2} className={classes.youCanItem}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Image
                maxWidth={"150px"}
                alt="Be eficient"
                src={"./orangeClock.png"}
              />
            </Grid>
            <Grid item>
              <Box className={classes.youCanItemTitle}>
                <Title variant="h5">Be efficient</Title>
              </Box>
              <Box className={classes.youCanItemContent}>
                No missed payments
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} lg={2} className={classes.youCanItem}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Image
                maxWidth={"150px"}
                alt="Have the answers"
                src={"./greenTarget.png"}
              />
            </Grid>
            <Grid item>
              <Box className={classes.youCanItemTitle}>
                <Title variant="h5">Have the answers</Title>
              </Box>
              <Box className={classes.youCanItemContent}>Anytime, anywhere</Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.tryFree}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Box margin={10}>
            <Grid item>
              <Box padding={4}>
                <Heading title={"Start your journey now"} />
              </Box>
            </Grid>
            <Grid item>
              <Box margin={5}>
                <Button className={classes.tryNow}>
                  <NavLink to={"/register"} className={classes.link} exact>
                    {t("Try Now For Free")}
                  </NavLink>
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginBottom: "-3px" }}>
          <Image src={"./hero.png"} alt={"Try Free"} />
        </Grid>
      </Grid>
      <Box
        padding={10}
        style={{ textAlign: "center", backgroundColor: "#f6f6f6" }}
      >
        Copyright 2021 | Sinan Shaban
      </Box>
    </Box>
  );
};

export default LandingPage;
