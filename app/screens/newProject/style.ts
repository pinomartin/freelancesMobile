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
      paddingBottom: globalPadding * 3,
    },
    newProject__container: {
      flex: 1,
      marginTop: globalPadding * 2,
    },
    newProject__globalSpacing: {
      paddingHorizontal: globalPadding * 2,
    },
    newProject__centerAlignment: {
      alignSelf: 'center',
      textAlign: 'center',
    },
    newProject__submitButton__container: {
      marginTop: globalPadding * 2,
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
      width: globalPadding + 2,
      height: globalPadding + 2,
      marginRight: 5,
    },
    captionText: {
      fontSize: globalPadding + 4,
      fontWeight: '400',
      color: '#8F9BB3',
    },
  });
};
