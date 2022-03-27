import {StyleSheet} from 'react-native';

export const getStyles = () => {
  const globalPadding = 8;
  return StyleSheet.create({
    login__container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    login__globalSpacing: {
      paddingHorizontal: globalPadding * 2,
    },
    login__headerLogosContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: globalPadding * 2,
    },
    login__inputContainer: {
      marginVertical: globalPadding * 2,
      alignItems: 'center',
      width: '90%',
    },
    login__captionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    login__captionText: {
      fontSize: 12,
      fontWeight: '400',
      // color: '#8F9BB3',
    },
    login__buttonContainer: {
      marginVertical: globalPadding * 3,
      width: '75%',
    },
    login__switchModeButtonContainer: {
      width: '75%',
      marginVertical: globalPadding,
    },
  });
};
