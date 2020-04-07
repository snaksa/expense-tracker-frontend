import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
}

export interface AreaChart {
   __typename?: 'AreaChart';
  header: Array<Maybe<Scalars['String']>>;
  data: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  colors: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface Category {
   __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  color: Scalars['String'];
  icon: Maybe<Scalars['Int']>;
  user: Maybe<User>;
  transactions: Maybe<Array<Maybe<Transaction>>>;
  transactionsCount: Maybe<Scalars['Int']>;
  balance: Maybe<Scalars['Float']>;
}

export interface CategoryCreateRequestInput {
  name: Scalars['String'];
  color: Scalars['String'];
}

export interface CategoryDeleteRequestInput {
  id: Scalars['Int'];
}

export interface CategoryRecordsRequestInput {
  walletIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  categoryIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  type: Maybe<TransactionType>;
  date: Maybe<Scalars['String']>;
}

export interface CategoryUpdateRequestInput {
  id: Scalars['Int'];
  name: Maybe<Scalars['String']>;
  color: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['Int']>;
}

export interface Currency {
   __typename?: 'Currency';
  id: Scalars['String'];
  value: Scalars['String'];
}


export interface Mutation {
   __typename?: 'Mutation';
  registerUser: Maybe<User>;
  loginUser: Maybe<Scalars['String']>;
  updateUser: Maybe<User>;
  createTransaction: Maybe<Transaction>;
  updateTransaction: Maybe<Transaction>;
  deleteTransaction: Maybe<Transaction>;
  createWallet: Maybe<Wallet>;
  updateWallet: Maybe<Wallet>;
  deleteWallet: Maybe<Wallet>;
  createCategory: Maybe<Category>;
  updateCategory: Maybe<Category>;
  deleteCategory: Maybe<Category>;
}


export interface MutationRegisterUserArgs {
  input: UserRegisterRequestInput;
}


export interface MutationLoginUserArgs {
  input: UserLoginRequestInput;
}


export interface MutationUpdateUserArgs {
  input: UserUpdateRequestInput;
}


export interface MutationCreateTransactionArgs {
  input: TransactionCreateRequestInput;
}


export interface MutationUpdateTransactionArgs {
  input: TransactionUpdateRequestInput;
}


export interface MutationDeleteTransactionArgs {
  input: TransactionDeleteRequestInput;
}


export interface MutationCreateWalletArgs {
  input: WalletCreateRequestInput;
}


export interface MutationUpdateWalletArgs {
  input: WalletUpdateRequestInput;
}


export interface MutationDeleteWalletArgs {
  input: WalletDeleteRequestInput;
}


export interface MutationCreateCategoryArgs {
  input: CategoryCreateRequestInput;
}


export interface MutationUpdateCategoryArgs {
  input: CategoryUpdateRequestInput;
}


export interface MutationDeleteCategoryArgs {
  input: CategoryDeleteRequestInput;
}

export interface Query {
   __typename?: 'Query';
  users: Maybe<Array<Maybe<User>>>;
  me: Maybe<User>;
  transactionSpendingFlow: Maybe<AreaChart>;
  categoriesSpendingFlow: Maybe<AreaChart>;
  categoriesSpendingPieChart: Maybe<AreaChart>;
  transactions: Maybe<TransactionsPaginatedResult>;
  transaction: Maybe<Transaction>;
  wallets: Maybe<Array<Maybe<Wallet>>>;
  wallet: Maybe<Wallet>;
  categories: Maybe<Array<Maybe<Category>>>;
  category: Maybe<Category>;
  currencies: Maybe<Array<Maybe<Currency>>>;
}


export interface QueryTransactionSpendingFlowArgs {
  input: TransactionRecordsRequestInput;
}


export interface QueryCategoriesSpendingFlowArgs {
  input: CategoryRecordsRequestInput;
}


export interface QueryCategoriesSpendingPieChartArgs {
  input: CategoryRecordsRequestInput;
}


export interface QueryTransactionsArgs {
  input: TransactionRecordsRequestInput;
}


export interface QueryTransactionArgs {
  id: Scalars['Int'];
}


export interface QueryWalletArgs {
  id: Scalars['Int'];
}


export interface QueryCategoryArgs {
  id: Scalars['Int'];
}

export interface Transaction {
   __typename?: 'Transaction';
  id: Scalars['Int'];
  description: Scalars['String'];
  value: Scalars['Float'];
  type: TransactionType;
  date: Maybe<Scalars['DateTime']>;
  wallet: Maybe<Wallet>;
  walletReceiver: Maybe<Wallet>;
  category: Maybe<Category>;
}

export interface TransactionCreateRequestInput {
  date: Scalars['String'];
  description: Scalars['String'];
  value: Scalars['Float'];
  type: TransactionType;
  categoryId: Maybe<Scalars['Int']>;
  walletId: Scalars['Int'];
  walletReceiverId: Maybe<Scalars['Int']>;
}

export interface TransactionDeleteRequestInput {
  id: Scalars['Int'];
}

export interface TransactionRecordsRequestInput {
  walletIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  categoryIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  date: Maybe<Scalars['String']>;
  limit: Maybe<Scalars['Int']>;
  page: Maybe<Scalars['Int']>;
  unlimited: Maybe<Scalars['Boolean']>;
}

export interface TransactionsPaginatedResult {
   __typename?: 'TransactionsPaginatedResult';
  data: Array<Maybe<Transaction>>;
  currentPage: Scalars['Int'];
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPrevPage: Scalars['Boolean'];
}

export enum TransactionType {
  Income = 'INCOME',
  Expense = 'EXPENSE',
  Transfer = 'TRANSFER'
}

export interface TransactionUpdateRequestInput {
  date: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  description: Maybe<Scalars['String']>;
  value: Maybe<Scalars['Float']>;
  type: Maybe<TransactionType>;
  categoryId: Maybe<Scalars['Int']>;
  walletId: Maybe<Scalars['Int']>;
  walletReceiverId: Maybe<Scalars['Int']>;
}

export interface User {
   __typename?: 'User';
  id: Scalars['Int'];
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  email: Scalars['String'];
  currency: Maybe<Scalars['String']>;
  language: Maybe<Scalars['String']>;
  categories: Maybe<Array<Maybe<Category>>>;
  wallets: Maybe<Array<Maybe<Wallet>>>;
}

export interface UserLoginRequestInput {
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface UserRegisterRequestInput {
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}

export interface UserUpdateRequestInput {
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  language: Maybe<Scalars['String']>;
}

export interface Wallet {
   __typename?: 'Wallet';
  id: Scalars['Int'];
  name: Scalars['String'];
  color: Scalars['String'];
  amount: Scalars['Float'];
  initial_amount: Scalars['Float'];
  user: Maybe<User>;
  transactions: Maybe<Array<Maybe<Transaction>>>;
  transferInTransactions: Maybe<Array<Maybe<Transaction>>>;
}

export interface WalletCreateRequestInput {
  name: Scalars['String'];
  color: Scalars['String'];
  amount: Maybe<Scalars['Float']>;
}

export interface WalletDeleteRequestInput {
  id: Scalars['Int'];
}

export interface WalletUpdateRequestInput {
  id: Scalars['Int'];
  name: Maybe<Scalars['String']>;
  color: Maybe<Scalars['String']>;
}

export type CreateCategoryMutationVariables = {
  name: Scalars['String'];
  color: Scalars['String'];
};


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'color' | 'name' | 'icon' | 'transactionsCount' | 'balance'>
    & { transactions: Maybe<Array<Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'value' | 'type' | 'date'>
    )>>> }
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginUser'>
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'currency' | 'language'>
  )> }
);

export type RegisterMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type CreateTransactionMutationVariables = {
  date: Scalars['String'];
  description: Scalars['String'];
  value: Scalars['Float'];
  type: TransactionType;
  categoryId: Maybe<Scalars['Int']>;
  walletId: Scalars['Int'];
  walletReceiverId: Maybe<Scalars['Int']>;
};


export type CreateTransactionMutation = (
  { __typename?: 'Mutation' }
  & { createTransaction: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'description' | 'value' | 'type' | 'date'>
    & { wallet: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
    )>, walletReceiver: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
    )>, category: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name' | 'color' | 'balance' | 'transactionsCount'>
      & { transactions: Maybe<Array<Maybe<(
        { __typename?: 'Transaction' }
        & Pick<Transaction, 'id' | 'value' | 'type' | 'date'>
      )>>> }
    )> }
  )> }
);

export type DeleteWalletMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteWalletMutation = (
  { __typename?: 'Mutation' }
  & { deleteWallet: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id'>
  )> }
);

export type UpdateWalletMutationVariables = {
  id: Scalars['Int'];
  name: Maybe<Scalars['String']>;
  color: Maybe<Scalars['String']>;
};


export type UpdateWalletMutation = (
  { __typename?: 'Mutation' }
  & { updateWallet: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
  )> }
);

export type DeleteCategoryMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & { deleteCategory: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id'>
  )> }
);

export type UpdateCategoryMutationVariables = {
  id: Scalars['Int'];
  name: Maybe<Scalars['String']>;
  color: Maybe<Scalars['String']>;
};


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateCategory: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'color' | 'icon' | 'transactionsCount' | 'balance'>
  )> }
);

export type TransactionsQueryVariables = {
  walletIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  categoryIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  page: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  unlimited: Maybe<Scalars['Boolean']>;
  date: Maybe<Scalars['String']>;
};


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Maybe<(
    { __typename?: 'TransactionsPaginatedResult' }
    & Pick<TransactionsPaginatedResult, 'currentPage' | 'totalPages' | 'totalResults' | 'hasNextPage' | 'hasPrevPage'>
    & { data: Array<Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'description' | 'type' | 'value' | 'date'>
      & { wallet: Maybe<(
        { __typename?: 'Wallet' }
        & Pick<Wallet, 'id' | 'name' | 'color'>
      )>, walletReceiver: Maybe<(
        { __typename?: 'Wallet' }
        & Pick<Wallet, 'id' | 'name' | 'color'>
      )>, category: Maybe<(
        { __typename?: 'Category' }
        & Pick<Category, 'id' | 'name' | 'color'>
      )> }
    )>> }
  )> }
);

export type UpdateUserMutationVariables = {
  email: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['String']>;
  language: Maybe<Scalars['String']>;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'currency' | 'language'>
  )> }
);

export type DeleteTransactionMutationVariables = {
  id: Scalars['Int'];
};


export type DeleteTransactionMutation = (
  { __typename?: 'Mutation' }
  & { deleteTransaction: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id'>
    & { wallet: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
    )>, walletReceiver: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
    )>, category: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name' | 'color' | 'balance' | 'transactionsCount'>
    )> }
  )> }
);

export type UpdateTransactionMutationVariables = {
  id: Scalars['Int'];
  date: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  value: Maybe<Scalars['Float']>;
  type: Maybe<TransactionType>;
  categoryId: Maybe<Scalars['Int']>;
  walletId: Maybe<Scalars['Int']>;
  walletReceiverId: Maybe<Scalars['Int']>;
};


export type UpdateTransactionMutation = (
  { __typename?: 'Mutation' }
  & { updateTransaction: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'description' | 'value' | 'type' | 'date'>
    & { wallet: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
    )>, walletReceiver: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
    )>, category: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name' | 'color' | 'balance' | 'transactionsCount'>
    )> }
  )> }
);

export type CreateWalletMutationVariables = {
  name: Scalars['String'];
  amount: Maybe<Scalars['Float']>;
  color: Scalars['String'];
};


export type CreateWalletMutation = (
  { __typename?: 'Mutation' }
  & { createWallet: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
  )> }
);

export type WalletsQueryVariables = {};


export type WalletsQuery = (
  { __typename?: 'Query' }
  & { wallets: Maybe<Array<Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'color' | 'amount'>
  )>>> }
);

export type CategoriesQueryVariables = {};


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Maybe<Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'color' | 'transactionsCount' | 'balance'>
    & { transactions: Maybe<Array<Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'value' | 'type' | 'date'>
    )>>> }
  )>>> }
);

export type CategoriesSpendingFlowQueryVariables = {
  date: Maybe<Scalars['String']>;
  walletIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  categoryIds: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type CategoriesSpendingFlowQuery = (
  { __typename?: 'Query' }
  & { categoriesSpendingFlow: Maybe<(
    { __typename?: 'AreaChart' }
    & Pick<AreaChart, 'header' | 'data' | 'colors'>
  )> }
);

export type CategoriesSpendingPieQueryVariables = {
  date: Maybe<Scalars['String']>;
  walletIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  categoryIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  type: Maybe<TransactionType>;
};


export type CategoriesSpendingPieQuery = (
  { __typename?: 'Query' }
  & { categoriesSpendingPieChart: Maybe<(
    { __typename?: 'AreaChart' }
    & Pick<AreaChart, 'header' | 'data' | 'colors'>
  )> }
);

export type CurrenciesQueryVariables = {};


export type CurrenciesQuery = (
  { __typename?: 'Query' }
  & { currencies: Maybe<Array<Maybe<(
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'value'>
  )>>> }
);

export type TransactionSpendingFlowQueryVariables = {
  date: Maybe<Scalars['String']>;
  walletIds: Maybe<Array<Maybe<Scalars['Int']>>>;
  categoryIds: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type TransactionSpendingFlowQuery = (
  { __typename?: 'Query' }
  & { transactionSpendingFlow: Maybe<(
    { __typename?: 'AreaChart' }
    & Pick<AreaChart, 'header' | 'data'>
  )> }
);


export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!, $color: String!) {
  createCategory(input: {name: $name, color: $color}) {
    id
    color
    name
    icon
    transactionsCount
    balance
    transactions {
      id
      value
      type
      date
    }
  }
}
    `;
export type CreateCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, baseOptions);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = ApolloReactCommon.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  loginUser(input: {email: $email, password: $password})
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  me {
    id
    email
    firstName
    lastName
    currency
    language
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $confirmPassword: String!) {
  registerUser(input: {email: $email, password: $password, confirmPassword: $confirmPassword}) {
    id
    email
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($date: String!, $description: String!, $value: Float!, $type: TransactionType!, $categoryId: Int, $walletId: Int!, $walletReceiverId: Int) {
  createTransaction(input: {date: $date, description: $description, value: $value, type: $type, categoryId: $categoryId, walletId: $walletId, walletReceiverId: $walletReceiverId}) {
    id
    description
    value
    type
    date
    wallet {
      id
      name
      color
      amount
    }
    walletReceiver {
      id
      name
      color
      amount
    }
    category {
      id
      name
      color
      balance
      transactionsCount
      transactions {
        id
        value
        type
        date
      }
    }
  }
}
    `;
export type CreateTransactionMutationFn = ApolloReactCommon.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      date: // value for 'date'
 *      description: // value for 'description'
 *      value: // value for 'value'
 *      type: // value for 'type'
 *      categoryId: // value for 'categoryId'
 *      walletId: // value for 'walletId'
 *      walletReceiverId: // value for 'walletReceiverId'
 *   },
 * });
 */
export function useCreateTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, baseOptions);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = ApolloReactCommon.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const DeleteWalletDocument = gql`
    mutation DeleteWallet($id: Int!) {
  deleteWallet(input: {id: $id}) {
    id
  }
}
    `;
export type DeleteWalletMutationFn = ApolloReactCommon.MutationFunction<DeleteWalletMutation, DeleteWalletMutationVariables>;

/**
 * __useDeleteWalletMutation__
 *
 * To run a mutation, you first call `useDeleteWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWalletMutation, { data, loading, error }] = useDeleteWalletMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWalletMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteWalletMutation, DeleteWalletMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteWalletMutation, DeleteWalletMutationVariables>(DeleteWalletDocument, baseOptions);
      }
export type DeleteWalletMutationHookResult = ReturnType<typeof useDeleteWalletMutation>;
export type DeleteWalletMutationResult = ApolloReactCommon.MutationResult<DeleteWalletMutation>;
export type DeleteWalletMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteWalletMutation, DeleteWalletMutationVariables>;
export const UpdateWalletDocument = gql`
    mutation UpdateWallet($id: Int!, $name: String, $color: String) {
  updateWallet(input: {id: $id, name: $name, color: $color}) {
    id
    name
    color
    amount
  }
}
    `;
export type UpdateWalletMutationFn = ApolloReactCommon.MutationFunction<UpdateWalletMutation, UpdateWalletMutationVariables>;

/**
 * __useUpdateWalletMutation__
 *
 * To run a mutation, you first call `useUpdateWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWalletMutation, { data, loading, error }] = useUpdateWalletMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useUpdateWalletMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWalletMutation, UpdateWalletMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateWalletMutation, UpdateWalletMutationVariables>(UpdateWalletDocument, baseOptions);
      }
export type UpdateWalletMutationHookResult = ReturnType<typeof useUpdateWalletMutation>;
export type UpdateWalletMutationResult = ApolloReactCommon.MutationResult<UpdateWalletMutation>;
export type UpdateWalletMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateWalletMutation, UpdateWalletMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: Int!) {
  deleteCategory(input: {id: $id}) {
    id
  }
}
    `;
export type DeleteCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, baseOptions);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: Int!, $name: String, $color: String) {
  updateCategory(input: {id: $id, name: $name, color: $color}) {
    id
    name
    color
    icon
    transactionsCount
    balance
  }
}
    `;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, baseOptions);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const TransactionsDocument = gql`
    query Transactions($walletIds: [Int], $categoryIds: [Int], $page: Int, $limit: Int, $unlimited: Boolean, $date: String) {
  transactions(input: {walletIds: $walletIds, categoryIds: $categoryIds, page: $page, limit: $limit, unlimited: $unlimited, date: $date}) {
    data {
      id
      description
      type
      value
      date
      wallet {
        id
        name
        color
      }
      walletReceiver {
        id
        name
        color
      }
      category {
        id
        name
        color
      }
    }
    currentPage
    totalPages
    totalResults
    hasNextPage
    hasPrevPage
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      walletIds: // value for 'walletIds'
 *      categoryIds: // value for 'categoryIds'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      unlimited: // value for 'unlimited'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
      }
export function useTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = ApolloReactCommon.QueryResult<TransactionsQuery, TransactionsQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($email: String, $firstName: String, $lastName: String, $currency: String, $language: String) {
  updateUser(input: {email: $email, firstName: $firstName, lastName: $lastName, currency: $currency, language: $language}) {
    id
    email
    firstName
    lastName
    currency
    language
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      currency: // value for 'currency'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteTransactionDocument = gql`
    mutation DeleteTransaction($id: Int!) {
  deleteTransaction(input: {id: $id}) {
    id
    wallet {
      id
      name
      color
      amount
    }
    walletReceiver {
      id
      name
      color
      amount
    }
    category {
      id
      name
      color
      balance
      transactionsCount
    }
  }
}
    `;
export type DeleteTransactionMutationFn = ApolloReactCommon.MutationFunction<DeleteTransactionMutation, DeleteTransactionMutationVariables>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument, baseOptions);
      }
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = ApolloReactCommon.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const UpdateTransactionDocument = gql`
    mutation UpdateTransaction($id: Int!, $date: String, $description: String, $value: Float, $type: TransactionType, $categoryId: Int, $walletId: Int, $walletReceiverId: Int) {
  updateTransaction(input: {id: $id, date: $date, description: $description, value: $value, type: $type, categoryId: $categoryId, walletId: $walletId, walletReceiverId: $walletReceiverId}) {
    id
    description
    value
    type
    date
    wallet {
      id
      name
      color
      amount
    }
    walletReceiver {
      id
      name
      color
      amount
    }
    category {
      id
      name
      color
      balance
      transactionsCount
    }
  }
}
    `;
export type UpdateTransactionMutationFn = ApolloReactCommon.MutationFunction<UpdateTransactionMutation, UpdateTransactionMutationVariables>;

/**
 * __useUpdateTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionMutation, { data, loading, error }] = useUpdateTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      date: // value for 'date'
 *      description: // value for 'description'
 *      value: // value for 'value'
 *      type: // value for 'type'
 *      categoryId: // value for 'categoryId'
 *      walletId: // value for 'walletId'
 *      walletReceiverId: // value for 'walletReceiverId'
 *   },
 * });
 */
export function useUpdateTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTransactionMutation, UpdateTransactionMutationVariables>(UpdateTransactionDocument, baseOptions);
      }
export type UpdateTransactionMutationHookResult = ReturnType<typeof useUpdateTransactionMutation>;
export type UpdateTransactionMutationResult = ApolloReactCommon.MutationResult<UpdateTransactionMutation>;
export type UpdateTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
export const CreateWalletDocument = gql`
    mutation CreateWallet($name: String!, $amount: Float, $color: String!) {
  createWallet(input: {name: $name, amount: $amount, color: $color}) {
    id
    name
    color
    amount
  }
}
    `;
export type CreateWalletMutationFn = ApolloReactCommon.MutationFunction<CreateWalletMutation, CreateWalletMutationVariables>;

/**
 * __useCreateWalletMutation__
 *
 * To run a mutation, you first call `useCreateWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWalletMutation, { data, loading, error }] = useCreateWalletMutation({
 *   variables: {
 *      name: // value for 'name'
 *      amount: // value for 'amount'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreateWalletMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateWalletMutation, CreateWalletMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateWalletMutation, CreateWalletMutationVariables>(CreateWalletDocument, baseOptions);
      }
export type CreateWalletMutationHookResult = ReturnType<typeof useCreateWalletMutation>;
export type CreateWalletMutationResult = ApolloReactCommon.MutationResult<CreateWalletMutation>;
export type CreateWalletMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateWalletMutation, CreateWalletMutationVariables>;
export const WalletsDocument = gql`
    query Wallets {
  wallets {
    id
    name
    color
    amount
  }
}
    `;

/**
 * __useWalletsQuery__
 *
 * To run a query within a React component, call `useWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletsQuery({
 *   variables: {
 *   },
 * });
 */
export function useWalletsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WalletsQuery, WalletsQueryVariables>) {
        return ApolloReactHooks.useQuery<WalletsQuery, WalletsQueryVariables>(WalletsDocument, baseOptions);
      }
export function useWalletsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WalletsQuery, WalletsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WalletsQuery, WalletsQueryVariables>(WalletsDocument, baseOptions);
        }
export type WalletsQueryHookResult = ReturnType<typeof useWalletsQuery>;
export type WalletsLazyQueryHookResult = ReturnType<typeof useWalletsLazyQuery>;
export type WalletsQueryResult = ApolloReactCommon.QueryResult<WalletsQuery, WalletsQueryVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    name
    color
    transactionsCount
    balance
    transactions {
      id
      value
      type
      date
    }
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoriesSpendingFlowDocument = gql`
    query CategoriesSpendingFlow($date: String, $walletIds: [Int], $categoryIds: [Int]) {
  categoriesSpendingFlow(input: {date: $date, walletIds: $walletIds, categoryIds: $categoryIds}) {
    header
    data
    colors
  }
}
    `;

/**
 * __useCategoriesSpendingFlowQuery__
 *
 * To run a query within a React component, call `useCategoriesSpendingFlowQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesSpendingFlowQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesSpendingFlowQuery({
 *   variables: {
 *      date: // value for 'date'
 *      walletIds: // value for 'walletIds'
 *      categoryIds: // value for 'categoryIds'
 *   },
 * });
 */
export function useCategoriesSpendingFlowQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesSpendingFlowQuery, CategoriesSpendingFlowQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesSpendingFlowQuery, CategoriesSpendingFlowQueryVariables>(CategoriesSpendingFlowDocument, baseOptions);
      }
export function useCategoriesSpendingFlowLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesSpendingFlowQuery, CategoriesSpendingFlowQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesSpendingFlowQuery, CategoriesSpendingFlowQueryVariables>(CategoriesSpendingFlowDocument, baseOptions);
        }
export type CategoriesSpendingFlowQueryHookResult = ReturnType<typeof useCategoriesSpendingFlowQuery>;
export type CategoriesSpendingFlowLazyQueryHookResult = ReturnType<typeof useCategoriesSpendingFlowLazyQuery>;
export type CategoriesSpendingFlowQueryResult = ApolloReactCommon.QueryResult<CategoriesSpendingFlowQuery, CategoriesSpendingFlowQueryVariables>;
export const CategoriesSpendingPieDocument = gql`
    query CategoriesSpendingPie($date: String, $walletIds: [Int], $categoryIds: [Int], $type: TransactionType) {
  categoriesSpendingPieChart(input: {date: $date, walletIds: $walletIds, categoryIds: $categoryIds, type: $type}) {
    header
    data
    colors
  }
}
    `;

/**
 * __useCategoriesSpendingPieQuery__
 *
 * To run a query within a React component, call `useCategoriesSpendingPieQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesSpendingPieQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesSpendingPieQuery({
 *   variables: {
 *      date: // value for 'date'
 *      walletIds: // value for 'walletIds'
 *      categoryIds: // value for 'categoryIds'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCategoriesSpendingPieQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesSpendingPieQuery, CategoriesSpendingPieQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesSpendingPieQuery, CategoriesSpendingPieQueryVariables>(CategoriesSpendingPieDocument, baseOptions);
      }
export function useCategoriesSpendingPieLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesSpendingPieQuery, CategoriesSpendingPieQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesSpendingPieQuery, CategoriesSpendingPieQueryVariables>(CategoriesSpendingPieDocument, baseOptions);
        }
export type CategoriesSpendingPieQueryHookResult = ReturnType<typeof useCategoriesSpendingPieQuery>;
export type CategoriesSpendingPieLazyQueryHookResult = ReturnType<typeof useCategoriesSpendingPieLazyQuery>;
export type CategoriesSpendingPieQueryResult = ApolloReactCommon.QueryResult<CategoriesSpendingPieQuery, CategoriesSpendingPieQueryVariables>;
export const CurrenciesDocument = gql`
    query Currencies {
  currencies {
    id
    value
  }
}
    `;

/**
 * __useCurrenciesQuery__
 *
 * To run a query within a React component, call `useCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrenciesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, baseOptions);
      }
export function useCurrenciesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, baseOptions);
        }
export type CurrenciesQueryHookResult = ReturnType<typeof useCurrenciesQuery>;
export type CurrenciesLazyQueryHookResult = ReturnType<typeof useCurrenciesLazyQuery>;
export type CurrenciesQueryResult = ApolloReactCommon.QueryResult<CurrenciesQuery, CurrenciesQueryVariables>;
export const TransactionSpendingFlowDocument = gql`
    query TransactionSpendingFlow($date: String, $walletIds: [Int], $categoryIds: [Int]) {
  transactionSpendingFlow(input: {date: $date, walletIds: $walletIds, categoryIds: $categoryIds}) {
    header
    data
  }
}
    `;

/**
 * __useTransactionSpendingFlowQuery__
 *
 * To run a query within a React component, call `useTransactionSpendingFlowQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionSpendingFlowQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionSpendingFlowQuery({
 *   variables: {
 *      date: // value for 'date'
 *      walletIds: // value for 'walletIds'
 *      categoryIds: // value for 'categoryIds'
 *   },
 * });
 */
export function useTransactionSpendingFlowQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TransactionSpendingFlowQuery, TransactionSpendingFlowQueryVariables>) {
        return ApolloReactHooks.useQuery<TransactionSpendingFlowQuery, TransactionSpendingFlowQueryVariables>(TransactionSpendingFlowDocument, baseOptions);
      }
export function useTransactionSpendingFlowLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TransactionSpendingFlowQuery, TransactionSpendingFlowQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TransactionSpendingFlowQuery, TransactionSpendingFlowQueryVariables>(TransactionSpendingFlowDocument, baseOptions);
        }
export type TransactionSpendingFlowQueryHookResult = ReturnType<typeof useTransactionSpendingFlowQuery>;
export type TransactionSpendingFlowLazyQueryHookResult = ReturnType<typeof useTransactionSpendingFlowLazyQuery>;
export type TransactionSpendingFlowQueryResult = ApolloReactCommon.QueryResult<TransactionSpendingFlowQuery, TransactionSpendingFlowQueryVariables>;