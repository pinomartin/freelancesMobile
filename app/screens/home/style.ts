import {StyleSheet} from 'react-native';

export const getStyles = () => {
  const globalPadding = 8;
  return StyleSheet.create({
    home__mainContainer: {
      flex: 1,
    },
    home__safeAreaView: {
      flex: 1,
    },
    home__scrollView: {
      flexGrow: 1,
    },
    home__container: {
      flex: 1,
      marginVertical: globalPadding + 4,
      alignItems: 'center',
    },
    home__globalSpacing: {
      paddingHorizontal: globalPadding * 2,
      marginVertical: globalPadding * 2,
    },
    home__fabButton__container: {
      position: 'absolute',
      bottom: globalPadding * 6,
      right: globalPadding * 2,
    },
  });
};
