import React, {useContext, useState, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';
import {AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';
import {useColorScheme} from 'react-native';

export default function Router() {
  const {user, setUser} = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    //@ts-ignore
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loader size={'large'} isFullScreen />;
  }
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
