import {Layout, Text} from '@ui-kitten/components';
import React, {useContext, useLayoutEffect} from 'react';
import {View} from 'react-native';
import {AppBarProps, RightActionsMenuProps} from '../../components/AppBar';
import EmptyState from '../../components/EmptyState/EmptyState';
import {TasksList} from '../../components/TasksList';
import {ProjectContext} from '../../context/ProjectContext';
import {HomeNavigationProps} from '../../navigation/interface';
import {getDateFromUNIX, getStringDateFromDate} from '../../utils/general/time';
import {getStyles} from './style';

const ProjectDataScreen = ({
  navigation,
  route,
}: HomeNavigationProps<'projectData'>) => {
  const styles = getStyles();
  const {projectSelected} = useContext(ProjectContext);

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

  const projectTypeUIHandler = () => {
    switch (projectSelected!.type) {
      case 0:
        return 'Por Hora';
      case 1:
        return 'Presupuesto Total';
      default:
        return '';
    }
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
          <View style={[styles.projectData__globalPadding]}>
            <Text category={'h5'}>{projectSelected.name}</Text>
            <Text category={'s2'}>Cliente: {projectSelected.client}</Text>
            <Text category={'s2'}>
              Creado:{' '}
              {getStringDateFromDate(
                getDateFromUNIX(projectSelected!.creationDate.seconds),
              )}
            </Text>
            <Text category={'p1'}>Tipo: {projectTypeUIHandler()}</Text>
          </View>
          <View
            style={[
              styles.projectData__listContainer,
              styles.projectData__globalPadding,
            ]}>
            {projectSelected.tasks && projectSelected.tasks.length > 0 ? (
              // <TasksList data={} />
              <TasksList data={projectSelected.tasks} />
            ) : (
              <Text>Aun no tienes tareas cargadas</Text>
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
