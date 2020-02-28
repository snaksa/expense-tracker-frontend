import { useCurrentUserQuery } from "api";

const useCurrencyFormatter = () => {
  const { data: userData } = useCurrentUserQuery();
  const user: any = userData?.me ?? [];
  const currency: string = user.currency ?? "";

  const formatCurrency = (value: number) => {
    return `${value.toFixed(2)} ${currency}`;
  };

  const getCurrency = () => currency;

  return { formatCurrency, getCurrency };
};

export default useCurrencyFormatter;
