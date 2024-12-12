import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface CreditCardFormProps {
  onUpdate: (field: string, value: string) => void;
  onFlipCard: (isFlipped: boolean) => void;
}

const schema = yup.object().shape({
  cardNumber: yup.string().required('Card number is required').min(16, 'Must be 16 digits'),
  cardHolder: yup.string().required('Card holder name is required'),
  expiryMonth: yup.string().required('Expiry month is required'),
  expiryYear: yup.string().required('Expiry year is required'),
  cvv: yup.string().required('cvv is required').min(3, 'Must be 3 digits'),
});

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onUpdate, onFlipCard }) => {
  const { control, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch for changes in the fields to update the card
  const cardNumber = watch('cardNumber', '');
  const cardHolder = watch('cardHolder', '');
  const expiryMonth = watch('expiryMonth', '');
  const expiryYear = watch('expiryYear', '');
  const cvv = watch('cvv', '');

  // Raw value of card number without spaces
  const [rawCardNumber, setRawCardNumber] = React.useState('');

  React.useEffect(() => {
    const formattedYear = expiryYear ? expiryYear.slice(-2) : "YY";
    const expiry = `${expiryMonth || "MM"}/${formattedYear}`;
    
    onUpdate("cardNumber", rawCardNumber); // Update with the raw value without spaces
    onUpdate("cardHolder", cardHolder);
    onUpdate("expiryMonth", expiryMonth);
    onUpdate("expiryYear", expiryYear);
    onUpdate("expiry", expiry);
  }, [rawCardNumber, cardHolder, expiryMonth, expiryYear]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => (currentYear + i).toString()); // Show full year format
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const getCardType = (cardNumber: string) => {
    if (/^4/.test(cardNumber)) return 'visa'; // Visa comença amb 4
    if (/^5[1-5]/.test(cardNumber)) return 'mastercard'; // MasterCard comença amb 51-55
    if (/^3[47]/.test(cardNumber)) return 'amex'; // American Express comença amb 34 o 37
    if (/^6011/.test(cardNumber)) return 'discover'; // Discover comença amb 6011 o 65
    if (/^9792/.test(cardNumber)) return 'troy'; // Troy comença amb 9792
    return 'visa'; // Si no coincideix amb cap, logotip per defecte
  };
  

  const formatCardNumber = (text: string, cardType: string) => {
    const cleaned = text.replace(/\D+/g, ''); // Remove all non-numeric characters
  
    if (cardType === "amex") {
      // Amex format: #### ###### #####
      return cleaned
        .replace(/(\d{1,4})(\d{1,6})?(\d{1,5})?/, (_, g1, g2, g3) =>
          [g1, g2, g3].filter(Boolean).join(" ")
        )
        .trim(); // Join groups with spaces and trim extra spaces
    }
  
    // Default format: #### #### #### ####
    return cleaned
      .replace(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/, (_, g1, g2, g3, g4) =>
        [g1, g2, g3, g4].filter(Boolean).join(" ")
      )
      .trim(); // Join groups with spaces and trim extra spaces
  };
  
  
  
  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\D+/g, ''); // Remove all non-numeric characters
    const cardType = getCardType(cleaned); // Detect the card type
  
    // Limit the maximum length based on the card type
    const maxLength = cardType === "amex" ? 15 : 16;
    const limited = cleaned.slice(0, maxLength); // Limit the input to the max length
  
    const formatted = formatCardNumber(limited, cardType); // Apply the appropriate format for display
  
    setRawCardNumber(limited); // Store the raw value (without spaces)
    setValue("cardNumber", formatted); // Update the displayed value in the form
    onUpdate("cardNumber", limited); // Notify the parent component with the raw value
  };
  
  
  

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.form}>
        <View>
          <Text style={styles.label}>Card Number</Text>
          <Controller
            control={control}
            name="cardNumber"
            defaultValue=""
            render={({ field: { value } }) => (
              <TextInput
                style={[styles.boxyInput, errors.cardNumber && styles.errorInput]}
                keyboardType="number-pad"
                maxLength={19} // Including spaces for formatting
                onChangeText={handleCardNumberChange}
                value={value}
                onFocus={() => onFlipCard(false)}
              />
            )}
          />
          {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber.message}</Text>}
        </View>

        <View>
          <Text style={styles.label}>Card Holder</Text>
          <Controller
            control={control}
            name="cardHolder"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.boxyInput, errors.cardHolder && styles.errorInput]}
                onChangeText={(text) => {
                  onChange(text);
                }}
                value={value}
                onFocus={() => onFlipCard(false)}
              />
            )}
          />
          {errors.cardHolder && <Text style={styles.errorText}>{errors.cardHolder.message}</Text>}
        </View>

        <View style={styles.row}>
          <View style={styles.thirdInput}>
            <Text style={styles.label}>Expiry Month</Text>
            <Controller
              control={control}
              name="expiryMonth"
              defaultValue="" // Set a default value that matches the options
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  style={[styles.picker, errors.expiryMonth && styles.errorInput]}
                  onValueChange={(itemValue) => {
                    onChange(itemValue);
                  }}
                  onFocus={() => onFlipCard(false)}
                >
                  <Picker.Item label="Month" value="" />
                  {months.map((month) => (
                    <Picker.Item key={month} label={month} value={month} />
                  ))}
                </Picker>
              )}
            />
            {errors.expiryMonth && <Text style={styles.errorText}>{errors.expiryMonth.message}</Text>}
          </View>

          <View style={styles.thirdInput}>
            <Text style={styles.label}>Expiry Year</Text>
            <Controller
              control={control}
              name="expiryYear"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  style={[styles.picker, errors.expiryYear && styles.errorInput]}
                  onValueChange={(itemValue) => {
                    onChange(itemValue);
                  }}
                  onFocus={() => onFlipCard(false)}
                >
                  <Picker.Item label="Year" value="" />
                  {years.map((year) => (
                    <Picker.Item key={year} label={year} value={year} />
                  ))}
                </Picker>
              )}
            />
            {errors.expiryYear && <Text style={styles.errorText}>{errors.expiryYear.message}</Text>}
          </View>

          <View style={styles.thirdInput}>
            <Text style={styles.label}>CVV</Text>
            <Controller
              control={control}
              name="cvv"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.boxyInput, errors.cvv && styles.errorInput]}
                  keyboardType="number-pad"
                  maxLength={3}
                  onChangeText={(text) => {
                    const numericText = text.replace(/\D+/g, ''); 
                    onChange(numericText); // Actualitza el valor intern del formulari
                    onUpdate("CVV", numericText); // Notifica el component pare del canvi
                  }}
                  value={value}
                  onFocus={() => onFlipCard(true)} // Gira la targeta al dors quan s'edita el CVV
                />
              )}
            />
            {errors.cvv && <Text style={styles.errorText}>{errors.cvv.message}</Text>}
          </View>
        </View>

        {/* Submit Button Placeholder */}
        <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
  boxyInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  thirdInput: {
    width: '32%',
  },
  picker: {
    height: 40, // Set to be consistent with the cvv text input
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputLabel: {
    paddingBottom: 8, // Add padding between the label and the input
  },
});

export default CreditCardForm;
