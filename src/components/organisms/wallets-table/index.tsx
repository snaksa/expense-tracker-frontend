import React, { useState, useCallback } from "react";
import { Box } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  WalletsDocument,
  TransactionsDocument,
  WalletsQuery,
  useDeleteWalletMutation,
  Wallet,
} from "api";
import useTranslations from "translations";
import { useNotificationContext } from "services/notification-provider";
import { useSharedDataContext } from "services/shared-data-provider";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import Table from "components/organisms/table";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import Modal from "components/molecules/modal";
import WalletForm from "components/molecules/forms/wallet-form";

interface Props {
  wallets: Wallet[];
  onClick: Function;
  onEdit?: Function;
  onDelete?: Function;
}

const WalletsTable = ({ wallets, onClick, onEdit, onDelete }: Props) => {
  const { t } = useTranslations();
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const showEditModal = useCallback(() => setEditModalIsOpen(true), []);
  const hideEditModal = useCallback(() => setEditModalIsOpen(false), []);

  const { setWalletUpdate } = useUpdateDetectionContext();

  const { usedTranasctionParams } = useSharedDataContext();

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const getRefetchQueries = () => {
    const result: any = [];
    for (let params of usedTranasctionParams) {
      result.push({
        query: TransactionsDocument,
        variables: params,
      });
    }

    return result;
  };

  const [deleteWallet] = useDeleteWalletMutation({
    onCompleted() {
      if (onDelete) {
        onDelete();
      }

      setWalletUpdate();
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

      const result = cached.wallets.filter((c) => c && c.id !== wallet.id);
      store.writeQuery({
        ...query,
        data: {
          wallets: result,
        },
      });
    },
    refetchQueries: getRefetchQueries(),
  });

  const handleDelete = useCallback(() => {
    setConfirmDeleteModalIsOpen(false);
    deleteWallet({
      variables: {
        id: selectedRow,
      },
    });
  }, [deleteWallet, setConfirmDeleteModalIsOpen, selectedRow]);

  const handleAction = useCallback((action: string, id: number) => {
    if (action === "delete") {
      setSelectedRow(id);
      setConfirmDeleteModalIsOpen(true);
    }
    if (action === "edit") {
      setSelectedRow(id);
      showEditModal();
    }
  }, [setSelectedRow, showEditModal]);

  const columns = [
    {
      type: "color",
      id: "color",
      label: t("Color"),
      minWidth: 100,
      align: "center",
    },
    {
      type: "text",
      id: "name",
      label: t("Name"),
      minWidth: 100,
      align: "left",
    },
    {
      type: "actions",
      id: "id",
      actions: [
        {
          id: "edit",
          icon: <EditIcon />,
        },
        {
          id: "delete",
          icon: <DeleteIcon />,
        },
      ],
    },
  ];

  const onComplete = useCallback(() => {
    hideEditModal();

    if (onEdit) {
      onEdit();
    }
  }, [onEdit, hideEditModal]);

  return (
    <Box>
      <Table
        title={t("Wallets")}
        rows={wallets}
        columns={columns}
        onClick={onClick}
        onAction={handleAction}
      />
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={t("Are you sure?")}
        content={t("All transactions related to this wallet will be removed!")}
        onConfirm={handleDelete}
        onCancel={hideEditModal}
      />
      <Modal
        title={t("# Edit Wallet")}
        isOpen={editModalIsOpen}
        handleClose={hideEditModal}
      >
        <WalletForm
          wallet={
            selectedRow
              ? wallets.filter((wallet: Wallet) => wallet.id === selectedRow)[0]
              : undefined
          }
          onComplete={onComplete}
          onError={hideEditModal}
        />
      </Modal>
    </Box>
  );
};

export default WalletsTable;
