import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  imgUrl: Scalars['String'];
  logo_img: Scalars['String'];
  name: Scalars['String'];
  stations?: Maybe<Array<Station>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPrice: Scalars['Boolean'];
  updatePrice: Scalars['Boolean'];
};


export type MutationCreatePriceArgs = {
  petrolTypeId: Scalars['ID'];
  price: Scalars['Float'];
  stationId: Scalars['ID'];
};


export type MutationUpdatePriceArgs = {
  petrolTypeId: Scalars['ID'];
  price: Scalars['Float'];
  stationId: Scalars['ID'];
};

export type PetrolSuperType = {
  __typename?: 'PetrolSuperType';
  cat: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type PetrolType = {
  __typename?: 'PetrolType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  superType: PetrolSuperType;
};

export type Price = {
  __typename?: 'Price';
  createdAt: Scalars['Date'];
  currency: Scalars['String'];
  id: Scalars['ID'];
  price: Scalars['Float'];
  type: PetrolType;
  updatedAt: Scalars['Date'];
  validFrom: Scalars['Date'];
  validTo?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  companies?: Maybe<Array<Company>>;
  petrolTypes?: Maybe<Array<PetrolType>>;
  station: Station;
  stations?: Maybe<Array<Station>>;
};


export type QueryStationArgs = {
  id: Scalars['ID'];
};


export type QueryStationsArgs = {
  companyIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  east?: InputMaybe<Scalars['Float']>;
  north?: InputMaybe<Scalars['Float']>;
  south?: InputMaybe<Scalars['Float']>;
  west?: InputMaybe<Scalars['Float']>;
};

export type Station = {
  __typename?: 'Station';
  company: Company;
  id: Scalars['ID'];
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  petrolTypes?: Maybe<Array<PetrolType>>;
  prices?: Maybe<Array<Price>>;
  pricesHistory?: Maybe<Array<Maybe<Array<Price>>>>;
};

export type UpdatePriceMutationVariables = Exact<{
  stationId: Scalars['ID'];
  petrolTypeId: Scalars['ID'];
  price: Scalars['Float'];
}>;


export type UpdatePriceMutation = { __typename?: 'Mutation', updatePrice: boolean };

export type CreatePriceMutationVariables = Exact<{
  stationId: Scalars['ID'];
  petrolTypeId: Scalars['ID'];
  price: Scalars['Float'];
}>;


export type CreatePriceMutation = { __typename?: 'Mutation', createPrice: boolean };

export type CompanyNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyNamesQuery = { __typename?: 'Query', companies?: Array<{ __typename?: 'Company', id: string, name: string, logo_img: string }> | null };

export type PetrolTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type PetrolTypesQuery = { __typename?: 'Query', petrolTypes?: Array<{ __typename?: 'PetrolType', id: string, name: string, description?: string | null, superType: { __typename?: 'PetrolSuperType', id: string, name: string, cat: string } }> | null };

export type StationsQueryVariables = Exact<{
  companyIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  north?: InputMaybe<Scalars['Float']>;
  south?: InputMaybe<Scalars['Float']>;
  east?: InputMaybe<Scalars['Float']>;
  west?: InputMaybe<Scalars['Float']>;
}>;


export type StationsQuery = { __typename?: 'Query', stations?: Array<{ __typename?: 'Station', id: string, lat: number, lon: number, company: { __typename?: 'Company', id: string, name: string, logo_img: string } }> | null };

export type StationQueryVariables = Exact<{
  stationId: Scalars['ID'];
}>;


export type StationQuery = { __typename?: 'Query', station: { __typename?: 'Station', id: string, pricesHistory?: Array<Array<{ __typename?: 'Price', id: string, currency: string, price: number, validFrom: any, validTo?: any | null, type: { __typename?: 'PetrolType', id: string, name: string, description?: string | null, superType: { __typename?: 'PetrolSuperType', cat: string, name: string, id: string } } }> | null> | null } };

export type CurrentPricesQueryVariables = Exact<{
  stationId: Scalars['ID'];
}>;


export type CurrentPricesQuery = { __typename?: 'Query', station: { __typename?: 'Station', id: string, prices?: Array<{ __typename?: 'Price', id: string, currency: string, price: number, validFrom: any, validTo?: any | null, type: { __typename?: 'PetrolType', id: string, name: string, description?: string | null, superType: { __typename?: 'PetrolSuperType', cat: string, name: string, id: string } } }> | null } };


export const UpdatePriceDocument = gql`
    mutation UpdatePrice($stationId: ID!, $petrolTypeId: ID!, $price: Float!) {
  updatePrice(stationId: $stationId, petrolTypeId: $petrolTypeId, price: $price)
}
    `;
export type UpdatePriceMutationFn = Apollo.MutationFunction<UpdatePriceMutation, UpdatePriceMutationVariables>;

/**
 * __useUpdatePriceMutation__
 *
 * To run a mutation, you first call `useUpdatePriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePriceMutation, { data, loading, error }] = useUpdatePriceMutation({
 *   variables: {
 *      stationId: // value for 'stationId'
 *      petrolTypeId: // value for 'petrolTypeId'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useUpdatePriceMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePriceMutation, UpdatePriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePriceMutation, UpdatePriceMutationVariables>(UpdatePriceDocument, options);
      }
export type UpdatePriceMutationHookResult = ReturnType<typeof useUpdatePriceMutation>;
export type UpdatePriceMutationResult = Apollo.MutationResult<UpdatePriceMutation>;
export type UpdatePriceMutationOptions = Apollo.BaseMutationOptions<UpdatePriceMutation, UpdatePriceMutationVariables>;
export const CreatePriceDocument = gql`
    mutation CreatePrice($stationId: ID!, $petrolTypeId: ID!, $price: Float!) {
  createPrice(stationId: $stationId, petrolTypeId: $petrolTypeId, price: $price)
}
    `;
export type CreatePriceMutationFn = Apollo.MutationFunction<CreatePriceMutation, CreatePriceMutationVariables>;

/**
 * __useCreatePriceMutation__
 *
 * To run a mutation, you first call `useCreatePriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPriceMutation, { data, loading, error }] = useCreatePriceMutation({
 *   variables: {
 *      stationId: // value for 'stationId'
 *      petrolTypeId: // value for 'petrolTypeId'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useCreatePriceMutation(baseOptions?: Apollo.MutationHookOptions<CreatePriceMutation, CreatePriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePriceMutation, CreatePriceMutationVariables>(CreatePriceDocument, options);
      }
export type CreatePriceMutationHookResult = ReturnType<typeof useCreatePriceMutation>;
export type CreatePriceMutationResult = Apollo.MutationResult<CreatePriceMutation>;
export type CreatePriceMutationOptions = Apollo.BaseMutationOptions<CreatePriceMutation, CreatePriceMutationVariables>;
export const CompanyNamesDocument = gql`
    query CompanyNames {
  companies {
    id
    name
    logo_img
  }
}
    `;

/**
 * __useCompanyNamesQuery__
 *
 * To run a query within a React component, call `useCompanyNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompanyNamesQuery(baseOptions?: Apollo.QueryHookOptions<CompanyNamesQuery, CompanyNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanyNamesQuery, CompanyNamesQueryVariables>(CompanyNamesDocument, options);
      }
export function useCompanyNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanyNamesQuery, CompanyNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanyNamesQuery, CompanyNamesQueryVariables>(CompanyNamesDocument, options);
        }
export type CompanyNamesQueryHookResult = ReturnType<typeof useCompanyNamesQuery>;
export type CompanyNamesLazyQueryHookResult = ReturnType<typeof useCompanyNamesLazyQuery>;
export type CompanyNamesQueryResult = Apollo.QueryResult<CompanyNamesQuery, CompanyNamesQueryVariables>;
export const PetrolTypesDocument = gql`
    query PetrolTypes {
  petrolTypes {
    id
    name
    description
    superType {
      id
      name
      cat
    }
  }
}
    `;

/**
 * __usePetrolTypesQuery__
 *
 * To run a query within a React component, call `usePetrolTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePetrolTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePetrolTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePetrolTypesQuery(baseOptions?: Apollo.QueryHookOptions<PetrolTypesQuery, PetrolTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PetrolTypesQuery, PetrolTypesQueryVariables>(PetrolTypesDocument, options);
      }
export function usePetrolTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PetrolTypesQuery, PetrolTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PetrolTypesQuery, PetrolTypesQueryVariables>(PetrolTypesDocument, options);
        }
export type PetrolTypesQueryHookResult = ReturnType<typeof usePetrolTypesQuery>;
export type PetrolTypesLazyQueryHookResult = ReturnType<typeof usePetrolTypesLazyQuery>;
export type PetrolTypesQueryResult = Apollo.QueryResult<PetrolTypesQuery, PetrolTypesQueryVariables>;
export const StationsDocument = gql`
    query Stations($companyIds: [String], $north: Float, $south: Float, $east: Float, $west: Float) {
  stations(
    companyIds: $companyIds
    north: $north
    south: $south
    east: $east
    west: $west
  ) {
    id
    lat
    lon
    company {
      id
      name
      logo_img
    }
  }
}
    `;

/**
 * __useStationsQuery__
 *
 * To run a query within a React component, call `useStationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationsQuery({
 *   variables: {
 *      companyIds: // value for 'companyIds'
 *      north: // value for 'north'
 *      south: // value for 'south'
 *      east: // value for 'east'
 *      west: // value for 'west'
 *   },
 * });
 */
export function useStationsQuery(baseOptions?: Apollo.QueryHookOptions<StationsQuery, StationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StationsQuery, StationsQueryVariables>(StationsDocument, options);
      }
export function useStationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationsQuery, StationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StationsQuery, StationsQueryVariables>(StationsDocument, options);
        }
export type StationsQueryHookResult = ReturnType<typeof useStationsQuery>;
export type StationsLazyQueryHookResult = ReturnType<typeof useStationsLazyQuery>;
export type StationsQueryResult = Apollo.QueryResult<StationsQuery, StationsQueryVariables>;
export const StationDocument = gql`
    query Station($stationId: ID!) {
  station(id: $stationId) {
    id
    pricesHistory {
      id
      currency
      price
      validFrom
      validTo
      type {
        id
        name
        description
        superType {
          cat
          name
          id
        }
      }
    }
  }
}
    `;

/**
 * __useStationQuery__
 *
 * To run a query within a React component, call `useStationQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationQuery({
 *   variables: {
 *      stationId: // value for 'stationId'
 *   },
 * });
 */
export function useStationQuery(baseOptions: Apollo.QueryHookOptions<StationQuery, StationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StationQuery, StationQueryVariables>(StationDocument, options);
      }
export function useStationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationQuery, StationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StationQuery, StationQueryVariables>(StationDocument, options);
        }
export type StationQueryHookResult = ReturnType<typeof useStationQuery>;
export type StationLazyQueryHookResult = ReturnType<typeof useStationLazyQuery>;
export type StationQueryResult = Apollo.QueryResult<StationQuery, StationQueryVariables>;
export const CurrentPricesDocument = gql`
    query CurrentPrices($stationId: ID!) {
  station(id: $stationId) {
    id
    prices {
      id
      currency
      price
      validFrom
      validTo
      type {
        id
        name
        description
        superType {
          cat
          name
          id
        }
      }
    }
  }
}
    `;

/**
 * __useCurrentPricesQuery__
 *
 * To run a query within a React component, call `useCurrentPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentPricesQuery({
 *   variables: {
 *      stationId: // value for 'stationId'
 *   },
 * });
 */
export function useCurrentPricesQuery(baseOptions: Apollo.QueryHookOptions<CurrentPricesQuery, CurrentPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentPricesQuery, CurrentPricesQueryVariables>(CurrentPricesDocument, options);
      }
export function useCurrentPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentPricesQuery, CurrentPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentPricesQuery, CurrentPricesQueryVariables>(CurrentPricesDocument, options);
        }
export type CurrentPricesQueryHookResult = ReturnType<typeof useCurrentPricesQuery>;
export type CurrentPricesLazyQueryHookResult = ReturnType<typeof useCurrentPricesLazyQuery>;
export type CurrentPricesQueryResult = Apollo.QueryResult<CurrentPricesQuery, CurrentPricesQueryVariables>;