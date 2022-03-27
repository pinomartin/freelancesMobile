import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {addUserToDB} from '../firestore/users';

const useSignUp = () => {
  const errorInitialState = {
    emailError: '',
    passwordError: '',
  };

  useEffect(() => {
    setErrorMessage(errorInitialState);
  }, []);

  const [registerError, setErrorMessage] = useState(errorInitialState);
  const [isRegisterLoading, setIsLoading] = useState(false);

  const createAccountWithEmail = (email: string, password: string) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log('User account created & signed in!');
        setIsLoading(false);
        setErrorMessage(errorInitialState);
        addUserToDB(response.user.email!, response.user.uid).then(e =>
          console.log(e),
        );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage({
            ...registerError,
            emailError: 'That email address is already in use!',
          });
        }

        if (error.code === 'auth/invalid-email') {
          setErrorMessage({
            ...registerError,
            emailError: 'That email address is invalid!',
          });
        }
        if (error.code === 'auth/weak-password') {
          setErrorMessage({
            ...registerError,
            passwordError: 'Debe ingresar 8 o mas caracteres',
          });
        }

        setIsLoading(false);
      });
  };
  return {createAccountWithEmail, registerError, isRegisterLoading};
};

export default useSignUp;
