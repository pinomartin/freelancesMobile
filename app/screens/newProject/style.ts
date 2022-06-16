import {StyleSheet} from 'react-native';

export const getStyles = () => {
  const globalPadding = 8;
  return StyleSheet.create({
    newProject__mainContainer: {
      flex: 1,
    },
    newProject__safeAreaView: {
      flex: 1,
    },
    newProject__scrollView: {
      flexGrow: 1,
    },
    newProject__container: {
      flex: 1,
      marginTop: globalPadding * 2,
    },
    newProject__globalSpacing: {
      paddingHorizontal: globalPadding * 2,
    },
    newProject__submitButton__container: {
      marginBottom: globalPadding,
    },
    newProject__input__container: {
      marginVertical: globalPadding * 2,
    },
    captionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: globalPadding,
    },
    captionIcon: {
      width: 10,
      height: 10,
      marginRight: 5,
    },
    captionText: {
      fontSize: 12,
      fontWeight: '400',
      color: '#8F9BB3',
    },
  });
};
