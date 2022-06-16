/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Button, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import React, {useContext, useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {AppBarProps} from '../../components/AppBar';
import {CustomCard} from '../../components/CustomCard/CustomCard';
import TimerFreelances from '../../components/Timers/TimerFreelances';
import {AuthContext} from '../../context/AuthContext';
import {HomeNavigationProps} from '../../navigation/interface';
import {NEW_PROJECT, PROFILE, TIMER} from '../../navigation/routes';
import {getStyles} from './style';

const Home = ({navigation, route}: HomeNavigationProps<'home'>) => {
  const colors = useTheme();
  const styles = getStyles();
  const {logout, user} = useContext(AuthContext);

  const appBarRightMenu = {
    onPressThirdListItem: () => logout(),
    onPressSecondListItem: () => navigation.push(TIMER),
    onPressFirstListItem: () => navigation.push(PROFILE),
    firstListItemLabel: 'Mi Perfil',
    firstListItemIconName: 'person-outline',
    secondListItemLabel: 'Tiempos',
    thirdListItemLabel: 'Cerrar Sesión',
    secondListItemIconName: 'clock-outline',
    thirdListItemIconName: 'log-out',
  };

  const appBarOptions: AppBarProps = {
    title: 'Freelances',
    alignment: 'start',
    rightMenu: true,
    customStyle: {backgroundColor: colors['$color-basic-100']},
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
            <Text style={styles.home__globalSpacing}>
              <Text category={'h6'}>Bienvenido</Text>{' '}
              <Text category={'p1'}>{user?.email ? user?.email : ''} 👋</Text>
            </Text>
            <View style={styles.home__globalSpacing}>
              <CustomCard
                headerTitle="Wolfcox"
                headerSubtitle="Desarrollo web"
                withHeader
                label={
                  'loren ipsum loren ipsum loren ipsumloren ipsum loren ipsum loren ipsum loren ipsum'
                }
                withFooter
                primaryButtonLabel="Ver"
                onPressPrimary={() => {}}
              />
            </View>
          </Layout>
        </ScrollView>
        <View style={styles.home__fabButton__container}>
          <Button
            status="info"
            size={'giant'}
            style={{
              borderRadius: 80,
              paddingVertical: 20,
              paddingHorizontal: 8,
              // shadowColor: 'blue',
              // shadowOpacity: 1,
              // shadowOffset: {width: 1, height: 0},
            }}
            onPress={() => navigation.navigate(NEW_PROJECT)}
            accessoryLeft={<Icon name="plus-outline" />}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
