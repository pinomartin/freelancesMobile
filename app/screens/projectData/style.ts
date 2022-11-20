import {StyleSheet} from 'react-native';
import elevations from '../../utils/ui/elevations';

export const getStyles = () => {
  const globalPadding = 8;
  return StyleSheet.create({
    projectData__mainContainer: {
      flex: 1,
    },
    projectData__globalPadding: {
      paddingHorizontal: globalPadding * 2,
    },
    projectData__elevation: {
      ...elevations.elevation08,
    },
    projectData__cardContainer: {
      backgroundColor: 'white',
      paddingVertical: globalPadding * 2,
      paddingHorizontal: globalPadding * 2,
      borderRadius: globalPadding + 4,
      marginVertical: globalPadding * 2,
    },
    projectData__timerContainer: {
      alignItems: 'center',
      marginTop: globalPadding,
    },
    projectData__taskListContainer: {
      marginTop: globalPadding * 3,
    },
    projectData__taskList: {
      backgroundColor: 'white',
    },
    projectData__emptyStateContainer:{
      paddingTop: 30,
    },
    projectData__bottomButtonContainer: {
      position: 'absolute',
      bottom: '5%',
      width: '90%',
      alignSelf: 'center',
    },
  });
};
