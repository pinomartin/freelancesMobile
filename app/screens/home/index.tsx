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
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {AppBarProps} from '../../components/AppBar';
import {CustomCard} from '../../components/CustomCard/CustomCard';
import EmptyState, {SVGs} from '../../components/EmptyState/EmptyState';
import Loader from '../../components/Loader';
import {HomeNavigationProps} from '../../navigation/interface';
import {
  NEW_PROJECT,
  PROFILE,
  // PROJECT_DATA,
  HELP,
  TEST_SCREEN,
} from '../../navigation/routes';
import {getStyles} from './style';
import useHome from './useHome';

const Home = ({navigation, route}: HomeNavigationProps<'home'>) => {
  const colors = useTheme();
  const styles = getStyles();
  const {logout, user, userProjects, isLoading, onSelectProjectHandler} =
    useHome();

  const appBarRightMenu = {
    onPressThirdListItem: () => logout(),
    onPressSecondListItem: () => navigation.push(HELP),
    onPressFirstListItem: () => navigation.push(PROFILE),
    firstListItemLabel: 'Mi Perfil',
    firstListItemIconName: 'person-outline',
    secondListItemLabel: 'Ayuda',
    thirdListItemLabel: 'Cerrar Sesión',
    secondListItemIconName: 'question-mark-circle-outline',
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

  return isLoading ? (
    <Loader isFullScreen />
  ) : (
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
            <Text category="s1">Mis proyectos</Text>
            <Button onPress={() => navigation.push(TEST_SCREEN)}> ANIMATIONS </Button>
            <View style={styles.home__globalSpacing}>
              {userProjects && userProjects.length > 0 ? (
                userProjects.map(project => (
                  <CustomCard
                    key={project.uid}
                    headerTitle={project.name}
                    headerSubtitle={project.client}
                    withHeader
                    label={project.description}
                    withFooter
                    primaryButtonLabel="Ver"
                    onPressCard={() => onSelectProjectHandler(project)}
                    onPressPrimary={() => onSelectProjectHandler(project)}
                    headerRightText={project.type === 0 ? '🕰️' : '💵'}
                    withShadow
                    customStyle={styles.home__cardSpacing}
                  />
                ))
              ) : (
                <EmptyState
                  svgIcon={SVGs.PAPERPLANE}
                  title="Aún no tienes proyectos"
                  description="Comenzá creando uno nuevo pulsando sobre el botón + sobre el costado inferior derecho."
                />
              )}
            </View>
          </Layout>
        </ScrollView>
        <View style={styles.home__fabButton__container}>
          <Button
            status="info"
            size={'giant'}
            style={styles.home__fabButton}
            onPress={() => navigation.navigate(NEW_PROJECT)}
            accessoryLeft={<Icon name="plus-outline" />}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
