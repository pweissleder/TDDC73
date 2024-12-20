import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import CreditCard from '../components/CreditCard';
import CreditCardForm from '../components/CreditCardForm';

interface CardData {
  cardNumber: string; // Credit card number
  cardHolder: string; // Cardholder's name
  expiry: string; // Expiry date in MM/YY format
  CVV: string; // CVV code
  expiryMonth?: string; // Expiry month (optional for internal tracking)
  expiryYear?: string; // Expiry year (optional for internal tracking)
}

const App = () => {
  // State to hold the card data, including card number, cardholder name, expiry date, and CVV.
  // This data is updated dynamically as the user interacts with the form.
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: '', 
    cardHolder: '', 
    expiry: '', 
    CVV: '', 
  });

  const [isFlipped, setIsFlipped] = useState(false); // State to manage whether the card is flipped

  // Update card data when any field changes in the form
  const handleUpdate = (field: string, value: string) => {
    setCardData((prevState) => ({
      ...prevState, // Preserve existing fields
      [field]: value, // Update the specified field
    }));
  };

  // Flip the card when necessary (e.g., when editing CVV)
  const handleFlipCard = (flip: boolean) => {
    setIsFlipped(flip);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Container for relative positioning */}
      <View style={styles.relativeContainer}>
        {/* Credit Card Component */}
        <View style={styles.cardWrapper}>
          <CreditCard
            cardNumber={cardData.cardNumber}
            cardHolder={cardData.cardHolder}
            expiry={cardData.expiry}
            CVV={cardData.CVV}
            isFlipped={isFlipped}
          />
        </View>

        {/* Credit Card Form */}
        <View style={[styles.formWrapper, Platform.OS === 'web' && styles.webFormWrapper]}>
          <CreditCardForm onUpdate={handleUpdate} onFlipCard={handleFlipCard} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: '#bee5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relativeContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardWrapper: {
    zIndex: 2, 
    position: 'absolute',
    top: 0,
  },
  formWrapper: {
    zIndex: 1, 
    marginTop: 110, 
    width: '90%',
    height: 415,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Ombra per Android
  },
  webFormWrapper: {
    width: 450,
    maxWidth: '80%', 
  },
});

export default App;
