import {useContext, useState} from 'react';
import {ProjectContext} from '../../context/ProjectContext';
import {ProjectDTO} from '../../interfaces/Project';
import {isEqual} from 'lodash';

const useProjectEdition = () => {
  const {projectSelected} = useContext(ProjectContext);

  const [projectEdit, setProjectEdit] = useState<ProjectDTO | null>(
    projectSelected,
  );
  //   const [disabled, setDisable] = useState(true);

  const isProjectsEqual = () => {
    console.log(isEqual(projectEdit, projectSelected));
    return isEqual(projectEdit, projectSelected);
  };

  return {
    setProjectEdit,
    projectEdit,
    isProjectsEqual,
  };
};

export default useProjectEdition;
