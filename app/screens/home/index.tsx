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
import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import AppBar, {RightActionsMenuProps} from '../../components/AppBar';
import TimerFree from '../../components/Timers/TimerFreelances';
import {AuthContext} from '../../context/AuthContext';
import {HomeNavigationProps} from '../../navigation/interface';
import {getStyles} from './style';

const Home = ({navigation, route}: HomeNavigationProps<'home'>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = useTheme();
  const styles = getStyles();
  const {logout} = useContext(AuthContext);

  const appBarRightMenu: RightActionsMenuProps = {
    onPressSecondListItem: () => logout(),
    onPressFirstListItem: () => {},
    firstListItemLabel: 'Mi Perfil',
    firstListItemIconName: 'person-outline',
    secondListItemLabel: 'Cerrar Sesión',
    secondListItemIconName: 'log-out',
  };

  return (
    <Layout style={styles.home__mainContainer} level={'4'}>
      <SafeAreaView style={styles.home__safeAreaView}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppBar
          customStyle={{backgroundColor: colors['$color-basic-100']}}
          title="Freelances"
          rightMenu
          alignment="start"
          renderRightActionsProps={appBarRightMenu}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.home__scrollView}>
          <Layout style={styles.home__container} level={'2'}>
            {/* <Text>Hola</Text> */}
            <TimerFree />
            {/* <TimerBackground /> */}
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
