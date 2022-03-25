import {Divider, Icon, Input, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {getStyles} from './style';

const LoginScreen = () => {
  const styles = getStyles();
  const [creds, setCreds] = useState({email: '', pass: ''});
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleInputChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    inputName: string,
  ) => {
    switch (inputName) {
      case 'email':
        setCreds({...creds, email: event.target.toString()});
        break;
      case 'pass':
        setCreds({...creds, pass: event.target.toString()});
      default:
        break;
    }
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.login__captionContainer}>
        <Text style={styles.login__captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };

  return (
    <Layout style={[styles.login__container, styles.login__globalSpacing]}>
      <View style={styles.login__inputContainer}>
        {/* <Text style={styles.login__inp} category="s1">Login</Text> */}
        <Input
          label={'Email'}
          keyboardType="default"
          onChange={email => handleInputChange(email, 'email')}
          placeholder={'nombre@ejemplo.com'}
          autoCorrect={false}
        />
      </View>
      <View>
        <Input caption={renderCaption} accessoryRight={renderIcon} />
      </View>
    </Layout>
  );
};

export default LoginScreen;
