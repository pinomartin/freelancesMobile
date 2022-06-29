import {StyleSheet} from 'react-native';

export const getStyles = (theme?: string) => {
  const globalPadding = 8;

  return StyleSheet.create({
    headerContainer: {
      marginVertical: globalPadding,
      paddingHorizontal: globalPadding * 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    header__rightText__container: {
      height: 20,
      width: '15%',
      alignSelf: 'flex-end',
      position: 'absolute',
      top: 0,
      right: 0,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      marginHorizontal: globalPadding,
      marginVertical: globalPadding,
    },
  });
};
