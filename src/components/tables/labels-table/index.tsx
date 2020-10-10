import React, { useState, useCallback } from "react";
import { Box } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  Label, 
  useDeleteLabelMutation, 
  LabelsDocument, 
  LabelsQuery
} from "api";
import useTranslations from "translations";
import { useNotificationContext } from "services/notification-provider";
import Table from "components/core/table";
import ConfirmationDialog from "components/core/confirmation-dialog";
import Modal from "components/core/modal";
import LabelForm from "components/forms/label-form";

interface Props {
  labels: Label[];
  onClick: Function;
  onEdit?: Function;
  onDelete?: Function;
}

const LabelsTable = ({ labels, onClick, onEdit, onDelete }: Props) => {
  const { t } = useTranslations();
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const openEditModal = useCallback(() => {
    setEditModalIsOpen(true);
  }, []);
  const hideEditModal = useCallback(() => {
    setEditModalIsOpen(false);
  }, []);

  const showConfirm = useCallback(() => {
    setConfirmDeleteModalIsOpen(true);
  }, []);
  const hideConfirm = useCallback(() => {
    setConfirmDeleteModalIsOpen(false);
  }, []);

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const [deleteLabel] = useDeleteLabelMutation({
    onCompleted() {
      if (onDelete) {
        onDelete();
      }
      showSuccessNotification(t("Label deleted successfully!"));
    },
    onError() {
      showErrorNotification(t("An error occured while deleting the label!"));
    },
    update: (store, { data }) => {
      const label = data?.deleteLabel;

      if (!label) {
        return;
      }

      const query = {
        query: LabelsDocument,
      };

      const cached = store.readQuery<LabelsQuery>(query);
      if (!cached || !cached.labels) {
        return;
      }

      const result = cached.labels.filter((l) => l && l.id !== label.id);
      store.writeQuery({
        ...query,
        data: {
          labels: result,
        },
      });
    },
  });

  const handleDelete = useCallback(() => {
    hideConfirm();
    deleteLabel({
      variables: {
        id: selectedRow,
      },
    });
  }, [deleteLabel, hideConfirm, selectedRow]);

  const handleAction = useCallback((action: string, id: number) => {
    if (action === "delete") {
      setSelectedRow(id);
      showConfirm();
    }
    if (action === "edit") {
      setSelectedRow(id);
      setEditModalIsOpen(true);
    }
  }, [setSelectedRow, showConfirm, setEditModalIsOpen]);

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
    setEditModalIsOpen(false);
    if (onEdit) {
      onEdit();
    }
  }, [onEdit]);

  return (
    <Box>
      <Table
        title={t("Labels")}
        rows={labels}
        columns={columns}
        onClick={onClick}
        onAction={handleAction}
      />
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={t("Are you sure?")}
        onConfirm={handleDelete}
        onCancel={hideConfirm}
      />
      <Modal
        title={t("# Edit Label")}
        isOpen={editModalIsOpen}
        handleClose={openEditModal}
      >
        <LabelForm
          label={
            selectedRow
              ? labels.filter(
                  (label: Label) => label.id === selectedRow
                )[0]
              : undefined
          }
          onComplete={onComplete}
          onError={hideEditModal}
        />
      </Modal>
    </Box>
  );
};

export default LabelsTable;
