import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AppStyles from './styles/AppStyles'; // Import the AppStyles

export default function App() {
  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.titleContainer}>
        <Text style={AppStyles.title}>Example 1: React-Native</Text>
      </View>

      <Image
        style={AppStyles.image}
        source={require('../assets/images/Lab1React.png')} 
      />

      <View style={AppStyles.buttonRow}>
        <TouchableOpacity style={AppStyles.buttonContainer}>
          <Text style={AppStyles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.buttonContainer}>
          <Text style={AppStyles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
      </View>
      <View style={AppStyles.buttonRow}>
        <TouchableOpacity style={AppStyles.buttonContainer}>
          <Text style={AppStyles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.buttonContainer}>
          <Text style={AppStyles.buttonText}>BUTTON</Text>
        </TouchableOpacity>
      </View>

      <View style={AppStyles.inputRow}>
        <Text style={AppStyles.label}>Email:</Text>
        <TextInput style={AppStyles.inputInline} placeholder="Enter your email" />
      </View>
    </View>
  );
}
