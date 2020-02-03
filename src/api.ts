import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
}

export interface Category {
   __typename?: 'Category',
  id: Scalars['Int'],
  name: Scalars['String'],
  color: Scalars['String'],
  icon: Scalars['Int'],
  user: Maybe<User>,
  transactions: Maybe<Array<Maybe<Transaction>>>,
}

export interface CategoryCreateRequestInput {
  name: Scalars['String'],
  color: Scalars['String'],
  icon: Scalars['Int'],
}

export interface CategoryDeleteRequestInput {
  id: Scalars['Int'],
}

export interface CategoryUpdateRequestInput {
  id: Scalars['Int'],
  name: Maybe<Scalars['String']>,
  color: Maybe<Scalars['String']>,
  icon: Maybe<Scalars['Int']>,
}


export interface Mutation {
   __typename?: 'Mutation',
  registerUser: Maybe<User>,
  loginUser: Maybe<Scalars['String']>,
  createTransaction: Maybe<Transaction>,
  updateTransaction: Maybe<Transaction>,
  deleteTransaction: Maybe<Transaction>,
  createWallet: Maybe<Wallet>,
  updateWallet: Maybe<Wallet>,
  deleteWallet: Maybe<Wallet>,
  createCategory: Maybe<Category>,
  updateCategory: Maybe<Category>,
  deleteCategory: Maybe<Category>,
}


export interface MutationRegisterUserArgs {
  input: UserRegisterRequestInput
}


export interface MutationLoginUserArgs {
  input: UserLoginRequestInput
}


export interface MutationCreateTransactionArgs {
  input: TransactionCreateRequestInput
}


export interface MutationUpdateTransactionArgs {
  input: TransactionUpdateRequestInput
}


export interface MutationDeleteTransactionArgs {
  input: TransactionDeleteRequestInput
}


export interface MutationCreateWalletArgs {
  input: WalletCreateRequestInput
}


export interface MutationUpdateWalletArgs {
  input: WalletUpdateRequestInput
}


export interface MutationDeleteWalletArgs {
  input: WalletDeleteRequestInput
}


export interface MutationCreateCategoryArgs {
  input: CategoryCreateRequestInput
}


export interface MutationUpdateCategoryArgs {
  input: CategoryUpdateRequestInput
}


export interface MutationDeleteCategoryArgs {
  input: CategoryDeleteRequestInput
}

export interface Query {
   __typename?: 'Query',
  users: Maybe<Array<Maybe<User>>>,
  me: Maybe<User>,
  transactions: Maybe<Array<Maybe<Transaction>>>,
  transaction: Maybe<Transaction>,
  wallets: Maybe<Array<Maybe<Wallet>>>,
  wallet: Maybe<Wallet>,
  categories: Maybe<Array<Maybe<Category>>>,
  category: Maybe<Category>,
}


export interface QueryTransactionsArgs {
  input: TransactionRecordsRequestInput
}


export interface QueryTransactionArgs {
  id: Scalars['Int']
}


export interface QueryWalletArgs {
  id: Scalars['Int']
}


export interface QueryCategoryArgs {
  id: Scalars['Int']
}

export interface Transaction {
   __typename?: 'Transaction',
  id: Scalars['Int'],
  description: Scalars['String'],
  value: Scalars['Float'],
  type: TransactionType,
  date: Maybe<Scalars['DateTime']>,
  wallet: Maybe<Wallet>,
  category: Maybe<Category>,
}

export interface TransactionCreateRequestInput {
  description: Scalars['String'],
  value: Scalars['Float'],
  type: TransactionType,
  categoryId: Scalars['Int'],
  walletId: Scalars['Int'],
}

export interface TransactionDeleteRequestInput {
  id: Scalars['Int'],
}

export interface TransactionRecordsRequestInput {
  walletIds: Maybe<Array<Maybe<Scalars['Int']>>>,
}

export enum TransactionType {
  Income = 'INCOME',
  Expense = 'EXPENSE'
}

export interface TransactionUpdateRequestInput {
  id: Scalars['Int'],
  description: Maybe<Scalars['String']>,
  value: Maybe<Scalars['Float']>,
  type: Maybe<TransactionType>,
  categoryId: Maybe<Scalars['Int']>,
  walletId: Maybe<Scalars['Int']>,
}

export interface User {
   __typename?: 'User',
  id: Scalars['Int'],
  email: Scalars['String'],
  categories: Maybe<Array<Maybe<Category>>>,
  wallets: Maybe<Array<Maybe<Wallet>>>,
}

export interface UserLoginRequestInput {
  email: Scalars['String'],
  password: Scalars['String'],
}

export interface UserRegisterRequestInput {
  email: Scalars['String'],
  password: Scalars['String'],
  confirmPassword: Scalars['String'],
}

export interface Wallet {
   __typename?: 'Wallet',
  id: Scalars['Int'],
  name: Scalars['String'],
  color: Scalars['String'],
  amount: Scalars['Float'],
  user: Maybe<User>,
  transactions: Maybe<Array<Maybe<Transaction>>>,
}

export interface WalletCreateRequestInput {
  name: Scalars['String'],
  color: Scalars['String'],
  amount: Maybe<Scalars['Float']>,
}

export interface WalletDeleteRequestInput {
  id: Scalars['Int'],
}

export interface WalletUpdateRequestInput {
  id: Scalars['Int'],
  name: Maybe<Scalars['String']>,
  color: Maybe<Scalars['String']>,
}

export type TransactionsQueryVariables = {
  walletIds: Maybe<Array<Maybe<Scalars['Int']>>>
};


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Maybe<Array<Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'description' | 'type' | 'value' | 'date'>
    & { wallet: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'name' | 'color'>
    )>, category: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name' | 'color'>
    )> }
  )>>> }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginUser'>
);

export type RegisterMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  confirmPassword: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type CreateWalletMutationVariables = {
  name: Scalars['String'],
  amount: Maybe<Scalars['Float']>,
  color: Scalars['String']
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


export const TransactionsDocument = gql`
    query Transactions($walletIds: [Int]) {
  transactions(input: {walletIds: $walletIds}) {
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
    category {
      id
      name
      color
    }
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