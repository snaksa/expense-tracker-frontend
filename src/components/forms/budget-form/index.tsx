import React from "react";
import { useCategoriesQuery, useLabelsQuery, Budget } from "api";
import BudgetForm from "./form";

interface Props {
  budget?: Budget;
  onComplete: Function;
  onError: Function;
}

const BudgetFormWrapper = ({
  budget,
  onComplete,
  onError,
}: Props) => {

  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  const { data: labelsData } = useLabelsQuery();
  const labels: any = labelsData?.labels ?? [];

  return (
    <BudgetForm
      budget={budget}
      categories={categories}
      labels={labels}
      onComplete={onComplete}
      onError={onError}
    />
  );
};

export default BudgetFormWrapper;
