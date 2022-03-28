/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

// import * as storage from './app/utils/storage';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Providers from './app/navigation';
import {useColorScheme} from 'react-native';

const App = () => {
  const colorScheme = useColorScheme();

  // const {
  //   initialNavigationState,
  //   onNavigationStateChange,
  //   isRestored: isNavigationStateRestored,
  // } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  return (
    <ApplicationProvider
      {...eva}
      // theme={true ? eva.dark : eva.light}>
      theme={colorScheme === 'dark' ? eva.dark : eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      {/* <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}>
      <Screens />
    </NavigationContainer> */}
      <Providers />
    </ApplicationProvider>
  );
};

export default App;
