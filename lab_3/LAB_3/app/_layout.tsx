import { Stack } from 'expo-router';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apolloClient';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
    <Stack>
    <Stack.Screen name="index" options={{ title: "Trending Javascript Repositories" }} />
      <Stack.Screen name="[repositoryId]" options={{ title: 'Repository Details' }} />
    </Stack>
   </ApolloProvider>
  );
}