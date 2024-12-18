import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import CreditCard from '../components/CreditCard';
import CreditCardForm from '../components/CreditCardForm';

interface CardData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  CVV: string;
  expiryMonth?: string;
  expiryYear?: string;
}

const App = () => {
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    CVV: '',
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleUpdate = (field: string, value: string) => {
    setCardData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  

  const handleFlipCard = (flip: boolean) => {
    setIsFlipped(flip);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Contenidor per controlar la posició relativa */}
      <View style={styles.relativeContainer}>
        {/* Targeta de crèdit */}
        <View style={styles.cardWrapper}>
          <CreditCard
            cardNumber={cardData.cardNumber}
            cardHolder={cardData.cardHolder}
            expiry={cardData.expiry}
            CVV={cardData.CVV}
            isFlipped={isFlipped}
          />
        </View>

        {/* Formulari */}
        <View style={[styles.formWrapper, Platform.OS === 'web' && styles.webFormWrapper]}>
          <CreditCardForm onUpdate={handleUpdate} onFlipCard={handleFlipCard}/>
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
