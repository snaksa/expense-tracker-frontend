import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { useCategoriesQuery, useWalletsQuery, useLabelsQuery, useCurrentUserQuery } from "api";
import useTranslations from "translations";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import WalletsTable from "components/tables/wallets-table";
import CategoriesTable from "components/tables/categories-table";
import LabelsTable from "components/tables/labels-table";
import ProfileForm from "components/forms/profile-form";
import Modal from "components/core/modal";
import CategoryForm from "components/forms/category-form";
import WalletForm from "components/forms/wallet-form";
import SummaryBox from "components/core/summary-box";
import useStyles from "./styles";
import LabelForm from "components/forms/label-form";

const SettingsPage = () => {
  const classes = useStyles();
  const { t } = useTranslations();

  const {
    lastTransactionAction,
    lastCategoryAction,
    lastWalletAction,
  } = useUpdateDetectionContext();

  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const showNewCategoryModal = useCallback(() => setNewCategoryModalIsOpen(true), []);
  const hideNewCategoryModal = useCallback(() => setNewCategoryModalIsOpen(false), []);

  const [newWalletModalIsOpen, setNewWalletModalIsOpen] = useState(false);
  const showNewWalletModal = useCallback(() => setNewWalletModalIsOpen(true), []);
  const hideNewWalletModal = useCallback(() => setNewWalletModalIsOpen(false), []);

  const [newLabelModalIsOpen, setNewLabelModalIsOpen] = useState(false);
  const showNewLabelModal = useCallback(() => setNewLabelModalIsOpen(true), []);
  const hideNewLabelModal = useCallback(() => setNewLabelModalIsOpen(false), []);

  const {
    data: categoriesData,
    refetch: refetchCategories,
  } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const { data: labelsData } = useLabelsQuery();
  const labels: any = labelsData?.labels ?? [];

  const { data: currentUserData } = useCurrentUserQuery();
  const currentUser = currentUserData?.me ?? null;

  useEffect(() => {
    refetchCategories();
  }, [lastTransactionAction, lastCategoryAction, lastWalletAction, refetchCategories]);

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>{t("Settings | Expenses Tracker")}</title>
      </Helmet>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={4}>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <SummaryBox header={t("Profile Settings")} responsiveHeight={true}>
                <ProfileForm
                  user={currentUser}
                  onComplete={() => { }}
                  onError={() => { }}
                />
              </SummaryBox>
            </Grid>
            <Grid item>
              <LabelsTable
                labels={labels}
                onClick={showNewLabelModal}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <CategoriesTable
            categories={categories}
            onClick={showNewCategoryModal}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <WalletsTable
            wallets={wallets}
            onClick={showNewWalletModal}
          />
        </Grid>
      </Grid>
      <Modal
        title={t("+ New Category")}
        isOpen={newCategoryModalIsOpen}
        handleClose={hideNewCategoryModal}
      >
        <CategoryForm
          onComplete={hideNewCategoryModal}
          onError={hideNewCategoryModal}
        />
      </Modal>
      <Modal
        title={t("+ New Label")}
        isOpen={newLabelModalIsOpen}
        handleClose={hideNewLabelModal}
      >
        <LabelForm
          onComplete={hideNewLabelModal}
          onError={hideNewLabelModal}
        />
      </Modal>
      <Modal
        title={t("+ New Wallet")}
        isOpen={newWalletModalIsOpen}
        handleClose={hideNewCategoryModal}
      >
        <WalletForm
          onComplete={hideNewWalletModal}
          onError={hideNewWalletModal}
        />
      </Modal>
    </Box>
  );
};

SettingsPage.fragment = gql`
  query Categories {
    categories {
      id
      name
      color
      transactionsCount
      balance
      transactions {
        id
        value
        type
        date
      }
    }
  }
  query CategoriesSpendingFlow(
    $startDate: String
    $endDate: String
    $timezone: String
    $walletIds: [Int]!
    $categoryIds: [Int]
  ) {
    categoriesSpendingFlow(
      input: { startDate: $startDate, endDate: $endDate, timezone: $timezone, walletIds: $walletIds, categoryIds: $categoryIds }
    ) {
      header
      data
      colors
    }
  }
  query CategoriesSpendingPie(
    $startDate: String
    $endDate: String
    $timezone: String
    $walletIds: [Int]!
    $categoryIds: [Int]
    $type: TransactionType
  ) {
    categoriesSpendingPieChart(
      input: {
        startDate: $startDate
        endDate: $endDate
        timezone: $timezone
        walletIds: $walletIds
        categoryIds: $categoryIds
        type: $type
      }
    ) {
      header
      data
      colors
    }
  }
  query Labels {
    labels {
      id
      name
      color
    }
  }
  query Currencies {
    currencies {
      id
      value
    }
  }
`;

export default SettingsPage;
