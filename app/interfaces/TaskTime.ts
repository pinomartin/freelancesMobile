export interface TaskTime {
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
  isDone: boolean;
  creationDate: Date;
  startTimerDate: Date;
  stopTimerDate: Date;
  isFastHourCharge?: boolean;
  projectUID?: string;
  userUID: string;
  uid?: string;
}
