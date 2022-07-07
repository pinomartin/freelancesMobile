import {StyleSheet} from 'react-native';

const globalPadding = 8;

export const getStyles = (theme?: string) => {
  return StyleSheet.create({
    tasksList__item__container: {flexDirection: 'row'},
    tasksList__item__spacing: {marginHorizontal: 4},
    tasksList__label: {textAlign: 'center', marginBottom: globalPadding},
  });
};
