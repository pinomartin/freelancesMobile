/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, {useContext, useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {AppBarProps} from '../../components/AppBar';
// import {CustomCard} from '../../components/CustomCard/CustomCard';
import EmptyState, {SVGs} from '../../components/EmptyState/EmptyState';
import Loader from '../../components/Loader';
import {AuthContext} from '../../context/AuthContext';
import {ProjectDTO} from '../../interfaces/Project';
// import {ProjectContext} from '../../context/ProjectContext';
import {HomeNavigationProps} from '../../navigation/interface';
import useNewProject from '../newProject/useNewProject';
// import {
//   NEW_PROJECT,
//   PROFILE,
//   // PROJECT_DATA,
//   HELP,
// } from '../../navigation/routes';
import {getStyles} from './style';
import useProjectEdition from './useProjectEdition';
// import useHome from './useHome';

const ProjectEditionScreen = ({
  navigation,
  route,
}: HomeNavigationProps<'home'>) => {
  const colors = useTheme();
  const styles = getStyles();
  const {logout} = useContext(AuthContext);
  const {setProjectEdit, projectEdit, isProjectsEqual} = useProjectEdition();

  const appBarRightMenu = {
    onPressThirdListItem: () => logout(),
    // onPressSecondListItem: () => navigation.push(HELP),
    onPressFirstListItem: () => navigation.popToTop(),
    firstListItemLabel: 'Home',
    firstListItemIconName: 'home-outline',
    // secondListItemLabel: 'Ayuda',
    secondListItemLabel: 'Cerrar Sesión',
    // secondListItemIconName: 'question-mark-circle-outline',
    secondListItemIconName: 'log-out',
  };

  const appBarOptions: AppBarProps = {
    title: `Proyecto ${projectEdit ? projectEdit.name : ''}`,
    alignment: 'start',
    rightMenu: true,
    onLeftAccesoryPress: () => navigation.goBack(),
    customStyle: {backgroundColor: colors['$color-basic-100']},
    renderRightActionsProps: appBarRightMenu,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      appBar: appBarOptions,
    });
  }, [navigation, route]);

  return false ? (
    <Loader isFullScreen />
  ) : (
    <Layout style={styles.projectEdition__mainContainer} level={'2'}>
      <SafeAreaView style={styles.projectEdition__safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.projectEdition__scrollView}>
          <Layout style={styles.projectEdition__container} level={'2'}>
            <View style={styles.projectEdition__globalSpacing}>
              <Text category={'h6'}>Editar datos proyecto</Text>
              {/* <Text category={'p1'}>{user?.email ? user?.email : ''} 👋</Text> */}
            </View>
            {/* <View style={{backgroundColor: 'red'}}> */}
            {projectEdit ? (
              <>
                <View style={styles.projectEdition__input__container}>
                  <Input
                    value={projectEdit.name}
                    label="Nombre"
                    size="large"
                    placeholder="Ej: Freelances app"
                    textContentType="name"
                    // caption={renderCaption}
                    // accessoryRight={renderIcon}
                    // secureTextEntry={secureTextEntry}
                    onChangeText={(nextValue: string) =>
                      setProjectEdit({...projectEdit, name: nextValue})
                    }
                  />
                </View>
                <View style={styles.projectEdition__input__container}>
                  <Input
                    value={projectEdit.client}
                    label="Cliente"
                    size="large"
                    placeholder="Ej: Estudio de Fotografía"
                    textContentType="organizationName"
                    onChangeText={(nextValue: string) =>
                      setProjectEdit({...projectEdit, client: nextValue})
                    }
                  />
                </View>
                <View style={styles.projectEdition__input__container}>
                  <Input
                    value={projectEdit.description}
                    label="Qué es lo que harás ?"
                    size="large"
                    multiline={true}
                    textStyle={{minHeight: 64}}
                    placeholder="Ej: Freelances app"
                    onChangeText={nextValue =>
                      setProjectEdit({...projectEdit, description: nextValue})
                    }
                  />
                </View>
              </>
            ) : (
              <EmptyState
                svgIcon={SVGs.PAPERPLANE}
                title="Ocurrió un error"
                description="Vuelve hacia atrás o hacia Home"
              />
            )}
            {/* </View> */}
          </Layout>
        </ScrollView>
        <View style={styles.projectEdition__fabButton__container}>
          <Button
            disabled={isProjectsEqual()}
            status="info"
            accessoryLeft={<Icon name="save-outline" />}>
            Guardar cambios
          </Button>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default ProjectEditionScreen;
