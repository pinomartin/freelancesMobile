import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {ProjectContext} from '../../context/ProjectContext';
import {
  addNewTaskTimeToDB,
  deleteProject,
} from '../../firebase/firestore/methods/setters/project';
import {HOME} from '../../navigation/routes';
import {getDifferenceInSeconds} from '../../utils/general/time';
import useHome from '../home/useHome';

const TASK__INITIAL__STATE = {
  description: '',
  hours: 0,
  minutes: 0,
  seconds: 0,
  secondsByDate: 0,
  creationDate: new Date(),
  startTimerDate: new Date(),
  stopTimerDate: new Date(),
  isDone: false,
  isFastHourCharge: false,
  projectUID: '',
  userUID: '',
};

const useProjectData = () => {
  const {projectSelected, setProjectSelected} = useContext(ProjectContext);
  const {user} = useHome();

  const [taskData, setTaskData] = useState(TASK__INITIAL__STATE);
  const [showData, setShowData] = useState(false);
  const [showTaskDescriptionInput, setShowTaskDescriptionInput] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

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

  const showDataHandler = () => {
    setShowData(!showData);
  };

  const taskDescriptionSetter = (e: string) => {
    setTaskData({...taskData, description: e});
  };

  const onEditProject = () => {};

  const onResetTimer = () => {
    setTaskData(TASK__INITIAL__STATE);
    setShowTaskDescriptionInput(false);
    setResetTimer(true);
  };

  const onStartTimer = () => {
    setResetTimer(false);
    setTaskData({...taskData, startTimerDate: new Date()});
  };

  const onStopTimer = (seconds: number) => {
    setTaskData({...taskData, stopTimerDate: new Date(), seconds: seconds});
    setShowTaskDescriptionInput(true);
  };

  const onSaveTimePress = () => {
    console.log('time');
    setTaskData({
      ...taskData,
      projectUID: projectSelected?.uid!,
      isDone: true,
      secondsByDate: getDifferenceInSeconds(
        taskData.stopTimerDate,
        taskData.startTimerDate,
        'trunc',
      ),
      userUID: user?.email!,
    });
    setShowModal(true);
    // if (taskData.description && taskData.isDone) {
    //   console.log('entre al IF !!!!!');
    //   await addNewTaskTimeToDB(taskData, projectSelected!);
    // }
  };

  const saveTimeonDB = async () => {
    const response = await addNewTaskTimeToDB(taskData, projectSelected!);
    setShowModal(false);
    if (response.kind !== 'ok') {
      Alert.alert('Ocurrio un error', response?.message);
      return;
    }
    if (response.kind === 'ok') {
      Alert.alert('Tarea guardada :)', response.message);
      setProjectSelected({
        ...projectSelected,
        //@ts-ignore-next-line
        tasks: [...projectSelected?.tasks, taskData],
      });
      onResetTimer();
      return;
    }
  };

  // console.log(timerData);

  const onDeleteProject = async (id: string) => {
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

  return {
    projectSelected,
    projectTypeUIHandler,
    onDeleteProject,
    taskData,
    onResetTimer,
    onStartTimer,
    onStopTimer,
    onSaveTimePress,
    showDataHandler,
    showTaskDescriptionInput,
    taskDescriptionSetter,
    showData,
    showModal,
    saveTimeonDB,
    resetTimer,
  };
};

export default useProjectData;
