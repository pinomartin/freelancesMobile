import {StyleSheet} from 'react-native';

export const getStyles = (theme?: string) => {
  const globalPadding = 8;

  return StyleSheet.create({
    headerContainer: {
      marginVertical: globalPadding,
      paddingHorizontal: globalPadding * 2,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      // flex: 1,
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
