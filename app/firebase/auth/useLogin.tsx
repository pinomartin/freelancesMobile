import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

const useLogin = () => {
  const errorMessageInitialState = {emailError: '', passwordError: ''};

  const [loginError, setErrorMessage] = useState(errorMessageInitialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorMessage(errorMessageInitialState);
  }, []);

  const signInWithEmailAndPassword = (email: string, password: string) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setErrorMessage(errorMessageInitialState);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          setErrorMessage({
            ...loginError,
            emailError: 'Ingrese un mail válido',
          });
        }
        if (error.code === 'auth/wrong-password') {
          setErrorMessage({
            ...loginError,
            passwordError: 'La contraseña es incorrecta',
          });
        }
        if (error.code === 'auth/too-many-requests') {
          setErrorMessage({
            ...loginError,
            passwordError: 'Hubo un problema, intenta más tarde',
          });
        }
        if (error.code === 'auth/user-not-found') {
          setErrorMessage({
            ...loginError,
            passwordError: 'Usuario no encontrado :(',
          });
        }
        setIsLoading(false);

        console.log('errorSignInEmail', error);
      });
  };

  const signOut = async () => {
    setIsLoading(true);
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        setErrorMessage(errorMessageInitialState);
        setIsLoading(false);
      });
  };

  return {signInWithEmailAndPassword, signOut, loginError, isLoading};
};

export default useLogin;
