import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import useStyles from "./styles";
import { useCategoriesQuery } from "api";
import CategoriesTable from "components/organisms/categories-table";
import Modal from "components/molecules/modal";
import CategoryForm from "components/organisms/category-form";

const CategoriesPage = () => {
  const classes = useStyles();

  const { data } = useCategoriesQuery({fetchPolicy: 'network-only'});
  const categories: any = data?.categories ?? [];

  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);

  return (
    <Box className={classes.main} p={10}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <CategoriesTable
            categories={categories}
            onClick={() => setNewCategoryModalIsOpen(true)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}></Grid>
      </Grid>
      <Modal
        title={"+ New Category"}
        isOpen={newCategoryModalIsOpen}
        handleClose={() => {
          setNewCategoryModalIsOpen(false);
        }}
      >
        <CategoryForm
          onComplete={() => setNewCategoryModalIsOpen(false)}
          onError={() => setNewCategoryModalIsOpen(false)}
        />
      </Modal>
    </Box>
  );
};

CategoriesPage.fragment = gql`
  query Categories {
    categories {
      id
      name
      color,
      transactionsCount,
      balance
    }
  }
`;

export default CategoriesPage;
