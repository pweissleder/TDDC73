import React, { useState, useEffect, createElement } from 'react';
import { View, FlatList, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import {useLazyQuery ,gql } from '@apollo/client';
import { useRouter } from 'expo-router';
import { DatePickerModal } from 'react-native-paper-dates';
  
// GraphQL Query
const GET_TRENDING_REPOSITORIES = gql`
  query GetTrendingRepositories($queryString: String!) {
    search(query: $queryString, type: REPOSITORY, first: 100) {
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
            updatedAt
          }
        }
      }
    }
  }
`;

export default function RepositoryList() {

  // State for sorting and date filtering
  const [sortByStars, setSortByStars] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // Default to one week ago
  const [endDate, setEndDate] = useState<Date>(new Date()); // Default to today

  // State to control date picker visibility
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  
  // Query
  const [getTrendingRepositories, { loading, error, data }] = useLazyQuery(GET_TRENDING_REPOSITORIES, {
    fetchPolicy: 'network-only',
  });

  // Initialize query on mount or when sortByStars changes
  useEffect(() => {
    executeQuery();
  }, [sortByStars]);

  const toggleSorting = () => {
    // Toggle the sort criteria
    setSortByStars((prev) => !prev);
  };

  const executeQuery = () => {

    // Format the dates to UTC
    const formattedStartDate = new Date(
      Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate())
    )
      .toISOString()
      .split('T')[0];
  
    const formattedEndDate = new Date(
      Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())
    )
      .toISOString()
      .split('T')[0];
  
    const queryString = sortByStars
      ? "language:JavaScript sort:stars-desc"
      : `language:JavaScript pushed:${formattedStartDate}..${formattedEndDate} sort:updated-asc`;  // could be changed to sort:stars-desc to se more of a range of repositories dates
  
    getTrendingRepositories({ variables: { queryString: queryString } });
  };


  const router = useRouter();

  // Handle Query response
  if (loading) return <Text style={{ margin: 10 }}>Loading...</Text>;
  if (error) return <Text style={{ margin: 10 }}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Button
        title={`Sort by ${sortByStars ? 'Last Updated' : 'Stars'}`}
        onPress={toggleSorting}
      />
      {!sortByStars && (
        <View style={styles.datePickerContainer}>
          <View style={styles.datePicker}>
            <Text>Start Date:</Text>
            <Button title={startDate.toDateString()} onPress={() => setShowStartDatePicker(true)} />
            {showStartDatePicker && (
              <DatePickerModal
              locale="en"
              mode="single"
              visible={showStartDatePicker}
              date={startDate}
              onConfirm={(params) => {
                setShowStartDatePicker(false);
                if (params.date) {
                   // Format the dates to UTC
                  const adjustedDate = new Date(
                      Date.UTC(params.date.getFullYear(), params.date.getMonth(), params.date.getDate())
                    );
          
                  setStartDate(adjustedDate);;
                }
              }}
              onDismiss={() => setShowStartDatePicker(false)}
            />

            )}
          </View>

          <View style={styles.datePicker}>
            <Text>End Date:</Text>
            <Button title={endDate.toDateString()} onPress={() => setShowEndDatePicker(true)} />
            {showEndDatePicker && (
              <DatePickerModal
              locale="en"
              mode="single"
              visible={showEndDatePicker}
              date={endDate}
              onConfirm={(params) => {
                setShowEndDatePicker(false);
                if (params.date) setEndDate(params.date);
              }}
              onDismiss={() => setShowEndDatePicker(false)}
            />

            )}
          </View>

          <Button title="Apply Date Filter" onPress={executeQuery} />
        </View>
      )}

      <FlatList
        data={data?.search.edges}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/${item.node.id}`)}  // route to Repository Detail
          >
            <Text style={styles.title}>{item.node.name}</Text>
            <Text>Owner: {item.node.owner.login}</Text>
            <Text>Created At: {new Date(item.node.createdAt).toDateString()}</Text>
            <Text>Updated At: {new Date(item.node.updatedAt).toDateString()}</Text>
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
  datePickerContainer: {
    marginVertical: 10,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});