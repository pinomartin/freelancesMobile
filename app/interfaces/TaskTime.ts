export interface TaskTime {
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
  isActive: boolean;
  creationDate: Date;
  startTimerDate: Date;
  stopTimerDate: Date;
  isFastHourCharge?: boolean;
  projectUID?: string;
  clientUID: string;
  uid?: string;
}
