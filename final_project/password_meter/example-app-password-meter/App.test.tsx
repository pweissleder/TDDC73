import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PasswordForm, PasswordFormData, QualityAttribute,} from 'react-native-password-meter-component';


// Sample PasswordFormData and QualityAttributes for testing
const testPasswordFormData = {
  color_background: '#cccccc',
  color_background_from: '#777777',
  color_background_password_field: '#ffffff',
  current_color_shadow: '#777776',
  color_shadow_weak: 'red',
  color_shadow_medium: 'yellow',
  color_shadow_strong: 'lightgreen',
};


// Example "evaluate" implementations 
function evalAtLeast8Chars(passwordText: string) {
  // 20 if length >= 8, else 0
  return passwordText.length >= 8 ? 20 : 0;
}
function evalContainsNumber(passwordText: string) {
  // 10 if there's at least one digit, else 0
  return /\d/.test(passwordText) ? 10 : 0;
}
function evalContainsSpecial(passwordText: string) {
  // 10 points per special char, up to 50
  const specials = passwordText.match(/[^A-Za-z0-9]/g) || [];
  return Math.min(specials.length * 10, 50);
}


// Example QualityAttributes implementations 
const testQualityAttributes: QualityAttribute[] = [
  {
    name: 'At least 8 chars',
    checked: false,
    max_sec_value: 20,
    current_sec_value: 0,
    sec_threshhold: 8,
    evaluate: evalAtLeast8Chars,
  },
  {
    name: 'Contains number',
    checked: false,
    max_sec_value: 10,
    current_sec_value: 0,
    sec_threshhold: 10,
    evaluate: evalContainsNumber,
  },
  {
    name: 'Contains special char',
    checked: false,
    max_sec_value: 50,
    current_sec_value: 0,
    sec_threshhold: 10,
    evaluate: evalContainsSpecial, 
  },
];


//TESTS

describe('PasswordForm Tests', () => {

  // UNIT TESTS

  describe('Unit Tests', () => {
    it('updates current_color_shadow based on ratio thresholds (weak, medium, strong)', () => {
      // Render the PasswordForm
      const { getByPlaceholderText, getByTestId } = render(
        <PasswordForm
          passwordForm={testPasswordFormData}
          qualityAttributes={testQualityAttributes}
          threshold_sec_score={40}
          title="Test Password Form"
        />
      );

      // dynamic Components
      const passwordInput = getByPlaceholderText('Password_text');
      const shadowView = getByTestId('password-form');

          // 2) Type a password that triggers a "weak" ratio (> 0.2)
          fireEvent.changeText(passwordInput, 'assddfghw');
          expect(shadowView).toBeTruthy();
          expect(shadowView).toHaveStyle({ shadowColor: 'red' });;
    
          // 2) Type a password that triggers a "medium" ratio (> 0.5)
          fireEvent.changeText(passwordInput, '!!!!!'); // Assuming '!!!!!' gives 50 points
          expect(shadowView).toBeTruthy();
          expect(shadowView).toHaveStyle({ shadowColor: 'yellow' });
    
          // 3) Type a password that triggers a "strong" ratio (> 0.8)
          fireEvent.changeText(passwordInput, 'abcd!!!!!!!efgh5!6!!'); // Assuming max points
          expect(shadowView).toBeTruthy();
          expect(shadowView).toHaveStyle({ shadowColor: 'lightgreen' });

    });

    it('checks each evaluate function and updates `checked` once threshold is surpassed', () => {
      // 'At least 8 chars' => 20 if >= 8, else 0
      expect(evalAtLeast8Chars('short')).toBe(0);
      expect(evalAtLeast8Chars('longenough')).toBe(20);

      // 'Contains number' => 10 if at least 1 digit, else 0
      expect(evalContainsNumber('abc')).toBe(0);
      expect(evalContainsNumber('a1b2')).toBe(10);

      // Test to show that the test fails with wrong implementation: uncomment to test
      // 'Contains number' => 10 if at least 1 digit, else 0
      // expect(evalContainsNumber('abc')).toBe(0);
      // expect(evalContainsNumber('a1b2')).toBe(20);


      // 'Contains special char' => 10 points per special, up to 50
      expect(evalContainsSpecial('abc')).toBe(0);
      expect(evalContainsSpecial('ab!!')).toBe(20);
      expect(evalContainsSpecial('***********')).toBe(50); // 11 stars => would be 110, but capped at 50
    });
  });


  // INTEGRATION TESTS

  describe('Integration Test', () => {
    it('Button is enabled only after threshold is reached', () => {
      const { getByPlaceholderText, getByText } = render(
        <PasswordForm
          passwordForm={testPasswordFormData}
          qualityAttributes={testQualityAttributes}
          threshold_sec_score={40}
          title="Test Password Form"
        />
      );

      // The Continue button initially disabled
      const button = getByText('Continue');
      expect(button).toBeDisabled(); 

      // Type a password that yields total 30 => below threshold 40 => still disabled
      // e.g. 8 chars => 20 points + 1 digit => 10 => total=30
      fireEvent.changeText(getByPlaceholderText('Password_text'), 'abcd6534');
      expect(button).toBeDisabled();

      // Password total 50 => above threshold => now enabled
      // e.g. >=8 chars => 20, plus 1 digit => 10, plus 2 specials => 20 => total=50
      fireEvent.changeText(getByPlaceholderText('Password_text'), 'abcd1234##');
      expect(button).not.toBeDisabled();
    });
  });


  // END-TO-END TEST (Pseudo-approach)

  describe('End-to-End Test', () => {
    it('Calculates security value of two different passwords and verifies UI changes', () => {
      const { getByPlaceholderText, getByText, getByTestId} = render(
        <PasswordForm
          passwordForm={testPasswordFormData}
          qualityAttributes={testQualityAttributes}
          threshold_sec_score={40}
          title="Test Password Form"
        />
      );

      const input = getByPlaceholderText('Password_text');
      const continueButton = getByText('Continue');
      const shadowView = getByTestId('password-form');

      // 1) Weak password
      fireEvent.changeText(input, 'weak'); // 4 chars, no digits, no special  => 0 points
      // That surpasses threshold 40 => expect button is enabled
      expect(continueButton).toBeDisabled();

      // Check color is default #808080
      expect(shadowView).toBeTruthy();
      expect(shadowView).toHaveStyle({ shadowColor: '#808080' });;


      // 2) Enter a strong password
      fireEvent.changeText(input, 'abcd1!!!!'); // 8 chars => 20, + digit => 10, + 4 special => 40 => total=70
   

      // Check that each attribute icon is now "checked" and that color is  yellow
      expect(shadowView).toBeTruthy();
      expect(shadowView).toHaveStyle({ shadowColor: 'lightgreen' });
         // Surpasses threshold 40 => expect button is enabled

      expect(continueButton).not.toBeDisabled();

    });
  });
});