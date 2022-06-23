import {StyleSheet} from 'react-native';

const getStyles = (theme?: string) => {
  const globalPadding = 8;

  return StyleSheet.create({
    emptyState__mainContainer: {
      flex: 1 * 0.8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyState__image: {
      width: 200,
      height: 200,
    },
    emptyState__text__container: {
      alignItems: 'center',
      marginVertical: globalPadding * 2,
    },
    emptyState__text__title: {
      textAlign: 'center',
      marginBottom: globalPadding
    },
    emptyState__text__description: {
      textAlign: 'center',
      maxWidth: '90%',
      lineHeight: globalPadding * 2.5
    },
  });
};

export default getStyles;
