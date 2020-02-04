import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "./styles";
import Title from "../../atoms/title";
import { gql } from "apollo-boost";
import {
  useDeleteWalletMutation,
  useUpdateWalletMutation,
  WalletsQuery,
  WalletsDocument
} from "../../../api";
import { Form, Formik } from "formik";
import ColorPicker from "material-ui-color-picker";
import Modal from "../modal";
import Button from "../../atoms/button";
import TextField from "../../atoms/text-field";
import * as Yup from "yup";
import ConfirmationDialog from "../confirmation-dialog";

interface Props {
  id: number;
  name: string;
  amount: number;
  color: string;
  onClick: Function;
  onDelete: Function;
}

export interface FormFields {
  name: string;
  color: string;
}

const WalletSummary = ({
  id,
  name,
  amount,
  color,
  onClick,
  onDelete
}: Props) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(true);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const [deleteWallet] = useDeleteWalletMutation({
    onCompleted() {
      // TODO: show success notification
      onDelete(id, name, true);
    },
    onError(error) {
      // TODO: show error notification
      console.log(error);
      onDelete(id, name, false);
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

  const handleDelete = () => {
    // TODO: show confirm modal
    deleteWallet({
      variables: {
        id: id
      }
    });
  };

  const onSubmit = (values: FormFields) => {
    updateWallet({
      variables: {
        id: id,
        name: values.name,
        color: values.color
      }
    });
  };

  const Schema = () =>
    Yup.object().shape({
      name: Yup.string().required("Enter wallet name"),
      color: Yup.string().required("Choose wallet color")
    });

  const [updateWallet] = useUpdateWalletMutation({
    onCompleted() {
      // TODO: show success notification
      setEditModalIsOpen(false);
    },
    onError(error) {
      // TODO: show error notification
      console.log(error);
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
            <Title variant="subtitle1">${amount}</Title>
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
          validationSchema={Schema}
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
                    error={errors.name && touched.name && errors.name}
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
        onConfirm={handleDelete}
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
