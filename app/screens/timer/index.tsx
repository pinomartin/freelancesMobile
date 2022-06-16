/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Layout, useTheme} from '@ui-kitten/components';
import React, {useContext, useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {AppBarProps} from '../../components/AppBar';
import TimerFreelances from '../../components/Timers/TimerFreelances';
import {AuthContext} from '../../context/AuthContext';
import {HomeNavigationProps} from '../../navigation/interface';
import {PROFILE, TIMER} from '../../navigation/routes';
import {getStyles} from './style';

const TimerScreen = ({navigation, route}: HomeNavigationProps<'home'>) => {
  const colors = useTheme();
  const styles = getStyles();
  const {logout} = useContext(AuthContext);

  const appBarRightMenu = {
    onPressThirdListItem: () => logout(),
    onPressFirstListItem: () => navigation.push(PROFILE),
    firstListItemLabel: 'Mi Perfil',
    firstListItemIconName: 'person-outline',
    secondListItemLabel: 'Cerrar Sesión',
    secondListItemIconName: 'log-out',
  };

  const appBarOptions: AppBarProps = {
    title: 'Tiempos',
    alignment: 'start',
    rightMenu: true,
    customStyle: {backgroundColor: colors['$color-basic-100']},
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
    <Layout style={styles.home__mainContainer} level={'2'}>
      <SafeAreaView style={styles.home__safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.home__scrollView}>
          <Layout style={styles.home__container} level={'2'}>
            {/* <Text>Hola</Text> */}
            <TimerFreelances />
            {/* <TimerBackground /> */}
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default TimerScreen;
