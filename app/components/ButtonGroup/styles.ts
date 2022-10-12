import {StyleSheet} from 'react-native';

export const getStyles = () => {
  const globalPadding = 8;

  return StyleSheet.create({
    buttonGroup__mainContainer: {
      paddingHorizontal: globalPadding * 2,
      justifyContent: 'space-evenly',
      marginVertical: globalPadding,
      flexDirection: 'row',
    },
    buttonGroup__buttonItem: {
      width: '23%',
      marginHorizontal: 2,
    },
  });
};
