import React, { useCallback } from "react";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useCreateWalletMutation,
  WalletsDocument,
  WalletsQuery,
  Wallet,
  useUpdateWalletMutation,
} from "api";
import useTranslations from "translations";
import { useNotificationContext } from "services/notification-provider";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import ColorPicker from "components/forms/fields/color-picker";
import Button from "components/core/button";
import TextField from "components/forms/fields/text-field";

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

const WalletForm = ({ wallet, onComplete, onError }: Props): JSX.Element => {
  const { t } = useTranslations();
  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const { setWalletUpdate } = useUpdateDetectionContext();

  const schema = useCallback(() => {
    return Yup.object().shape({
      name: Yup.string().required(t("Enter wallet name")),
      color: Yup.string().required(t("Enter wallet color")),
      amount: Yup.number(),
    });
  }, [t]);

  const [createWallet] = useCreateWalletMutation({
    onCompleted() {
      showSuccessNotification(t("Wallet created succesfully!"));
      setWalletUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification(
        t("An error occured while saving the wallet data!")
      );
      onError();
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

  const [updateWallet] = useUpdateWalletMutation({
    onCompleted() {
      showSuccessNotification(t("Wallet updated succesfully!"));
      setWalletUpdate();
      onComplete();
    },
    onError() {
      showErrorNotification(
        t("An error occured while updating the wallet data!")
      );
      onError();
    },
  });

  const onSubmit = useCallback(
    (values: FormFields) => {
      if (wallet) {
        updateWallet({
          variables: {
            id: wallet.id,
            name: values.name,
            color: values.color,
          },
        });
      } else {
        createWallet({
          variables: {
            name: values.name,
            color: values.color,
            amount: values.amount,
          },
        });
      }
    },
    [createWallet, updateWallet, wallet]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: wallet?.name ?? "",
        color: wallet?.color ?? "#DE60D4",
        amount: wallet?.amount ?? null,
      }}
      validationSchema={schema}
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
            {!wallet && (
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
            )}
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
                  {wallet ? t("Edit") : t("Add")}
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
