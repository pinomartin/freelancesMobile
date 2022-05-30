import {StyleSheet} from 'react-native';

export const getStyles = () => {
  const globalPadding = 8;
  return StyleSheet.create({
    profile__mainContainer: {
      flex: 1,
    },
    profile__safeAreaView: {
      flex: 1,
    },
    profile__scrollView: {
      flexGrow: 1,
    },
    profile__container: {
      flex: 1,
      alignItems: 'center',
    },
    profile__globalSpacing: {
      paddingHorizontal: globalPadding * 2,
    },
    profile__image__container: {
      marginVertical: globalPadding * 2,
      position: 'relative',
    },
    profile__image: {
      width: 200,
      height: 200,
      borderRadius: 200,
      borderWidth: 2,
    },
    profile__userSpecs__container: {
      marginVertical: globalPadding * 2,
    },
    profile__userSpecs__itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};
