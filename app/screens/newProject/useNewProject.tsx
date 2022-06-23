import {useNavigation} from '@react-navigation/native';
import {CalendarRange} from '@ui-kitten/components/ui/calendar/type';
import {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {addNewProjectToDB} from '../../firebase/firestore/methods/setters/project';
import {HOME} from '../../navigation/routes';
import {
  formatHandler,
  onlyNumbers,
} from '../../utils/general/numbersFormatters';

const AMOUNTS_INITIAL_STATE = {
  realNumber: 0,
  formatted: '',
};

const useNewProject = () => {
  const {user} = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [estimatedDates, setEstimatedDates] = useState<
    CalendarRange<Date> | undefined
  >({startDate: undefined, endDate: undefined});
  const [description, setDescription] = useState<string>('');
  const [projectType, setProjectType] = useState<number>(0);
  const [amountXHour, setAmountXHour] = useState(AMOUNTS_INITIAL_STATE);
  const [estimatedHours, setEstimatedHours] = useState(AMOUNTS_INITIAL_STATE);
  const [estimatedTotalBudgetAmount, setEstimatedTotalBudgetAmount] = useState(
    AMOUNTS_INITIAL_STATE,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {navigate} = useNavigation();

  const submitButtonIsDisabled = () => {
    if (
      name &&
      clientName &&
      description &&
      estimatedDates?.endDate &&
      estimatedDates.startDate
    ) {
      switch (projectType) {
        case 0:
          if (amountXHour.realNumber > 0 && estimatedHours.realNumber > 0) {
            return false;
          }
        case 1:
          if (estimatedTotalBudgetAmount.realNumber > 0) {
            return false;
          }
      }
    }
    return true;
  };

  const amountXHourInputHandler = (value: string) => {
    const {formattedNumber, realNumber} = formatHandler(value);
    setAmountXHour({
      formatted: formattedNumber,
      realNumber: realNumber,
    });
  };

  const estimatedTotalBudgetAmountInputHandler = (value: string) => {
    const {formattedNumber, realNumber} = formatHandler(value);
    setEstimatedTotalBudgetAmount({
      formatted: formattedNumber,
      realNumber: realNumber,
    });
  };

  const hoursInputHandler = (value: string) => {
    const formatted = onlyNumbers(value);
    setEstimatedHours({
      formatted: formatted,
      realNumber: Number(formatted),
    });
  };

  const onRadioButtonPress = (index: number) => {
    setProjectType(index);
    setAmountXHour(AMOUNTS_INITIAL_STATE);
    setEstimatedTotalBudgetAmount(AMOUNTS_INITIAL_STATE);
    setEstimatedHours(AMOUNTS_INITIAL_STATE);
    return;
  };

  const estimatedTotalHourProjectCalculator = (): number => {
    if (amountXHour.realNumber > 0 && estimatedHours.realNumber > 0) {
      const estimatedTotalXHour = Number(
        (amountXHour.realNumber * estimatedHours.realNumber).toFixed(2),
      );
      return estimatedTotalXHour;
    }
    return 0;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    let projectData = {
      client: clientName,
      amountXHour: amountXHour.realNumber,
      description: description,
      estimatedStartDate: estimatedDates!.startDate,
      estimatedFinishDate: estimatedDates!.endDate,
      estimatedHours: estimatedHours.realNumber,
      name: name,
      estimatedHoursPerDay: 0,
      estimatedTotal:
        estimatedTotalHourProjectCalculator() > 0
          ? estimatedTotalHourProjectCalculator()
          : estimatedTotalBudgetAmount.realNumber,
      type: projectType,
    };
    console.log(projectData);
    const response = await addNewProjectToDB(projectData, user?.email);
    if (response?.kind !== 'ok') {
      setIsLoading(false);
      console.log(response, 'RESPONSE Error');
      Alert.prompt('Ocurrio un error', response?.message);
      return;
    }
    setIsLoading(false);
    navigate(HOME as never);
    console.log(response, 'RESPONSE Success projectCreated');
  };

  return {
    projectType,
    description,
    name,
    clientName,
    estimatedDates,
    amountXHour,
    estimatedHours,
    estimatedTotalBudgetAmount,
    setClientName,
    setName,
    setDescription,
    setEstimatedDates,
    setAmountXHour,
    setEstimatedHours,
    setEstimatedTotalBudgetAmount,
    onSubmit,
    isLoading,
    submitButtonIsDisabled,
    onRadioButtonPress,
    estimatedTotalHourProjectCalculator,
    amountXHourInputHandler,
    estimatedTotalBudgetAmountInputHandler,
    hoursInputHandler,
  };
};

export default useNewProject;
