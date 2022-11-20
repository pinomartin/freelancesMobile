import {StyleSheet} from 'react-native';
import elevations from '../../utils/ui/elevations';

export const getStyles = (theme?: string) => {
  const globalPadding = 8;

  return StyleSheet.create({
    headerContainer: {
      marginVertical: globalPadding,
      paddingHorizontal: globalPadding * 3,
      flexDirection: 'row',
    },
    header__rightText__container: {
      height: 20,
      width: '15%',
      alignSelf: 'flex-end',
      position: 'absolute',
      top: '25%',
      right: 0,
    },
    card: {
      minWidth: '90%',
      marginVertical: 2,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    footerControl: {
      marginHorizontal: globalPadding * 2,
      marginVertical: globalPadding,
    },
    shadow: {
      ...elevations.elevation06,
    },
  });
};
