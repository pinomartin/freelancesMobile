import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import useLogin from '../firebase/auth/useLogin';
import useSignUp from '../firebase/auth/useSignUp';

interface ContextProps {
  user: FirebaseAuthTypes.User | null;
  setUser: Dispatch<SetStateAction<null>>;
  isLoading: boolean;
  login: (email: string, password: string, callback: () => void) => void;
  register: (email: string, password: string, callback: () => void) => void;
  logout: () => void;
  loginError: {emailError: string; passwordError: string};
  registerError: {emailError: string; passwordError: string};
}

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState(null);
  const {signInWithEmailAndPassword, signOut, isLoading, loginError} =
    useLogin();
  const {createAccountWithEmail, isRegisterLoading, registerError} =
    useSignUp();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading: isLoading || isRegisterLoading,
        login: (email: string, password: string) =>
          signInWithEmailAndPassword(email, password),
        register: (email: string, password: string) => {
          try {
            createAccountWithEmail(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await signOut();
          } catch (e) {
            console.error(e);
          }
        },
        loginError: loginError,
        registerError: registerError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
