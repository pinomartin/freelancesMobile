import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';
import React, {useState, useContext} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Loader from '../../components/Loader';
import {AuthContext} from '../../context/AuthContext';
import {getStyles} from './style';

const LoginScreen = () => {
  const styles = getStyles();
  const {login, register, isLoading, registerError, loginError} =
    useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  console.log(email)
  console.log(pass)

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (captionLabel: string) => {
    return (
      <View style={styles.login__captionContainer}>
        <Text style={styles.login__captionText}>
          {captionLabel ? captionLabel : 'Debe contar con 8 caracteres minimo.'}
        </Text>
      </View>
    );
  };

  return isLoading ? (
    <Loader
      containerStyles={styles.login__container}
      color={'transparent'}
      size={30}
    />
  ) : (
    <Layout style={[styles.login__container, styles.login__globalSpacing]}>
      <View style={styles.login__inputContainer}>
        {/* <Text style={styles.login__inp} category="s1">Login</Text> */}
        <Input
          label={'Email'}
          autoCapitalize={'none'}
          caption={
            isRegisterMode ? registerError.emailError : loginError.emailError
          }
          // keyboardType="default"
          onChangeText={email => setEmail(email)}
          value={email}
          placeholder={'nombre@ejemplo.com'}
          autoCorrect={false}
        />
      </View>
      <View style={styles.login__inputContainer}>
        <Input
          caption={renderCaption(
            isRegisterMode
              ? registerError.passwordError
              : loginError.passwordError,
          )}
          accessoryRight={renderIcon}
          label={'Contraseña'}
          placeholder={'************'}
          secureTextEntry={secureTextEntry}
          onChangeText={pass => setPass(pass)}
        />
      </View>
      <View style={styles.login__buttonContainer}>
        {isRegisterMode ? (
          <Button
            status={'info'}
            style={{}}
            onPress={() => register(email, pass, () => {})}>
            Registrate!
          </Button>
        ) : (
          <Button
            status={'info'}
            style={{}}
            onPress={() => login(email, pass, () => {})}>
            Iniciar Sesion
          </Button>
        )}

        <Button
          style={{}}
          appearance="ghost"
          onPress={() => setIsRegisterMode(!isRegisterMode)}>
          {isRegisterMode ? 'Ya tengo cuenta' : 'Registrate'}
        </Button>
      </View>
    </Layout>
  );
};

export default LoginScreen;
