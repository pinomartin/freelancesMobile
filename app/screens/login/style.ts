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
    login__inputContainer: {
      marginVertical: globalPadding,
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
      fontFamily: 'opensans-regular',
      color: '#8F9BB3',
    },
  });
};
