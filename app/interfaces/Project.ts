import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {TaskTime} from './tasktime';

export interface ProjectDTO {
  name: string;
  client: string;
  description: string;
  type: number; // 0 HOUR - 1 BUDGET TOTAL
  amountXHour: number;
  estimatedHours: number;
  estimatedTotal: number;
  creationDate: FirebaseFirestoreTypes.Timestamp;
  estimatedFinishDate: Date;
  estimatedStartDate: Date;
  estimatedHoursPerDay: number;
  tasks?: TaskTime[];
  isDone?: boolean;
  uid?: string;
}

export interface CreateProjectPropsRequest {
  name: string;
  client: string;
  description: string;
  type: number; // 0 HOUR - 1 BUDGET TOTAL
  amountXHour: number;
  estimatedHours: number;
  estimatedTotal: number;
  estimatedFinishDate: Date | undefined;
  estimatedStartDate: Date | undefined;
  estimatedHoursPerDay: number;
  tasks?: TaskTime[];
}
