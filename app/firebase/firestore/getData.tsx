import firestore from '@react-native-firebase/firestore';
import {ProjectDTO} from '../../interfaces/Project';
import {PROJECTS} from './collections';

const getProjectsFromUser = async (userId: string) => {
  try {
    const userprojects = await firestore()
      .collection(PROJECTS)
      .where('userId', '==', userId)
      .orderBy('creationDate', 'desc')
      .get();
    const userprojectsData = userprojects.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {data: userprojectsData as ProjectDTO[], kind: 'ok'};
  } catch (error) {
    return {
      data: [],
      message: error,
      kind: 'error',
    };
  }
};

const getProjectByID = async (projectID: string | any) => {
  const projectFromDB: any = await firestore()
    .collection(PROJECTS)
    .doc(projectID)
    .get();
  const singleProject = await projectFromDB.data();
  return singleProject;
};

const streamProject = (projectUID: string, observer: any) => {
  return firestore().collection(PROJECTS).doc(projectUID).onSnapshot(observer);
};

const getTasksFromProjectUser = async (userId: string, projectUID: string) => {
  const tasks: any = await firestore()
    .collection('timetasks')
    .where('userUID', '==', userId)
    .where('projectUID', '==', projectUID)
    .orderBy('creationDate', 'desc')
    .get();
  const userprojectsData = await tasks.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userprojectsData;
};

const streamTasksFromProject = (
  userId: string,
  projectUID: string,
  observer: any,
) => {
  return firestore()
    .collection('timetasks')
    .where('userUID', '==', userId)
    .where('projectUID', '==', projectUID)
    .orderBy('creationDate', 'desc')
    .onSnapshot(observer);
};

const getAllTasksFromUser = async (userId: string) => {
  const tasks: any = await firestore()
    .collection('timetasks')
    .where('userUID', '==', userId)
    .get();
  const userprojectsData = await tasks.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userprojectsData;
};

const streamExpensesFromProject = (
  userId: string,
  projectUID: string,
  observer: any,
) => {
  return firestore()
    .collection('expenses')
    .where('userUID', '==', userId)
    .where('projectUID', '==', projectUID)
    .onSnapshot(observer);
};

const getLastFastBurnDate = async (projectUID: string) => {
  const lastDateFromDB: any = await firestore()
    .collection('fastburnhours')
    .doc(projectUID)
    .get();
  const lastBurnDate = await lastDateFromDB.data();
  return lastBurnDate;
};

export {
  getProjectsFromUser,
  getProjectByID,
  streamProject,
  getTasksFromProjectUser,
  streamTasksFromProject,
  getAllTasksFromUser,
  streamExpensesFromProject,
  getLastFastBurnDate,
};
