import React from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';

interface CreditCardProps {
  cardNumber: string; // Card number as a string
  cardHolder: string; // Name of the cardholder
  expiry: string; // Expiration date in MM/YY format
  CVV: string; // Card's CVV number
  isFlipped: boolean; // Whether the card is flipped to show the back
}

const CreditCard: React.FC<CreditCardProps> = ({ cardNumber, cardHolder, expiry, CVV, isFlipped }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current; // Animation value for flipping
  const [rotation, setRotation] = React.useState(0); // Current rotation state of the card

  // List of background images for the card
  const backgroundImages = [
    require('../assets/images/1.jpeg'),
    require('../assets/images/2.jpeg'),
    require('../assets/images/3.jpeg'),
    require('../assets/images/4.jpeg'),
    require('../assets/images/5.jpeg'),
    require('../assets/images/6.jpeg'),
    require('../assets/images/7.jpeg'),
    require('../assets/images/8.jpeg'),
    require('../assets/images/9.jpeg'),
    require('../assets/images/10.jpeg'),
    require('../assets/images/11.jpeg'),
    require('../assets/images/12.jpeg'),
    require('../assets/images/13.jpeg'),
    require('../assets/images/14.jpeg'),
    require('../assets/images/15.jpeg'),
    require('../assets/images/16.jpeg'),
    require('../assets/images/17.jpeg'),
    require('../assets/images/18.jpeg'),
    require('../assets/images/19.jpeg'),
    require('../assets/images/20.jpeg'),
    require('../assets/images/21.jpeg'),
    require('../assets/images/22.jpeg'),
    require('../assets/images/23.jpeg'),
    require('../assets/images/24.jpeg'),
    require('../assets/images/25.jpeg'),
  ];

  const [backgroundImage, setBackgroundImage] = React.useState(null); // Current background image

  // Array of animated values for individual characters (optional animation effect)
  const animatedChars = React.useRef(
    Array.from({ length: 40 }, () => new Animated.Value(0))
  ).current;

  // Set a random background image initially
  React.useEffect(() => {
    const initialBackgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    if (!backgroundImage) {
      setBackgroundImage(initialBackgroundImage);
    }
  }, []);

  // Handle card flip animation based on `isFlipped` prop
  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFlipped ? 1 : 0, // Flip to front (0) or back (1)
      duration: 600, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native animations for better performance
    }).start();
  }, [isFlipped]);

  // Interpolation for front and back rotation during flip animation
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  // Styles for front and back card views
  const frontStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  // Format the CVV to show placeholder characters for hidden digits
  const formatCVV = (CVV: string) => {
    return CVV.padEnd(3, '#'); // Ensure CVV is always 3 characters long
  };

  // Determine card type based on the card number
  const getCardType = (cardNumber: string) => {
    let type = "visa"; // Default to Visa
    if (/^3[47]/.test(cardNumber)) type = "amex";
    else if (/^4/.test(cardNumber)) type = "visa";
    else if (/^5[1-5]/.test(cardNumber)) type = "mastercard";
    else if (/^6011/.test(cardNumber)) type = "discover";
    else if (/^9792/.test(cardNumber)) type = "troy";
    return type;
  };

  // Format card number based on the type (e.g., Visa, Amex)
  const formatCardNumber = (text: string, cardType: string) => {
    const cleaned = text.replace(/\D+/g, ''); // Remove all non-numeric characters

    if (cardType === "amex") {
      // Format for Amex: #### ###### #####
      const padded = cleaned.padEnd(15, '#'); // Ensure Amex has 15 characters
      return `${padded.slice(0, 4)} ${padded.slice(4, 10)} ${padded.slice(10, 15)}`.trim();
    }

    // Default format: #### #### #### ####
    const padded = cleaned.padEnd(16, '#'); // Ensure other cards have 16 characters
    return `${padded.slice(0, 4)} ${padded.slice(4, 8)} ${padded.slice(8, 12)} ${padded.slice(12, 16)}`.trim();
  };

  const cardType = getCardType(cardNumber) as keyof typeof logoImages;

  // Card logos based on the card type
  const logoImages = {
    visa: require('../assets/images/visa.png'),
    mastercard: require('../assets/images/mastercard.png'),
    amex: require('../assets/images/amex.png'),
    discover: require('../assets/images/discover.png'),
    troy: require('../assets/images/troy.png'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.flipContainer}>
        {/* Front side of the card */}
        <Animated.View style={[styles.card, frontStyle]}>
          <Image source={backgroundImage || require('../assets/images/1.jpeg')} style={styles.backgroundImage} />
          <View style={styles.overlay} />
          <View style={styles.imagesContainer}>
            <Image source={require('../assets/images/chip.png')} style={styles.chipImage} />
            <Image source={logoImages[cardType]} style={styles.logoImage} resizeMode="contain" />
          </View>
          <Text style={styles.cardNumber}>{formatCardNumber(cardNumber, cardType)}</Text>
          <View style={styles.cardDetailsContainer}>
            <View style={styles.cardDetailSection}>
              <Text style={styles.cardHolderLabel}>Card Holder</Text>
              <Text style={styles.cardHolder} numberOfLines={1}>{cardHolder.toUpperCase() || 'FULL NAME'}</Text>
            </View>
            <View style={styles.cardDetailSection}>
              <Text style={styles.expiryLabel}>Expires</Text>
              <Text style={styles.expiry}>{expiry || 'MM/YY'}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Back side of the card */}
        <Animated.View style={[styles.card, styles.backCard, backStyle]}>
          <Image source={backgroundImage || require('../assets/images/1.jpeg')} style={styles.backgroundImage} />
          <View style={styles.overlay} />
          <View style={styles.blackStrip} />
          <View style={styles.CVVContainer}>
            <Text style={styles.CVVLabel}>CVV</Text>
            <Text style={styles.CVV}>{formatCVV(CVV)}</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  flipContainer: {
    width: 320,
    height: 190,
    perspective: '1000',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0, 
    left: 0,
    width: '100%', 
    height: '100%', 
    borderRadius: 10,
    resizeMode: 'cover', // Ensures the image covers the entire card area
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },
  card: {
    width: 320,
    height: 190,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  backCard: {
    transform: [{ rotateY: '180deg' }],
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipImage: {
    width: 45,
    height: 35,
  },
  logoImage: {
    width: 100,
    height: 45,
  },
  cardNumber: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 20,
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardDetailSection: {
    flexDirection: 'column',
  },
  cardHolderLabel: {
    fontSize: 12,
    color: '#ddd',
    marginBottom: 5,
  },
  expiryLabel: {
    fontSize: 12,
    color: '#ddd',
    marginBottom: 5,
  },
  cardHolder: {
    fontSize: 16,
    color: '#fff',
    overflow: 'hidden',
    width: 200,
  },
  expiry: {
    fontSize: 16,
    color: '#fff',
  },
  blackStrip: {
    height: 40,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  CVVContainer: {
    alignItems: 'flex-end',
  },
  CVVLabel: {
    fontSize: 12,
    color: '#ddd',
  },
  CVV: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
});

export default CreditCard;
