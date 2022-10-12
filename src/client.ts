import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from 'graphql-request'

export const endpoint = 'https://graphqlzero.almansi.me/api'

export const queryClient = new QueryClient();
export const graphQLClient = new GraphQLClient(endpoint)