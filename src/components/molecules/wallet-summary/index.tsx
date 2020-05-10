import React, { useState } from "react";
import { Grid, Box, Tooltip } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import * as Yup from "yup";
import { gql } from "apollo-boost";
import { Form, Formik } from "formik";
import {
  useDeleteWalletMutation,
  useUpdateWalletMutation,
  WalletsQuery,
  WalletsDocument,
} from "api";
import useTranslations from "translations";
import { useNotificationContext } from "services/notification-provider";
import useCurrencyFormatter from "services/currency-formatter";
import Modal from "components/molecules/modal";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import Title from "components/atoms/title";
import Button from "components/atoms/button";
import TextField from "components/atoms/form/text-field";
import ColorPicker from "components/atoms/form/color-picker";
import useStyles from "./styles";

interface Props {
  id: number;
  name: string;
  amount: number;
  color: string;
}

export interface FormFields {
  name: string;
  color: string;
}

const WalletSummary = ({ id, name, amount, color }: Props) => {
  const classes = useStyles();
  const { formatCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();

  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const [deleteWallet] = useDeleteWalletMutation({
    onCompleted() {
      showSuccessNotification(t("Wallet deleted successfully!"));
    },
    onError() {
      showErrorNotification(t("An error occured while deleting the wallet!"));
    },
    update: (store, { data }) => {
      const wallet = data?.deleteWallet;

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

      const result = cached.wallets.filter((w) => w && w.id !== wallet.id);
      store.writeQuery({
        ...query,
        data: {
          wallets: result,
        },
      });
    },
  });

  const [updateWallet] = useUpdateWalletMutation({
    onCompleted() {
      setEditModalIsOpen(false);
      showSuccessNotification(t("Successfully updated wallet!"));
    },
    onError() {
      setEditModalIsOpen(false);
      showErrorNotification(t("An error occured while updating the wallet!"));
    },
    update: (store, { data }) => {
      const wallet = data?.updateWallet;

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

      const result = cached.wallets.map((w) => {
        if (w && w.id === id) {
          return wallet;
        }
        return w;
      });

      store.writeQuery({
        ...query,
        data: {
          wallets: result,
        },
      });
    },
  });

  const UpdateWalletSchema = () =>
    Yup.object().shape({
      name: Yup.string().required(t("Enter wallet name")),
      color: Yup.string().required(t("Choose wallet color")),
    });

  const onUpdateWalletSubmit = (values: FormFields) => {
    updateWallet({
      variables: {
        id: id,
        name: values.name,
        color: values.color,
      },
    });
  };

  const handleWalletDelete = () => {
    setConfirmDeleteModalIsOpen(false);
    deleteWallet({
      variables: {
        id: id,
      },
    });
  };

  return (
    <Box>
      <Grid container className={classes.main} direction="column">
        <Grid item>
          <Box
            p={0.5}
            className={classes.header}
            style={{ backgroundColor: color }}
          >
            <Grid
              container
              justify={"space-between"}
              className={classes.headerGrid}
            >
              <Grid item>
                <Tooltip title={t("Edit")} aria-label="edit">
                  <EditIcon
                    fontSize={"small"}
                    className={classes.icon}
                    onClick={() => setEditModalIsOpen(true)}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={t("Delete")} aria-label="delete">
                  <DeleteIcon
                    fontSize={"small"}
                    className={classes.icon}
                    onClick={() => setConfirmDeleteModalIsOpen(true)}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box p={1}>
            <Title variant="subtitle2">{name}</Title>
            <Title variant="subtitle1">{formatCurrency(amount)}</Title>
          </Box>
        </Grid>
      </Grid>
      <Modal
        title={t("# Edit Wallet")}
        isOpen={editModalIsOpen}
        handleClose={() => {
          setEditModalIsOpen(false);
        }}
      >
        <Formik
          initialValues={{
            name: name,
            color: color,
          }}
          validationSchema={UpdateWalletSchema}
          onSubmit={onUpdateWalletSubmit}
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
                  <ColorPicker
                    name="color"
                    selected={values.color}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid>
                  <Box mt={1}>
                    <Button type="submit" style={{}}>
                      Edit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={t("Are you sure?")}
        content={t("All transactions related to this wallet will be removed!")}
        onConfirm={handleWalletDelete}
        onCancel={() => setConfirmDeleteModalIsOpen(false)}
      />
    </Box>
  );
};

WalletSummary.fragment = gql`
  mutation DeleteWallet($id: Int!) {
    deleteWallet(input: { id: $id }) {
      id
    }
  }
  mutation UpdateWallet($id: Int!, $name: String, $color: String) {
    updateWallet(input: { id: $id, name: $name, color: $color }) {
      id
      name
      color
      amount
    }
  }
`;

export default WalletSummary;
