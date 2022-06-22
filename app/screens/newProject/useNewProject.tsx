import {useNavigation} from '@react-navigation/native';
import {CalendarRange} from '@ui-kitten/components/ui/calendar/type';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {addNewProjectToDB} from '../../firebase/firestore/project';
import {HomeNavigationProps} from '../../navigation/interface';
import {HOME} from '../../navigation/routes';

const useNewProject = () => {
  const {user} = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [estimatedDates, setEstimatedDates] = useState<CalendarRange<Date>>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [description, setDescription] = useState<string>('');
  const [projectType, setProjectType] = useState<number>(0);
  const [amountXHour, setAmountXHour] = useState<number>(0);
  const [estimatedHours, setEstimatedHours] = useState<number>(0);
  const [estimatedTotalBudgetAmount, setEstimatedTotalBudgetAmount] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {navigation} = useNavigation<HomeNavigationProps<'home'>>();

  const submitButtonIsDisabled = () => {
    if (name && clientName && description && estimatedDates) {
      switch (projectType) {
        case 0:
          if (amountXHour > 0 && estimatedHours > 0) {
            return false;
          }
        case 1:
          if (estimatedTotalBudgetAmount > 0) {
            return false;
          }
      }
    }
    return true;
  };

  const onRadioButtonPress = (index: number) => {
    setProjectType(index);
    //>>>>>>>>REVISAR ESTO
    setAmountXHour('');
    setEstimatedTotalBudgetAmount('');
    setEstimatedHours('');
    return;
  };

  const estimatedTotalHourProjectCalculator = (): number => {
    if (amountXHour > 0 && estimatedHours > 0) {
      const estimatedTotalXHour = Number(
        (amountXHour * estimatedHours).toFixed(2),
      );
      return estimatedTotalXHour;
    }
    return 0;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    let projectData = {
      client: clientName,
      amountXHour: amountXHour,
      description: description,
      estimatedStartDate: estimatedDates.startDate,
      estimatedFinishDate: estimatedDates.endDate,
      estimatedHours: estimatedHours,
      name: name,
      estimatedHoursPerDay: 0,
      estimatedTotal: 0,
      type: projectType,
    };
    const response = await addNewProjectToDB(projectData, user?.email);
    if (response?.kind !== 'ok') {
      setIsLoading(false);
      console.log(response, 'RESPONSE Error');
      return;
    }
    setIsLoading(false);
    navigation.push(HOME);
    console.log(response, 'RESPONSE Success');
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
  };
};

export default useNewProject;
