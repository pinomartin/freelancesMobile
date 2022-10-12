import {TaskTime} from '../interfaces/tasktime';

export const getMockedTasks = (
  clientID: string,
): TaskTime[] => {
  return [
    {
      description: 'Web 01',
      hours: 1,
      minutes: 10,
      seconds: 5,
      isActive: true,
      creationDate: new Date(),
      startTimerDate: new Date(),
      stopTimerDate: new Date(),
      isFastHourCharge: false,
      projectUID: 'projectUID',
      clientUID: clientID,
      uid: 'id' + Math.random().toString(16).slice(2),
    },
    {
      description: 'Web 02',
      hours: 0,
      minutes: 45,
      seconds: 15,
      isActive: true,
      creationDate: new Date(),
      startTimerDate: new Date(),
      stopTimerDate: new Date(),
      isFastHourCharge: false,
      projectUID: 'projectUID',
      clientUID: clientID,
      uid: 'id' + Math.random().toString(16).slice(2),
    },
  ];
};
