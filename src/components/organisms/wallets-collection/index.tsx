import React, { useState, useCallback, useMemo } from "react";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import {
  useCreateWalletMutation,
  Wallet,
  WalletsDocument,
  WalletsQuery,
} from "api";
import useTranslations from "translations";
import { useNotificationContext } from "services/notification-provider";
import useCurrencyFormatter from "services/currency-formatter";
import Modal from "components/core/modal";
import WalletSummary from "components/organisms/wallet-summary";
import Button from "components/core/button";
import TextField from "components/forms/fields/text-field";
import ColorPicker from "components/forms/fields/color-picker";
import useStyles from "./styles";

interface Props {
  wallets: Wallet[];
}

export interface FormFields {
  name: string;
  amount: any;
  color: string;
}

const WalletsCollection = ({ wallets }: Props): JSX.Element => {
  const classes = useStyles({});
  const { t } = useTranslations();
  const { formatCurrency } = useCurrencyFormatter();

  const [newWalletModalIsOpen, setNewWalletModalIsOpen] = useState(false);
  const showNewModal = useCallback(() => setNewWalletModalIsOpen(true), []);
  const hideNewModal = useCallback(() => setNewWalletModalIsOpen(false), []);

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const [createWallet] = useCreateWalletMutation({
    onCompleted() {
      setNewWalletModalIsOpen(false);
      showSuccessNotification(t("Wallet created succesfully!"));
    },
    onError() {
      showErrorNotification(
        t("An error occured while saving the wallet data!")
      );
    },
    update: (store, { data }) => {
      const wallet = data?.createWallet;
      if (!wallet) {
        return;
      }

      const query = {
        query: WalletsDocument,
      };

      const cached = store.readQuery<WalletsQuery>(query);
      if (!cached || !cached.wallets) {
        return;
      }

      cached.wallets.push(wallet);
      store.writeQuery({
        ...query,
        data: cached,
      });
    },
  });

  const onSubmit = useCallback(
    (values: FormFields) => {
      createWallet({
        variables: {
          name: values.name,
          amount: values.amount,
          color: values.color,
        },
      });
    },
    [createWallet]
  );

  const createWalletSchema = useCallback(
    () =>
      Yup.object().shape({
        name: Yup.string().required(t("Enter wallet name")),
        amount: Yup.number().nullable(),
        color: Yup.string().required(t("Choose wallet color")),
      }),
    [t]
  );

  const renderWallets = wallets.map((wallet: Wallet, index: number) => (
    <Grid item key={index} className={classes.walletItem}>
      <WalletSummary
        id={wallet.id}
        name={wallet.name}
        color={wallet.color}
        amount={wallet.amount}
      />
    </Grid>
  ));

  let total = useMemo(() => {
    let result = 0;
    wallets.forEach((wallet) => {
      result += wallet.amount;
    });
    return result;
  }, [wallets]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Box textAlign="center">
          {t("Total")}: <span style={{fontWeight: 'bold'}}>{formatCurrency(total)}</span>
        </Box>
      </Grid>
      <Grid item>
        <Grid container direction="row">
          {renderWallets}
          <Grid item className={classes.walletItem}>
            <Button style={{ height: "100%" }} onClick={showNewModal}>
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        title={t("+ New Wallet")}
        isOpen={newWalletModalIsOpen}
        handleClose={hideNewModal}
      >
        <Formik
          initialValues={{
            name: "",
            amount: "",
            color: "#DE60D4",
          }}
          validationSchema={createWalletSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Grid container direction="column">
                <Grid item>
                  <TextField
                    label={t("Name")}
                    name="name"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    error={!!(errors.name && touched.name && errors.name)}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label={t("Initial Amount")}
                    name="amount"
                    type="number"
                    variant="outlined"
                    value={values.amount}
                    onChange={handleChange}
                    error={!!(errors.amount && touched.amount && errors.amount)}
                    helperText={errors.amount}
                  />
                </Grid>
                <Grid item>
                  <ColorPicker
                    name="color"
                    selected={values.color}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid>
                  <Box mt={1}>
                    <Button type="submit" style={{}}>
                      {t("Add")}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </Grid>
  );
};

WalletsCollection.fragment = gql`
  mutation CreateWallet($name: String!, $amount: Float, $color: String!) {
    createWallet(input: { name: $name, amount: $amount, color: $color }) {
      id
      name
      color
      amount
    }
  }
`;

export default WalletsCollection;
