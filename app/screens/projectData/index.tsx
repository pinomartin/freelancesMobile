import {Icon, Layout, Text} from '@ui-kitten/components';
import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {AppBarProps, RightActionsMenuProps} from '../../components/AppBar';
import ButtonGroup from '../../components/ButtonGroup';
import EmptyState from '../../components/EmptyState/EmptyState';
import {TasksList} from '../../components/TasksList';
import TextTwoLines from '../../components/TextTwoLines';
import {HomeNavigationProps} from '../../navigation/interface';
import {getDateFromUNIX, getStringDateFromDate} from '../../utils/general/time';
import {getStyles} from './style';
import useProjectData from './useProjectData';

const ProjectDataScreen = ({
  navigation,
  route,
}: HomeNavigationProps<'projectData'>) => {
  const styles = getStyles();
  const {projectSelected, projectTypeUIHandler, onDeleteProject} =
    useProjectData();
  console.log(projectSelected, 'PROJECT');

  const appBarRightMenu: RightActionsMenuProps = {
    onPressSecondListItem: () => {},
    onPressFirstListItem: () => {
      navigation.popToTop();
    },
    firstListItemLabel: 'Home',
    firstListItemIconName: 'home-outline',
    secondListItemLabel: 'Cerrar Sesión',
    secondListItemIconName: 'log-out',
  };

  const appBarOptions: AppBarProps = {
    title: `Proyecto ${projectSelected ? projectSelected.name : ''}`,
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
    <Layout style={styles.projectData__mainContainer} level={'2'}>
      {projectSelected ? (
        <>
          <ButtonGroup
            customStyle={styles.projectData__buttonContainer}
            firstButton={{
              iconName: 'bar-chart-2-outline',
              onPress: () => {},
              label: '',
              status: 'primary',
            }}
            secondButton={{
              iconName: 'edit-outline',
              onPress: () => {},
              label: '',
              status: 'warning',
            }}
            thirdButton={{
              iconName: 'trash-2-outline',
              onPress: () => {
                onDeleteProject(projectSelected.uid!);
              },
              label: '',
              status: 'danger',
            }}
          />
          <View
            style={[
              styles.projectData__globalPadding,
              styles.projectData__cardElevation,
            ]}>
            <View style={styles.projectData__cardContainer}>
              <TextTwoLines
                title="Cliente"
                description={projectSelected.client}
              />
              <TextTwoLines
                title="Creado"
                description={getStringDateFromDate(
                  getDateFromUNIX(projectSelected!.creationDate.seconds),
                )}
              />
              <TextTwoLines
                title="Tipo"
                description={projectTypeUIHandler().labelType}
              />
              <TextTwoLines
                title={projectTypeUIHandler().labelHour}
                description={projectTypeUIHandler().hours!}
              />
              <TextTwoLines
                title={'Total estimado'}
                description={projectTypeUIHandler().total!}
                isCurrency
              />
            </View>
          </View>
          <View
            style={[
              styles.projectData__listContainer,
              styles.projectData__globalPadding,
            ]}>
            {projectSelected.tasks && projectSelected.tasks.length > 0 ? (
              // <TasksList />
              <TasksList data={projectSelected.tasks} />
            ) : (
              <Text>Aún no tienes tareas cargadas</Text>
            )}
          </View>
        </>
      ) : (
        <EmptyState
          description="Vuelve atrás y selecciona un proyecto"
          title="Ups.. Ocurrio un error"
        />
      )}
    </Layout>
  );
};

export default ProjectDataScreen;
