import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, {useState, useContext, useRef, useEffect} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';
import Loader from '../../components/Loader';
import {AuthContext} from '../../context/AuthContext';
import {getStyles} from './style';
import AppLogo from '../../components/AppLogo';
import PaperPlaneLogo from '../../components/PaperPlaneLogo';

const LoginScreen = () => {
  const styles = getStyles();
  const colors = useTheme();

  const {login, register, isLoading, registerError, loginError} =
    useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const disabledButtonHandler = () => {
    if (email && pass) {
      return false;
    }
    return true;
  };

  const scale = useRef(new Animated.Value(0.7)).current;

  const bounceIn = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    bounceIn();
    return () => {};
  }, []);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (captionLabel: string) => {
    return (
      <View style={styles.login__captionContainer}>
        <Text style={styles.login__captionText}>
          {captionLabel ? captionLabel : 'Debe contar con 8 caracteres o más.'}
        </Text>
      </View>
    );
  };

  return isLoading ? (
    <Loader isFullScreen color={'primary'} size={'medium'} />
  ) : (
    <Layout
      style={[styles.login__container, styles.login__globalSpacing]}
      level={'3'}>
      <Animated.View
        style={[
          styles.login__headerLogosContainer,
          {transform: [{scale: scale}]},
        ]}>
        <AppLogo color={colors['color-primary-default']} />
        <PaperPlaneLogo
          width={50}
          height={50}
          borderColor={colors['color-info-default']}
          containerStyles={{
            alignSelf: 'center',
            marginTop: '3%',
            paddingRight: 8,
          }}
        />
      </Animated.View>
      <View style={styles.login__inputContainer}>
        <Input
          textStyle={{fontSize: 16}}
          label={'Email'}
          autoCapitalize={'none'}
          caption={
            isRegisterMode ? registerError.emailError : loginError.emailError
          }
          selectionColor={colors['color-primary-600']}
          onChangeText={email => setEmail(email)}
          value={email}
          placeholder={'nombre@ejemplo.com'}
          autoCorrect={false}
          size={'large'}
          status={
            registerError.emailError || loginError.emailError
              ? 'danger'
              : 'basic'
          }
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
          size={'large'}
          status={
            registerError.passwordError || loginError.passwordError
              ? 'danger'
              : 'basic'
          }
        />
      </View>
      <View style={styles.login__buttonContainer}>
        {isRegisterMode ? (
          <Button
            status={'info'}
            size={'large'}
            style={{}}
            disabled={disabledButtonHandler()}
            onPress={() => register(email, pass, () => {})}>
            Comerzar!
          </Button>
        ) : (
          <Button
            status={'primary'}
            size={'large'}
            disabled={disabledButtonHandler()}
            onPress={() => login(email, pass, () => {})}>
            Iniciar Sesión
          </Button>
        )}
      </View>
      <View style={styles.login__switchModeButtonContainer}>
        <Button
          size={'large'}
          appearance="ghost"
          onPress={() => setIsRegisterMode(!isRegisterMode)}>
          {isRegisterMode ? 'Ya tengo cuenta' : 'Registrate'}
        </Button>
      </View>
    </Layout>
  );
};

export default LoginScreen;
