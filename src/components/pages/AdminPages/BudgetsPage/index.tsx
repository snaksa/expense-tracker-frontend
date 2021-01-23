import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Budget, useBudgetsQuery } from "api";
import useTranslations from "translations";
import BudgetFormWrapper from "components/forms/budget-form";
import Modal from "components/core/modal";
import useStyles from "./styles";
import BudgetSummary from "components/organisms/budget-summary";

const BudgetsPage = () => {
  const classes = useStyles();
  // const { getCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();

  const [newModalIsOpen, setNewModalIsOpen] = useState(false);
  const showNewModal = useCallback(() => setNewModalIsOpen(true), []);
  const hideNewModal = useCallback(() => setNewModalIsOpen(false), []);

  const { data, refetch } = useBudgetsQuery({
    fetchPolicy: 'cache-and-network'
  });
  const budgets: any = data?.budgets ?? [];
  console.log(budgets);

  const onComplete = () => {
    setNewModalIsOpen(false);
    refetch();
  }

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>{t("Budgets | Expenses Tracker")}</title>
      </Helmet>
      <Grid container direction='column'>
        {
          budgets.map((budget: Budget) => <Grid item>
            <BudgetSummary budget={budget}></BudgetSummary>
            </Grid>)
        }
        <Grid item className={classes.addIcon}>
          <AddCircleIcon fontSize='large' onClick={showNewModal} />
        </Grid>
      </Grid>
      <Modal
        title={t("+ New Record")}
        isOpen={newModalIsOpen}
        handleClose={hideNewModal}
      >
        <BudgetFormWrapper
          onComplete={onComplete}
          onError={hideNewModal}
        />
      </Modal>
    </Box>
  );
};

BudgetsPage.fragment = gql`
  query Budgets {
    budgets {
      id
      name
      value
      spent
      startDate
      endDate
      categories {
        id
        name
        color
      }
      labels {
        id
        name
      }
    }
  }
`;

export default BudgetsPage;
