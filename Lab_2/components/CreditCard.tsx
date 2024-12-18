import React from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';

interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  CVV: string;
  isFlipped: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({ cardNumber, cardHolder, expiry, CVV, isFlipped }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [rotation, setRotation] = React.useState(0);

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
  
  const [backgroundImage, setBackgroundImage] = React.useState(null);

  const animatedChars = React.useRef(
    Array.from({ length: 40 }, () => new Animated.Value(0))
  ).current;

  React.useEffect(() => {
    const initialBackgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    if (!backgroundImage) {
      setBackgroundImage(initialBackgroundImage);
    }
  }, []);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFlipped ? 1 : 0,
      duration: 600,
      useNativeDriver: true, // Enable native animations for better performance
    }).start();
  }, [isFlipped]);
  

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backStyle = {
    transform: [{ rotateY: backInterpolate }],
  };
  
  const formatCVV = (CVV: string) => {
    return CVV.padEnd(3, '#');
  };

  const getCardType = (cardNumber: string) => {
    let type = "visa"; // Default to visa
    if (/^3[47]/.test(cardNumber)) type = "amex";
    else if (/^4/.test(cardNumber)) type = "visa";
    else if (/^5[1-5]/.test(cardNumber)) type = "mastercard";
    else if (/^6011/.test(cardNumber)) type = "discover";
    else if (/^9792/.test(cardNumber)) type = "troy";
    return type;
  };
  
  const formatCardNumber = (text: string, cardType: string) => {
    const cleaned = text.replace(/\D+/g, ''); // Remove all non-numeric characters
  
    if (cardType === "amex") {
      // Amex format: #### ###### #####
      const padded = cleaned.padEnd(15, '#'); // Pad to 15 characters with #
      return `${padded.slice(0, 4)} ${padded.slice(4, 10)} ${padded.slice(10, 15)}`.trim();
    }
  
    // Default format: #### #### #### ####
    const padded = cleaned.padEnd(16, '#'); // Pad to 16 characters with #
    return `${padded.slice(0, 4)} ${padded.slice(4, 8)} ${padded.slice(8, 12)} ${padded.slice(12, 16)}`.trim();
  };
  
  
  const cardType = getCardType(cardNumber) as keyof typeof logoImages;
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
