import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, {useContext, useLayoutEffect} from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import AppBar, {
  AppBarProps,
  RightActionsMenuProps,
} from '../../components/AppBar';
import {AuthContext} from '../../context/AuthContext';
import {HomeNavigationProps} from '../../navigation/interface';
import {getStyles} from './style';

const ProfileScreen = ({navigation, route}: HomeNavigationProps<'profile'>) => {
  const styles = getStyles();
  const colors = useTheme();
  const {logout, user} = useContext(AuthContext);

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
                  uri: 'https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/1/1e/Cheems_usando_un_gorrito_de_rana.jpeg/revision/latest?cb=20201222180634&path-prefix=es',
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
            <Text category="h5">{user?.email!}</Text>
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
