import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {ProjectDTO} from '../interfaces/Project';

interface ContextProps {
  projectSelected: ProjectDTO | null;
  setProjectSelected: Dispatch<SetStateAction<null>>;
  setUserProjects: Dispatch<SetStateAction<null>>;
  clearProjectState: () => void;
  userProjects: ProjectDTO[] | null;
}

export const ProjectContext = createContext({} as ContextProps);

export const ProjectProvider = ({children}: any) => {
  const [projectSelected, setProjectSelected] = useState(null);
  const [userProjects, setUserProjects] = useState(null);

  const clearProjectState = () => {
    setProjectSelected(null);
    setUserProjects(null);
  };

  return (
    <ProjectContext.Provider
      value={{
        userProjects,
        projectSelected,
        setUserProjects,
        setProjectSelected,
        clearProjectState,
      }}>
      {children}
    </ProjectContext.Provider>
  );
};
