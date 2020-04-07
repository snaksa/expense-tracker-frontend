import React from "react";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "components/atoms/button";
import TextField from "components/atoms/form/text-field";
import { useNotificationContext } from "services/notification-provider";
import {
  useCreateWalletMutation,
  WalletsDocument,
  WalletsQuery,
  Wallet,
  useUpdateWalletMutation
} from "api";
// import ColorPicker from "material-ui-color-picker";
import { useUpdateDetectionContext } from "services/update-detection-provider";

interface Props {
  wallet?: Wallet;
  onComplete: Function;
  onError: Function;
}

export interface FormFields {
  name: string;
  color: string;
  amount: any;
}

const schema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Enter wallet name"),
    color: Yup.string().required("Enter wallet color"),
    amount: Yup.number()
  });
};

const WalletForm = ({ wallet, onComplete, onError }: Props): JSX.Element => {
  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const { setWalletUpdate } = useUpdateDetectionContext();

  const [createWallet] = useCreateWalletMutation({
    onCompleted() {
      showSuccessNotification("Wallet created succesfully!");
      setWalletUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification("An error occured while saving the wallet data!");
      onError();
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

  const [updateWallet] = useUpdateWalletMutation({
    onCompleted() {
      showSuccessNotification("Wallet updated succesfully!");
      setWalletUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification("An error occured while updating the wallet data!");
      onError();
    }
  });

  const onSubmit = (values: FormFields) => {
    if (wallet) {
      updateWallet({
        variables: {
          id: wallet.id,
          name: values.name,
          color: values.color
        }
      });
    } else {
      createWallet({
        variables: {
          name: values.name,
          color: values.color,
          amount: values.amount
        }
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: wallet?.name ?? "",
        color: wallet?.color ?? "#DE60D4",
        amount: wallet?.amount ?? null
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, handleChange }) => (
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
            {!wallet && (
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
            )}
            <Grid item>
              <Box style={{ backgroundColor: values.color }}>
                {/* <ColorPicker
                  name="color"
                  defaultValue="#000"
                  value={values.color}
                  onChange={color => setFieldValue("color", color)}
                  fullWidth
                /> */}
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
  );
};

export default WalletForm;
