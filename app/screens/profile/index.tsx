import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, {useContext, useLayoutEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
} from 'react-native';
import AppBar, {
  AppBarProps,
  RightActionsMenuProps,
} from '../../components/AppBar';
import {AuthContext} from '../../context/AuthContext';
import {HomeNavigationProps} from '../../navigation/interface';
import {getStyles} from './style';

const ProfileScreen = ({navigation, route}: HomeNavigationProps<'profile'>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getStyles();
  const colors = useTheme();
  const {logout} = useContext(AuthContext);

  const appBarRightMenu: RightActionsMenuProps = {
    onPressSecondListItem: () => logout(),
    onPressFirstListItem: () => {
      navigation.popToTop();
    },
    firstListItemLabel: 'Home',
    firstListItemIconName: 'home-outline',
    secondListItemLabel: 'Cerrar Sesión',
    secondListItemIconName: 'log-out',
  };

  const appBarOptions: AppBarProps = {
    title: 'Mi perfil',
    alignment: 'start',
    rightMenu: true,
    onLeftAccesoryPress: () => navigation.goBack(),
    renderRightActionsProps: appBarRightMenu,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      appBar: appBarOptions,
    });
  }, [navigation, route]);

  return (
    <Layout style={styles.profile__mainContainer} level={'2'}>
      <SafeAreaView style={styles.profile__safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[styles.profile__scrollView]}>
          <Layout style={styles.profile__container} level={'2'}>
            <View style={styles.profile__image__container}>
              <Image
                style={[
                  styles.profile__image,
                  {borderColor: colors['color-primary-400']},
                ]}
                source={{
                  uri: 'https://previews.123rf.com/images/viaire/viaire1805/viaire180500007/100924446-lindo-perro-kawaii-de-raza-shiba-inu-con-collar-rojo-o-bandana-se-puede-utilizar-para-calcoman%C3%ADas-pa.jpg?fj=1',
                }}
              />
              <Button
                status={'primary'}
                size={'large'}
                appearance="ghost"
                style={{
                  position: 'absolute',
                  bottom: '40%',
                  left: '50%',
                }}
                accessoryLeft={<Icon name="edit-outline" />}
                onPress={() => {}}
              />
            </View>
            <Text category="h5">Martin Pino</Text>
            <Text category="c2">Desarrollador React Native</Text>
            <Divider />
            <View style={styles.profile__userSpecs__container}>
              <Text category={'h6'} style={{textAlign: 'center'}}>
                Proyectos
              </Text>
              <View style={styles.profile__userSpecs__itemContainer}>
                <Text category={'s1'}>Proyectos Activos: </Text>
                <Text category={'c2'}>2</Text>
              </View>
              <View style={styles.profile__userSpecs__itemContainer}>
                <Text category={'s1'}>Proyectos Finalizados: </Text>
                <Text category={'c2'}>1</Text>
              </View>
              <View style={styles.profile__userSpecs__itemContainer}>
                <Text category={'s1'}>Proyectos Totales: </Text>
                <Text category={'c2'}>3</Text>
              </View>
            </View>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default ProfileScreen;
