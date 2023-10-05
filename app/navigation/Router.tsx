import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';
import {AuthContext} from '../context/AuthContext';
import {ProjectProvider} from '../context/ProjectContext';
import Loader from '../components/Loader';

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export default function Router(props: NavigationProps) {
  const {user, setUser} = useContext(AuthContext);
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
    <NavigationContainer {...props}>
      {user ? (
        <ProjectProvider>
          <HomeStack />
        </ProjectProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
