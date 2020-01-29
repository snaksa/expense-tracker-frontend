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
  walletId: Scalars['Int']
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
  user: Maybe<User>,
  transactions: Maybe<Array<Maybe<Transaction>>>,
}

export interface WalletCreateRequestInput {
  name: Scalars['String'],
  color: Scalars['String'],
}

export interface WalletDeleteRequestInput {
  id: Scalars['Int'],
}

export interface WalletUpdateRequestInput {
  id: Scalars['Int'],
  name: Maybe<Scalars['String']>,
  color: Maybe<Scalars['String']>,
}

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
    & Pick<User, 'id'>
  )> }
);


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