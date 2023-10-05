import {StyleSheet} from 'react-native';
import elevations from '../../utils/ui/elevations';

export const getStyles = (theme?: string) => {
  const globalPadding = 8;

  return StyleSheet.create({
    globalPadding: {
      paddingHorizontal: globalPadding * 2,
    },
    elevation: {
      ...elevations.elevation08,
    },
    cardContainer: {
      backgroundColor: 'white',
      paddingVertical: globalPadding * 2,
      paddingHorizontal: globalPadding * 2,
      borderRadius: globalPadding + 4,
      marginVertical: globalPadding * 2,
    },
  });
};
