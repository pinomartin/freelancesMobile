import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/home';
import {
  EDIT_PROJECT,
  HELP,
  HOME,
  NEW_PROJECT,
  PROFILE,
  PROJECT_DATA,
  TEST_SCREEN,
} from '../routes';
import ProfileScreen from '../../screens/profile';
import {StatusBar, useColorScheme} from 'react-native';
import AppBar from '../../components/AppBar';
import {HomeRoutes} from '../interface';
import NewProjectScreen from '../../screens/newProject';
import ProjectDataScreen from '../../screens/projectData';
import HelpScreen from '../../screens/help';
import ProjectEditionScreen from '../../screens/projectEdition';
import TestAninationsScreen from '../../screens/tests';

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
      <Stack.Screen name={HELP} component={HelpScreen} />
      <Stack.Screen name={NEW_PROJECT} component={NewProjectScreen} />
      <Stack.Screen name={PROJECT_DATA} component={ProjectDataScreen} />
      <Stack.Screen name={EDIT_PROJECT} component={ProjectEditionScreen} />
      {/* TESTS SCREEN  */}
      <Stack.Screen name={TEST_SCREEN} component={TestAninationsScreen} />
      {/* TESTS SCREEN  */}
    </Stack.Navigator>
  );
}
