import React from "react";
import { Transaction } from "../../../api";
import Table from "../table";

interface Props {
  transactions: Transaction[];
}

const TransactionsTable = ({
  transactions,
}: Props) => {
  return (
    <Table
      title="Records"
      rows={transactions}
      columns={columns}
    />
  );
};

const columns = [
  {
    type: "text",
    id: "description",
    label: "Description",
    minWidth: 100,
    align: "left"
  },
  {
    type: "number",
    id: "value",
    label: "Amount",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toFixed(2)
  },
  {
    type: "colorName",
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "left"
  },
  {
    type: "icon",
    id: "type",
    label: "Type",
    minWidth: 100,
    align: "center"
  },
  {
    type: "colorName",
    id: "wallet",
    label: "Wallet",
    minWidth: 100,
    align: "left"
  },
  {
    type: "text",
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "left"
  }
];

export default TransactionsTable;