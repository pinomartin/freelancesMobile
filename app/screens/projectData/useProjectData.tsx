import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {Alert} from 'react-native';
import {ProjectContext} from '../../context/ProjectContext';
import {deleteProject} from '../../firebase/firestore/methods/setters/project';
import {HOME} from '../../navigation/routes';

const useProjectData = () => {
  const {projectSelected} = useContext(ProjectContext);

  const {navigate} = useNavigation();

  const projectTypeUIHandler = () => {
    switch (projectSelected!.type) {
      case 0:
        return {
          labelType: 'Por Hora 🕰️',
          labelHour: 'Horas estimadas',
          amount: projectSelected?.amountXHour,
          hours: projectSelected?.estimatedHours,
          total: projectSelected?.estimatedTotal,
        };
      case 1:
        return {
          labelType: 'Presupuesto Total 💵',
          labelHour: 'Horas por día',
          amount: projectSelected?.estimatedTotal,
          hours: projectSelected?.estimatedHoursPerDay,
          total: projectSelected?.estimatedTotal,
        };
      default:
        return {labelType: '', labelHour: '', amount: 0, hours: 0, total: 0};
    }
  };

  const onDeleteProject = async (id: string) => {
    console.log('sou');
    Alert.alert('Eliminar proyecto', 'Estas seguro?', [
      {
        text: 'SI',
        onPress: async () => {
          const response = await deleteProject(id);
          if (response.kind !== 'ok') {
            Alert.alert('Error :(!!!', response.message);
            return;
          }
          if (response.kind === 'ok') {
            Alert.alert('Exito :) !!!', response.message);
            navigate(HOME as never);
            return;
          }
        },
      },
      {text: 'NO', onPress: () => {}},
    ]);
  };

  return {projectSelected, projectTypeUIHandler, onDeleteProject};
};

export default useProjectData;
