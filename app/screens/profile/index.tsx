import {Layout, useTheme} from '@ui-kitten/components';
import React, {useContext, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
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
      navigation.pop();
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
    <Layout style={styles.home__mainContainer} level={'4'}>
      <SafeAreaView style={styles.home__safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.home__scrollView}>
          <Layout style={styles.home__container} level={'2'}>
            {/* <Text>Hola</Text> */}
            {/* <TimerBackground /> */}
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default ProfileScreen;
