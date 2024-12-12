import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'expo-router';


// GraphQL Querry
const GET_TRENDING_REPOSITORIES = gql`
  query GetTrendingRepositories($queryString: String!) {
    search(query: $queryString, type: REPOSITORY, first: 20) {
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
            }
            stargazerCount
            createdAt
          }
        }
      }
    }
  }
`;

export default function RepositoryList() {

// Bool for sorting
const [sortByStars, setSortByStars] = useState(true);

// Computed Value for the Querry String
const queryString = sortByStars
? "language:JavaScript sort:stars-desc"
: "language:JavaScript sort:created-desc";

// Querry
const { loading, error, data, refetch } = useQuery(GET_TRENDING_REPOSITORIES, {
    variables: { queryString },
    fetchPolicy: 'network-only', 
});

// Trigger a refetch when queryString changes
useEffect(() => {
    refetch({ queryString });
}, [sortByStars]);

const toggleSorting = () => {
    // Toggle the sort criteria
    setSortByStars((prev) => !prev);
};

const router = useRouter();

// Handle Querry response
if (loading) return <Text style={{ margin: 10 }}>Loading...</Text>;
if (error) return <Text style={{ margin: 10 }}>Error: {error.message}</Text>;

return (
    <View style={styles.container}>
        <Button
        title={`Sort by ${sortByStars ? 'Creation Date' : 'Stars'}`}
        onPress={toggleSorting}
        />
        <FlatList
        data={data?.search.edges}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}
            onPress={() => router.push(`/${item.node.id}`)}  // route to Repository Detail
            >
            <Text style={styles.title}>{item.node.name}</Text>
            <Text>Owner: {item.node.owner.login}</Text>
            <Text>Created At: {new Date(item.node.createdAt).toDateString()}</Text>
            <Text>⭐ {item.node.stargazerCount}</Text>
            </TouchableOpacity>
        )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    backgroundColor: '#fff' 
    },
  item: { 
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
     },
  title: { 
    fontSize: 18,
     fontWeight: 'bold' 
    },
});