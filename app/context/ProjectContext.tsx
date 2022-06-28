// import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {ProjectDTO} from '../interfaces/Project';
// import useLogin from '../firebase/auth/useLogin';
// import useSignUp from '../firebase/auth/useSignUp';

interface ContextProps {
  projectSelected: ProjectDTO | null;
  setProjectSelected: Dispatch<SetStateAction<null>>;
  clearProjectState: () => void;
  // isLoading: boolean;
  // login: (email: string, password: string, callback: () => void) => void;
  // register: (email: string, password: string, callback: () => void) => void;
  // logout: () => void;
  // loginError: {emailError: string; passwordError: string};
  // registerError: {emailError: string; passwordError: string};
}

export const ProjectContext = createContext({} as ContextProps);

export const ProjectProvider = ({children}: any) => {
  const [projectSelected, setProjectSelected] = useState(null);

  const clearProjectState = () => {
    setProjectSelected(null);
  };
  // const {signInWithEmailAndPassword, signOut, isLoading, loginError} =
  //   useLogin();
  // const {createAccountWithEmail, isRegisterLoading, registerError} =
  //   useSignUp();

  return (
    <ProjectContext.Provider
      value={{
        projectSelected,
        setProjectSelected,
        clearProjectState,
      }}>
      {children}
    </ProjectContext.Provider>
  );
};
