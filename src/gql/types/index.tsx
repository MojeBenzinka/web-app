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
  stations?: Maybe<Array<Maybe<Station>>>;
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
  superType?: Maybe<PetrolSuperType>;
};

export type Price = {
  __typename?: 'Price';
  createdAt: Scalars['Date'];
  currency: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  price: Scalars['Float'];
  type?: Maybe<PetrolType>;
  updatedAt: Scalars['Date'];
};

export type Query = {
  __typename?: 'Query';
  companies?: Maybe<Array<Maybe<Company>>>;
  station?: Maybe<Station>;
  stations?: Maybe<Array<Maybe<Station>>>;
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
  latestPrice?: Maybe<Array<Maybe<Price>>>;
  lon: Scalars['Float'];
  prices?: Maybe<Array<Maybe<Price>>>;
  pricesHistory?: Maybe<Array<Maybe<Array<Maybe<Price>>>>>;
};

export type CompanyNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyNamesQuery = { __typename?: 'Query', companies?: Array<{ __typename?: 'Company', id: string, name: string, logo_img: string } | null> | null };

export type StationsQueryVariables = Exact<{
  companyIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  north?: InputMaybe<Scalars['Float']>;
  south?: InputMaybe<Scalars['Float']>;
  east?: InputMaybe<Scalars['Float']>;
  west?: InputMaybe<Scalars['Float']>;
}>;


export type StationsQuery = { __typename?: 'Query', stations?: Array<{ __typename?: 'Station', id: string, lat: number, lon: number, company: { __typename?: 'Company', id: string, name: string, logo_img: string } } | null> | null };

export type StationQueryVariables = Exact<{
  stationId: Scalars['ID'];
}>;


export type StationQuery = { __typename?: 'Query', station?: { __typename?: 'Station', id: string, pricesHistory?: Array<Array<{ __typename?: 'Price', id?: string | null, createdAt: any, updatedAt: any, currency: string, price: number, type?: { __typename?: 'PetrolType', id: string, name: string, description?: string | null, superType?: { __typename?: 'PetrolSuperType', cat: string, name: string, id: string } | null } | null } | null> | null> | null } | null };


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
      createdAt
      updatedAt
      currency
      price
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