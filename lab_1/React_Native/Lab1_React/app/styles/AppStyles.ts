import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    titleContainer: {
      width: '100%', 
      height: '10%',
      backgroundColor: '#00a08a', 
      paddingVertical: 10, 
      justifyContent: 'flex-end',    
      marginBottom: 15,
    },
    title: {
      fontSize: 24,
      color: '#fff', 
      textAlign: 'left',
      paddingLeft: 15,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 100,
      marginBottom: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '70%',
      marginVertical: 10,
    },
    buttonContainer: {
      marginHorizontal: 5, // Space between buttons
      paddingVertical: 10,
      backgroundColor: '#c4c4c4', // Button background color
      alignItems: 'center',
      borderRadius: 0,
      width: '30%',
    },
    buttonText: {
      color: '#000', // Black text color
      fontSize: 16,
    },
    inputRow: {
      flexDirection: 'row', // Align items horizontally
      alignItems: 'center', // Center label and input vertically
      marginTop: 20,
      width: '85%',
      alignSelf: 'flex-start', // Align the inputRow to the start of the container
      marginLeft: 20, // Add left margin to control how much it is shifted to the left
    },
    label: {
      fontSize: 16,
      color: '#5c5c5c',
      marginRight: 40, 
    },
    inputInline: {
      flex: 1, 
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#d81b60',
    },
  });
  
  export default AppStyles;