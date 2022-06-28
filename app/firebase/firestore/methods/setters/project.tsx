import firestore from '@react-native-firebase/firestore';
import {
  CreateProjectPropsRequest,
  ProjectDTO,
} from '../../../../interfaces/Project';
import {TaskTime} from '../../../../interfaces/TaskTime';
import {finishDateProcessorForm} from '../../../../utils/general/time';
import {PROJECTS} from '../../collections';

// const COLLECTION__NAME = 'Projects';

const addNewProjectToDB = async (
  project: CreateProjectPropsRequest,
  userID: string | null | undefined, //VER ESTO !!!!
) => {
  try {
    const response = await firestore()
      .collection(PROJECTS)
      .add({
        userId: userID, //email fron loged USER
        name: project.name,
        client: project.client,
        description: project.description,
        type: project.type,
        amountXHour: project.amountXHour,
        estimatedHours: project.estimatedHours,
        estimatedTotal: project.estimatedTotal,
        estimatedStartDate: project.estimatedStartDate,
        estimatedHoursPerDay: project.estimatedHoursPerDay,
        estimatedFinishDate: project.estimatedFinishDate,
        creationDate: new Date(),
        isDone: false,
        tasks: project.tasks ? project.tasks : [],
      });
    if (response && response.id) {
      return {
        kind: 'ok',
        id: response.id,
        message: 'Proyecto creado exitosamente !!!',
      };
    }
  } catch (error) {
    return {
      kind: 'rejected',
      data: error,
      message: 'Ocurrió un error ! No se pudo crear nuevo proyecto en DB',
    };
  }
};

const updateProjectDataDB = async (project: ProjectDTO, projectUID: string) => {
  try {
    await firestore()
      .collection(PROJECTS)
      .doc(projectUID)
      .update({
        name: project.name,
        client: project.client,
        description: project.description,
        amountXHour: project.amountXHour,
        estimatedHours: project.estimatedHours,
        estimatedTotal: project.estimatedTotal,
        estimatedHoursPerDay: project.estimatedHoursPerDay,
        estimatedFinishDate: finishDateProcessorForm(
          `${project.estimatedFinishDate}`,
        ),
        tasks: project.tasks,
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (projectUID: string) => {
  let response = {kind: '', message: '', data: {} as any};
  try {
    await firestore().collection(PROJECTS).doc(projectUID).delete();
    response = {
      kind: 'ok',
      message: 'Proyecto eliminado correctamente',
      data: projectUID,
    };
    console.log(response, 'deleted Project');
  } catch (error) {
    response = {
      kind: 'error',
      message: 'Ocurrió un error al eliminar el proyecto. Intenta nuevamente',
      data: error,
    };
  }
  console.log(response, 'RESPONSE DELETE');
  return response;
};

const finishProjectDB = async (projectUID: string, finishDate: number) => {
  try {
    await firestore().collection(PROJECTS).doc(projectUID).update({
      // name: project.name,
      // client: project.client,
      // description: project.description,
      // amountXHour: project.amountXHour,
      // estimatedHours: project.estimatedHours,
      // estimatedTotal: project.estimatedTotal,
      // estimatedHoursPerDay:project.estimatedHoursPerDay,
      // estimatedFinishDate: finishDateProcessorForm(
      //   `${project.estimatedFinishDate}`
      // ),
      isDone: true,
      realFinishDate: finishDate,
    });
  } catch (error) {
    console.log(error);
  }
};

const addNewTaskTimeToDB = async (
  task: TaskTime,
  project: ProjectDTO,
): Promise<any> => {
  try {
    await firestore()
      .collection(PROJECTS)
      .doc(project.uid)
      .update({
        ...project,
        tasks: [
          project.tasks,
          {
            description: task.description,
            hours: task.hours,
            minutes: task.minutes,
            seconds: task.seconds,
            creationDate: task.creationDate,
            startTimerDate: task.startTimerDate,
            stopTimerDate: task.stopTimerDate,
            isDone: task.isActive,
            isFastHourCharge: task.isFastHourCharge,
            projectUID: task.projectUID,
            userUID: task.clientUID,
            uid: 'id' + Math.random().toString(16).slice(2),
          },
        ],
      });
  } catch (error) {
    console.log('No se puede guardar tarea en DB');
  }
};

const updateTask = async (task: TaskTime, taskUID: string) => {
  try {
    await firestore().collection('timetasks').doc(taskUID).update({
      description: task.description,
    });
  } catch (error) {
    console.log('No se pudo actualizar task en BD');
  }
};

const deleteTask = async (id: string | undefined) => {
  try {
    await firestore().collection('timetasks').doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};

const addFastBurnHourToDB = async (
  projectUID: string,
  creationDate: string,
) => {
  try {
    await firestore().collection('fastburnhours').doc(projectUID).set({
      creationDate: creationDate,
    });
  } catch (error) {
    console.log('No se pudo guardar hora rapida en DB');
  }
};

const addExpenseToDB = async (expense: any): Promise<any> => {
  try {
    await firestore().collection('expenses').add({
      description: expense.description,
      amount: expense.amount,
      projectUID: expense.projectUID,
      userUID: expense.clientUID,
    });
  } catch (error) {
    console.log('No se puede guardar gasto en DB');
  }
};

const deleteExpense = async (id: string) => {
  try {
    await firestore().collection('expenses').doc(id).delete();
  } catch (error) {
    console.log(error, 'No se pudo eliminar Gasto de DB');
  }
};

export {
  addNewProjectToDB,
  addNewTaskTimeToDB,
  deleteProject,
  deleteTask,
  updateProjectDataDB,
  finishProjectDB,
  updateTask,
  addFastBurnHourToDB,
  addExpenseToDB,
  deleteExpense,
};
