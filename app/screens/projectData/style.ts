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
    projectData__buttonContainer: {
      marginVertical: globalPadding * 2,
    },
    projectData__cardElevation: {
      ...elevations.elevation08,
    },
    projectData__cardContainer: {
      backgroundColor: 'white',
      borderWidth: 0.1,
      paddingVertical: globalPadding,
      paddingHorizontal: globalPadding,
      borderRadius: globalPadding + 4,
      overflow: 'visible',
    },
    projectData__listContainer: {
      marginTop: globalPadding * 3,
    },
  });
};
