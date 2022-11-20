import {StyleSheet} from 'react-native';

export const getStyles = () => {
  const globalPadding = 8;
  return StyleSheet.create({
    projectEdition__mainContainer: {
      flex: 1,
    },
    projectEdition__safeAreaView: {
      flex: 1,
    },
    projectEdition__scrollView: {
      flexGrow: 1,
      paddingHorizontal: globalPadding * 2,
    },
    projectEdition__container: {
      flex: 1,
      marginVertical: globalPadding + 4,
      // alignItems: 'center',
    },
    projectEdition__globalSpacing: {
      // paddingHorizontal: globalPadding * 2,
      marginVertical: globalPadding,
    },
    projectEdition__input__container: {
      width: '98%',
      marginVertical: globalPadding * 2,
    },
    projectEdition__inputGroup__container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    projectEdition__fabButton__container: {
      position: 'absolute',
      bottom: '5%',
      width: '90%',
      alignSelf: 'center',
    },
    projectEdition__fabButton: {
      // borderRadius: globalPadding * 2,
      paddingVertical: globalPadding * 0,
      // paddingHorizontal: globalPaddin zg,
    },
  });
};
