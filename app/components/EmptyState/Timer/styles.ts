import {StyleSheet} from 'react-native';

const globalPadding = 8;
export const getStyles = () => {
  return StyleSheet.create({
    emptyStateTimer__container: {alignItems: 'center'},
    emptyStateTimer__title: {
      marginVertical: globalPadding,
    },
  });
};
