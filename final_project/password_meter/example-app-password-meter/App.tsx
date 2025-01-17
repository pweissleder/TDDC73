import React from 'react';
import { SafeAreaView } from 'react-native';
import { PasswordForm, PasswordFormData, QualityAttribute,} from 'react-native-password-meter-component';

export default function App() {
  const passwordFormData: PasswordFormData = {
    color_background: '#eeeeee',
    color_background_from: '#888888',
    color_background_password_field: '#ffffff',
    color_title: '#ffffff',
    color_password_text: '#000000',
    color_continue_button_active: '#6200EE',
    current_color_shadow: '#808080', // default grey
    text_font: 'System',
    color_shadow_weak: 'red',
    color_shadow_medium: 'orange',
    color_shadow_strong: 'lightgreen',
    image_quality_attribute_checked: require('./assets/checked.png'),
    image_quality_attribute_unchecked: require('./assets/unchecked.png'),
    image_lock: require('./assets/lock.png'),
  };
  function sum(a: any, b: any) {
    return a + b;
  }
  
  const initialQualityAttributes: QualityAttribute[] = [
    {
      name: 'At least 8 chars',
      checked: false,
      max_sec_value: 20,
      current_sec_value: 0,
      sec_threshhold: 8,
      evaluate: (passwordText: string) => {
        // 1 point per character until 20 points are reached
        return Math.min(passwordText.length, 20)
      },
    },
    {
      name: 'Contains number',
      checked: false,
      max_sec_value: 10,
      current_sec_value: 0,
      sec_threshhold: 10,
      evaluate: (passwordText: string) => {
        // If at least one digit, return 10 points, else 0
        return /\d/.test(passwordText) ? 10 : 0;
      },
    },
    {
      name: 'Contains special char',
      checked: false,
      max_sec_value: 30,
      current_sec_value: 0,
      sec_threshhold: 10,
      evaluate: (passwordText: string) => {
        // "special char" as anything not A-Z, a-z, 0-9
        const specials = passwordText.match(/[^A-Za-z0-9]/g) || [];
        
        // 10 points per special character, up to 50 max
        const rawValue = specials.length * 10;
        return rawValue > 30 ? 30 : rawValue;
      },
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PasswordForm
        passwordForm={passwordFormData}
        qualityAttributes={initialQualityAttributes}
        threshold_sec_score={20}
        title="Set Your Password"
      />
    </SafeAreaView>
  );
}
