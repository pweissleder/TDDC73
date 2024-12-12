import React from 'react';
import { View, Text, StyleSheet, Linking, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useLocalSearchParams } from 'expo-router';


// GraphQL Querry
const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        owner {
          login
        }
        url
        description
        stargazerCount
        createdAt
        updatedAt
        forkCount
        primaryLanguage {
          name
        }
      }
    }
  }
`;

export default function RepositoryDetail() {

  // file-based routing 
  const { repositoryId } = useLocalSearchParams<{ repositoryId: string }>();

  // Querry
  const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { id: repositoryId },
  });

  // Handle Querry
  if (loading) return <Text style={{ margin: 10 }}>Loading...</Text>;
  if (error) return <Text style={{ margin: 10 }}>Error: {error.message}</Text>;

  const repository = data.node;

  // Content
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repository.name}</Text>
      <Text>Owner: {repository.owner.login}</Text>
      <Text>Description: {repository.description}</Text>
      <Text>Primary Language: {repository.primaryLanguage?.name}</Text>
      <Text>Stars: ⭐ {repository.stargazerCount}</Text>
      <Text>Forks: {repository.forkCount}</Text>
      <Text>Created At: {new Date(repository.createdAt).toDateString()}</Text>
      <Text>Updated At: {new Date(repository.updatedAt).toDateString()}</Text>
      <Button title="Open in GitHub" onPress={() => Linking.openURL(repository.url)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
    },
  title: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
    },
});
