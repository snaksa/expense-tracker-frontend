import React, { useState } from "react";
import { Grid, Box, Tooltip, Checkbox } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import * as Yup from "yup";
import { gql } from "apollo-boost";
import ColorPicker from "material-ui-color-picker";
import { Form, Formik } from "formik";
import useStyles from "./styles";
import Title from "../../atoms/title";
import Modal from "../modal";
import Button from "../../atoms/button";
import TextField from "../../atoms/form/text-field";
import ConfirmationDialog from "../confirmation-dialog";
import { useNotificationContext } from "services/notification-provider";
import {
  useDeleteWalletMutation,
  useUpdateWalletMutation,
  WalletsQuery,
  WalletsDocument
} from "../../../api";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import useCurrencyFormatter from "services/currency-formatter";

interface Props {
  id: number;
  name: string;
  amount: number;
  color: string;
  onClick: Function;
}

export interface FormFields {
  name: string;
  color: string;
}

const WalletSummary = ({ id, name, amount, color, onClick }: Props) => {
  const classes = useStyles();
  const {formatCurrency} = useCurrencyFormatter();

  const {
    setWalletUpdate
  } = useUpdateDetectionContext();

  const [checked, setChecked] = useState(true);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const [deleteWallet] = useDeleteWalletMutation({
    onCompleted() {
      showSuccessNotification("Wallet deleted successfully!");
      setWalletUpdate();
    },
    onError() {
      showErrorNotification("An error occured while deleting the wallet!");
    },
    update: (store, { data }) => {
      const wallet = data?.deleteWallet;

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

      const result = cached.wallets.filter(w => w && w.id !== wallet.id);
      store.writeQuery({
        ...query,
        data: {
          wallets: result
        }
      });
    }
  });

  const [updateWallet] = useUpdateWalletMutation({
    onCompleted() {
      setEditModalIsOpen(false);
      showSuccessNotification("Successfully updated wallet!");
    },
    onError() {
      setEditModalIsOpen(false);
      showErrorNotification("An error occured while updating the wallet!");
    },
    update: (store, { data }) => {
      const wallet = data?.updateWallet;

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

      const result = cached.wallets.map(w => {
        if (w && w.id === id) {
          return wallet;
        }
        return w;
      });

      store.writeQuery({
        ...query,
        data: {
          wallets: result
        }
      });
    }
  });

  const UpdateWalletSchema = () =>
    Yup.object().shape({
      name: Yup.string().required("Enter wallet name"),
      color: Yup.string().required("Choose wallet color")
    });

  const onUpdateWalletSubmit = (values: FormFields) => {
    updateWallet({
      variables: {
        id: id,
        name: values.name,
        color: values.color
      }
    });
  };

  const handleWalletDelete = () => {
    setConfirmDeleteModalIsOpen(false);
    deleteWallet({
      variables: {
        id: id
      }
    });
  };

  return (
    <Box>
      <Grid
        container
        className={classes.main}
        direction="column"
        style={{ opacity: checked ? 1 : 0.3 }}
      >
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
                <Tooltip title="Edit" aria-label="edit">
                  <EditIcon
                    fontSize={"small"}
                    className={classes.icon}
                    onClick={() => setEditModalIsOpen(true)}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Checkbox
                  checked={checked}
                  onChange={() => {
                    onClick(id, !checked);
                    setChecked(!checked);
                  }}
                  value="primary"
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                  className={classes.checkbox}
                  disableRipple
                />
              </Grid>
              <Grid item>
                <Tooltip title="Delete" aria-label="delete">
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
        title={"# Edit Wallet"}
        isOpen={editModalIsOpen}
        handleClose={() => {
          setEditModalIsOpen(false);
        }}
      >
        <Formik
          initialValues={{
            name: name,
            color: color
          }}
          validationSchema={UpdateWalletSchema}
          onSubmit={onUpdateWalletSubmit}
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
        title={"Are you sure?"}
        content={"All transactions related to this wallet will be removed!"}
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
