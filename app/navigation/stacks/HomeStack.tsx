import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/home';
import {HOME, NEW_PROJECT, PROFILE, TIMER} from '../routes';
import ProfileScreen from '../../screens/profile';
import {StatusBar, useColorScheme} from 'react-native';
import AppBar from '../../components/AppBar';
import {HomeRoutes} from '../interface';
import TimerScreen from '../../screens/timer';
import NewProjectScreen from '../../screens/newProject';

const Stack = createStackNavigator<HomeRoutes>();

export const getAppBar = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <StatusBar
        animated
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <AppBar
        {...props.options.appBar}
        iconLeft={props.navigation.canGoBack() ? 'arrow-back' : undefined}
      />
    </>
  );
};

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: getAppBar,
      }}>
      <Stack.Screen name={HOME} component={HomeScreen} />
      <Stack.Screen name={PROFILE} component={ProfileScreen} />
      <Stack.Screen name={TIMER} component={TimerScreen} />
      <Stack.Screen name={NEW_PROJECT} component={NewProjectScreen} />
    </Stack.Navigator>
  );
}
