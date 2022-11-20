import {StyleSheet} from 'react-native';

export const getStyles = () => {
  const globalPadding = 8;

  return StyleSheet.create({
    buttonGroup__mainContainer: {
      paddingHorizontal: globalPadding * 2,
      paddingVertical: globalPadding * 2,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    buttonGroup__buttonItem: {
      width: '23%',
      marginHorizontal: 2,
    },
  });
};
