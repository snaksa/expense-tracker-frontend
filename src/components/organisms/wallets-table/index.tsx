import React, { useState } from "react";
import { Box } from "@material-ui/core";
import {
  WalletsDocument,
  TransactionsDocument,
  WalletsQuery,
  useDeleteWalletMutation,
  Wallet
} from "api";
import Table from "../table";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import { useNotificationContext } from "services/notification-provider";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import Modal from "components/molecules/modal";
import { useSharedDataContext } from "services/shared-data-provider";
import WalletForm from "../wallet-form";
import { useUpdateDetectionContext } from "services/update-detection-provider";

interface Props {
  wallets: Wallet[];
  onClick: Function;
  onEdit: Function;
  onDelete: Function;
}

const WalletsTable = ({ wallets, onClick, onEdit, onDelete }: Props) => {
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const {setWalletUpdate} = useUpdateDetectionContext();

  const {
    usedTranasctionParams
  } = useSharedDataContext();

  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const getRefetchQueries = () => {
    const result: any = [];
    for (let params of usedTranasctionParams) {
      result.push({
        query: TransactionsDocument,
        variables: params
      });
    }

    return result;
  };

  const [deleteWallet] = useDeleteWalletMutation({
    onCompleted() {
      onDelete();
      setWalletUpdate();
      showSuccessNotification("Wallet deleted successfully!");
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

      const result = cached.wallets.filter(c => c && c.id !== wallet.id);
      store.writeQuery({
        ...query,
        data: {
          wallets: result
        }
      });

      
    },
    refetchQueries: getRefetchQueries()
  });

  const handleDelete = () => {
    setConfirmDeleteModalIsOpen(false);
    deleteWallet({
      variables: {
        id: selectedRow
      }
    });
  };

  const handleAction = (action: string, id: number) => {
    if (action === "delete") {
      setSelectedRow(id);
      setConfirmDeleteModalIsOpen(true);
    }
    if (action === "edit") {
      setSelectedRow(id);
      setEditModalIsOpen(true);
    }
  };

  return (
    <Box>
      <Table
        title="Wallets"
        rows={wallets}
        columns={columns}
        onClick={onClick}
        onAction={handleAction}
      />
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={"Are you sure?"}
        content={"All transactions related to this wallet will be removed!"}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteModalIsOpen(false)}
      />
      <Modal
        title={"+ Edit Wallet"}
        isOpen={editModalIsOpen}
        handleClose={() => {
          setEditModalIsOpen(false);
        }}
      >
        <WalletForm
          wallet={
            selectedRow
              ? wallets.filter(
                  (wallet: Wallet) => wallet.id === selectedRow
                )[0]
              : undefined
          }
          onComplete={() => {
            setEditModalIsOpen(false);
            onEdit();
          }}
          onError={() => setEditModalIsOpen(false)}
        />
      </Modal>
    </Box>
  );
};

const columns = [
  {
    type: "color",
    id: "color",
    label: "Color",
    minWidth: 100,
    align: "center"
  },
  {
    type: "text",
    id: "name",
    label: "Name",
    minWidth: 100,
    align: "left"
  },
  {
    type: "actions",
    id: "id",
    actions: [
      {
        id: "edit",
        icon: <EditIcon />
      },
      {
        id: "delete",
        icon: <DeleteIcon />
      }
    ]
  }
];

export default WalletsTable;
