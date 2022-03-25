import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/login';
import {LOGIN} from '../routes';

export type AuthStackParam = {
  login: undefined;
};

const Stack = createStackNavigator<AuthStackParam>();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={LOGIN}>
      <Stack.Screen
        name={LOGIN}
        component={LoginScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}
