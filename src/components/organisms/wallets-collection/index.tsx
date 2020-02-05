import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import ColorPicker from "material-ui-color-picker";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import useStyles from "./styles";
import Modal from "../../molecules/modal";
import Button from "../../atoms/button";
import TextField from "../../atoms/text-field";
import WalletSummary from "../../molecules/wallet-summary";
import {
  useCreateWalletMutation,
  Wallet,
  WalletsDocument,
  WalletsQuery
} from "../../../api";
import { useNotificationContext } from "../../../services/notification-provider";

interface Props {
  wallets: Wallet[];
  onItemClick: Function;
}

export interface FormFields {
  name: string;
  amount: any;
  color: string;
}

const WalletsCollection = ({ wallets, onItemClick }: Props): JSX.Element => {
  const classes = useStyles({});

  const [newWalletModalIsOpen, setNewWalletModalIsOpen] = useState(false);

  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const [createWallet] = useCreateWalletMutation({
    onCompleted() {
      setNewWalletModalIsOpen(false);
      showSuccessNotification("Wallet created succesfully!");
    },
    onError() {
      showErrorNotification("An error occured while saving the wallet data!");
    },
    update: (store, { data }) => {
      const wallet = data?.createWallet;
      if (!wallet) {
        return;
      }

      const query = {
        query: WalletsDocument
      };

      const cached = store.readQuery<WalletsQuery>(query);
      if (!cached || !cached.wallets) {
        return;
      }

      cached.wallets.push(wallet);
      store.writeQuery({
        ...query,
        data: cached
      });
    }
  });

  const onSubmit = (values: FormFields) => {
    createWallet({
      variables: {
        name: values.name,
        amount: values.amount,
        color: values.color
      }
    });
  };

  const CreateWalletSchema = () =>
    Yup.object().shape({
      name: Yup.string().required("Enter wallet name"),
      amount: Yup.number().nullable(),
      color: Yup.string().required("Choose wallet color")
    });

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="row">
          {wallets.map((wallet: Wallet) => (
            <Grid item className={classes.walletItem}>
              <WalletSummary
                id={wallet.id}
                name={wallet.name}
                color={wallet.color}
                amount={wallet.amount}
                onClick={onItemClick}
              />
            </Grid>
          ))}
          <Grid item className={classes.walletItem}>
            <Button
              style={{ height: "100%" }}
              onClick={() => setNewWalletModalIsOpen(true)}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        title={"+ New Wallet"}
        isOpen={newWalletModalIsOpen}
        handleClose={() => {
          setNewWalletModalIsOpen(false);
        }}
      >
        <Formik
          initialValues={{
            name: "",
            amount: null,
            color: "#DE60D4"
          }}
          validationSchema={CreateWalletSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container direction="column">
                <Grid item>
                  <TextField
                    label="Name"
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
                    label="Initial Amount"
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
                  <Box style={{ backgroundColor: values.color }}>
                    <ColorPicker
                      name="color"
                      defaultValue="#000"
                      value={values.color}
                      onChange={color => setFieldValue("color", color)}
                      fullWidth
                    />
                  </Box>
                </Grid>
                <Grid>
                  <Box mt={1}>
                    <Button type="submit" style={{}}>
                      Add
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
