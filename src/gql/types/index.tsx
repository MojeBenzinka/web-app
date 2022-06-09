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
  logo_img: Scalars['String'];
  name: Scalars['String'];
  stations?: Maybe<Array<Maybe<Station>>>;
};

export type Price = {
  __typename?: 'Price';
  end_date: Scalars['Date'];
  id: Scalars['ID'];
  price: Scalars['Float'];
  start_date: Scalars['Date'];
  station_id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  stations?: Maybe<Array<Maybe<Station>>>;
};

export type Station = {
  __typename?: 'Station';
  company?: Maybe<Company>;
  currentPrice?: Maybe<Price>;
  id: Scalars['ID'];
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  prices?: Maybe<Array<Maybe<Price>>>;
};

export type StationsQueryVariables = Exact<{ [key: string]: never; }>;


export type StationsQuery = { __typename?: 'Query', stations?: Array<{ __typename?: 'Station', id: string, lat: number, lon: number, company?: { __typename?: 'Company', id: string, name: string, logo_img: string } | null } | null> | null };


export const StationsDocument = gql`
    query Stations {
  stations {
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