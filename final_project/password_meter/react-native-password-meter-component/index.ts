export {default as PasswordForm} from './src/PasswordForm';
export {default as PasswordFormData} from './src/PasswordForm';
export {default as QualityAttribute} from './src/PasswordForm';


import App from './App';
import { registerRootComponent } from 'expo';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);