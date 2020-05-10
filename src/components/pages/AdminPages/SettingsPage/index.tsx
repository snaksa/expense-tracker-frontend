import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { gql } from "apollo-boost";
import { Box, Grid } from "@material-ui/core";
import { useCategoriesQuery, useWalletsQuery, useCurrentUserQuery } from "api";
import useTranslations from "translations";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import WalletsTable from "components/organisms/wallets-table";
import CategoriesTable from "components/organisms/categories-table";
import ProfileForm from "components/organisms/profile-form";
import Modal from "components/molecules/modal";
import CategoryForm from "components/molecules/forms/category-form";
import WalletForm from "components/molecules/forms/wallet-form";
import SummaryBox from "components/molecules/summary-box";
import useStyles from "./styles";

const SettingsPage = () => {
  const classes = useStyles();
  const { t } = useTranslations();

  const {
    lastTransactionAction,
    lastCategoryAction,
    lastWalletAction,
  } = useUpdateDetectionContext();

  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const [newWalletModalIsOpen, setNewWalletModalIsOpen] = useState(false);

  const {
    data: categoriesData,
    refetch: refetchCategories,
  } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const { data: currentUserData } = useCurrentUserQuery();
  const currentUser = currentUserData?.me ?? null;

  useEffect(() => {
    refetchCategories();
  }, [lastTransactionAction, lastCategoryAction, lastWalletAction]);

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>{t("Settings | Expenses Tracker")}</title>
      </Helmet>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={4}>
          <SummaryBox header={t("Profile Settings")} responsiveHeight={true}>
            <ProfileForm
              user={currentUser}
              onComplete={() => {}}
              onError={() => {}}
            />
          </SummaryBox>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <CategoriesTable
            categories={categories}
            onClick={() => setNewCategoryModalIsOpen(true)}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <WalletsTable
            wallets={wallets}
            onClick={() => setNewWalletModalIsOpen(true)}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </Grid>
      </Grid>
      <Modal
        title={t("+ New Category")}
        isOpen={newCategoryModalIsOpen}
        handleClose={() => {
          setNewCategoryModalIsOpen(false);
        }}
      >
        <CategoryForm
          onComplete={() => setNewCategoryModalIsOpen(false)}
          onError={() => setNewCategoryModalIsOpen(false)}
        />
      </Modal>
      <Modal
        title={t("+ New Wallet")}
        isOpen={newWalletModalIsOpen}
        handleClose={() => {
          setNewWalletModalIsOpen(false);
        }}
      >
        <WalletForm
          onComplete={() => setNewWalletModalIsOpen(false)}
          onError={() => setNewWalletModalIsOpen(false)}
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
    $date: String
    $walletIds: [Int]
    $categoryIds: [Int]
  ) {
    categoriesSpendingFlow(
      input: { date: $date, walletIds: $walletIds, categoryIds: $categoryIds }
    ) {
      header
      data
      colors
    }
  }
  query CategoriesSpendingPie(
    $date: String
    $walletIds: [Int]
    $categoryIds: [Int]
    $type: TransactionType
  ) {
    categoriesSpendingPieChart(
      input: {
        date: $date
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
  query Currencies {
    currencies {
      id
      value
    }
  }
`;

export default SettingsPage;
