import React, { useState, useCallback } from "react";
import { Grid, Box } from "@material-ui/core";
import {
  Budget,
} from "api";
import useTranslations from "translations";
import useCurrencyFormatter from "services/currency-formatter";
import Modal from "components/core/modal";
import Title from "components/core/title";
import useStyles from "./styles";
import BudgetFormWrapper from "components/forms/budget-form";

interface Props {
  budget: Budget;
}


const BudgetSummary = ({ budget }: Props) => {
  const classes = useStyles();
  const { formatCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const openEditModal = useCallback(() => setEditModalIsOpen(true), []);
  const closeEditModal = useCallback(() => setEditModalIsOpen(false), []);

  let percents = budget.spent / budget.value * 100;
  if (percents > 100) {
    percents = 100;
  }

  let color = 'grey';
  if (percents <= 30) {
    color = 'green';
  }
  else if (percents <= 60) {
    color = 'yellow';
  }
  else {
    color = 'red';
  }

  return (
    <Box onClick={openEditModal} className={classes.box}>
      <Grid container className={classes.main} direction="column">
        <Grid item>
          <Box style={{ backgroundColor: color, width: `${percents}%`, height: '16px' }}></Box>
        </Grid>
        <Grid item>
          <Box p={1} className={classes.content}>
            <Title variant="subtitle2" >{budget.name}</Title>
            <Title variant="subtitle1">{formatCurrency(budget.spent)} / {formatCurrency(budget.value)}</Title>
          </Box>
        </Grid>
      </Grid>
      <Modal
        title={t("# Edit Budget")}
        isOpen={editModalIsOpen}
        handleClose={closeEditModal}
      >
        <BudgetFormWrapper
          budget={budget}
          onComplete={closeEditModal}
          onError={closeEditModal}
        />
      </Modal>
    </Box>
  );
};

export default BudgetSummary;
