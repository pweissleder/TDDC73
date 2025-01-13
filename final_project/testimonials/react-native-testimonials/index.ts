import { registerRootComponent } from 'expo';

export {default as TestimonySection} from './src/TestimonySection'

export {default as TestimonyItem} from './src/TestimonySection'

export {default as TestimonyCard} from './src/TestimonyCard'

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
