import React, { useState, useEffect, FC } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

// Types

// Interface for a single Quality Attribute.
export interface QualityAttribute {
  name: string;

  checked: boolean;
  max_sec_value: number;
  current_sec_value: number;
  sec_threshhold: number;

  evaluate?: (passwordText: string) => number;
}

// Interface for the styling / visual customization.
export interface PasswordFormData {
  color_background: string;                  
  color_background_from: string;             
  color_background_password_field: string;  

  // Text
  color_title: string;                    
  color_password_text: string;      

  text_font: string;             

  //Button
  color_continue_button_active: string;                         

  // Card shadow
  current_color_shadow: string;             // dynamic color shadow
  color_shadow_weak: string;                
  color_shadow_medium: string;              
  color_shadow_strong: string;              

  // Images
  image_quality_attribute_checked: any;      
  image_quality_attribute_unchecked: any;   
  image_lock: any;                         
}

// Props for the main PasswordForm component.
interface PasswordFormProps {
  passwordForm: PasswordFormData;
  qualityAttributes: QualityAttribute[];
  title?: string;
  threshold_sec_score: number;
}

// Showing the password strength in a progress bar.
interface PasswordStrengthMeterProps {
  width: number;           // the container width for the bar
  strengthRatio: number;   // fraction (0.0 -> 1.0) how strong the password is
  shadowColor: string;     // color for the meter
}

// Components

// PasswordStrengthMeter
const PasswordStrengthMeter: FC<PasswordStrengthMeterProps> = ({
  width,
  strengthRatio,
  shadowColor,
}) => {
  const barWidth = width * Math.min(strengthRatio, 1);

  return (
    <View style={[styles.strengthMeterContainer, { width }]}>
      <View style={[styles.strengthMeterBar, { width: barWidth, backgroundColor: shadowColor }]} />
    </View>
  );
};

// Main PasswordForm 
const PasswordForm: FC<PasswordFormProps> = ({
  passwordForm,
  qualityAttributes,
  title = 'Title',
  threshold_sec_score,
}) => {

    // State hooks
  const [passwordText, setPasswordText] = useState<string>('');
  const [attributes, setAttributes] = useState<QualityAttribute[]>(qualityAttributes);
  const [currentSecScore, setCurrentSecScore] = useState<number>(0);
  const [maxSecScore, setMaxSecScore] = useState<number>(0);
  const [shadowColor, setShadowColor] = useState<string>(passwordForm.current_color_shadow);

  // Initialize the maxSecScore once from all attributes.
 
  useEffect(() => {
    const totalMax = attributes.reduce((sum, attr) => sum + attr.max_sec_value, 0);
    setMaxSecScore(totalMax);
  }, [attributes]);

  // Evaluate quality attributes whenever password changes.
  useEffect(() => {
    // 1. Evaluate each attribute’s current_sec_value
    const updatedAttributes = attributes.map((attr) => {
      let updatedCurrent = 0;

      // If custom evaluate function, else dummy logic
      if (attr.evaluate) {
        updatedCurrent = attr.evaluate(passwordText);
      } else {
        // Dummy logic: match length threshold
        updatedCurrent =
          passwordText.length >= attr.sec_threshhold ? attr.max_sec_value : 0;
      }

      // Mark as checked if the threshold is surpassed
      const updatedChecked = updatedCurrent >= attr.sec_threshhold;

      return {
        ...attr,
        current_sec_value: updatedCurrent,
        checked: updatedChecked,
      };
    });

    // 2. Update the attribute array
    setAttributes(updatedAttributes);

    // 3. Compute new current_sec_score
    const totalCurrentScore = updatedAttributes.reduce(
      (sum, attr) => sum + attr.current_sec_value,
      0
    );
    setCurrentSecScore(totalCurrentScore);

    // 4. Update shadow color based on ratio
    if (maxSecScore > 0) {
      const ratio = totalCurrentScore / maxSecScore;
      if (ratio > 0.8) {
        setShadowColor(passwordForm.color_shadow_strong);
      } else if (ratio > 0.5) {
        setShadowColor(passwordForm.color_shadow_medium);
      } else if (ratio > 0.2) {
        setShadowColor(passwordForm.color_shadow_weak);
      } else {
        setShadowColor('#808080'); // default gray
      }
    }
  }, [passwordText, maxSecScore]);

  // Helper to see if the continue can be activated
  const canContinue = currentSecScore >= threshold_sec_score;

  // Render single Quality Attribute row
  const renderQualityAttribute = (attr: QualityAttribute, index: number) => {
    const iconSource = attr.checked
      ? passwordForm.image_quality_attribute_checked
      : passwordForm.image_quality_attribute_unchecked;

    return (
      <View key={index} style={styles.qualityRow}>
        <Image source={iconSource} style={styles.checkboxIcon} />
        <Text style={[styles.qualityText, { fontFamily: passwordForm.text_font }]}>
          {attr.name}
        </Text>
      </View>
    );
  };


  // Form Component itselve
  return (
    <View style={[styles.root, { backgroundColor: passwordForm.color_background }]}>
      {/* Container that simulates the “card”  */}
      <View
        style={[
          styles.card, 
          {
            backgroundColor: passwordForm.color_background_from,
            //Override for iOS/Android shadow color 
            shadowColor: shadowColor,

            //Platform check for web 
            ...(Platform.OS === 'web'
              ? {
                  boxShadow: `5px 10px 8px ${shadowColor}`,
                }
              : null),
          },
        ]}
      >
        {/* Title and Icon */}
        <View style={styles.headerContainer}>
          <Image
            source={passwordForm.image_lock}
            style={{ width: 40, height: 40, marginBottom: 8 }}
            resizeMode="contain"
          />
          <Text style={[styles.titleText, { color: passwordForm.color_title, fontFamily: passwordForm.text_font }]}>
            {title}
          </Text>
        </View>

        {/* Password TextInput */}
        <TextInput
          style={[
            styles.passwordInput,
            {
              backgroundColor: passwordForm.color_background_password_field,
              color: passwordForm.color_password_text,
              fontFamily: passwordForm.text_font,
            },
          ]}
          placeholder="Password_text"
          placeholderTextColor="#999"
          secureTextEntry
          value={passwordText}
          onChangeText={setPasswordText}
        />

        {/* Password Strength Meter */}
        <PasswordStrengthMeter
          width={200}
          strengthRatio={maxSecScore === 0 ? 0 : currentSecScore / maxSecScore}
          shadowColor={shadowColor}
        />

        {/* Quality Attributes */}
        <View style={styles.qualityList}>
          {attributes.map(renderQualityAttribute)}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          disabled={!canContinue}
          style={[
            styles.continueButton,
            {
              backgroundColor: canContinue
                ? passwordForm.color_continue_button_active
                : '#999',
            },
          ]}
        >
          <Text style={[styles.continueButtonText, { fontFamily: passwordForm.text_font }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


// Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 600,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',

    // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,

    // Android shadow
    elevation: 6,
    },
  headerContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  passwordInput: {
    width: '100%',
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  strengthMeterContainer: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginBottom: 16,
    overflow: 'hidden',
  },
  strengthMeterBar: {
    height: 8,
    borderRadius: 4,
  },
  qualityList: {
    width: '100%',
    marginVertical: 8,
  },
  qualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkboxIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  qualityText: {
    fontSize: 16,
  },
  continueButton: {
    width: '100%',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PasswordForm;