import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {Button, Icon, Input, Layout, useTheme} from '@ui-kitten/components';
import {AppBarProps, RightActionsMenuProps} from '../../components/AppBar';
import ButtonGroup from '../../components/ButtonGroup';
import EmptyState, {SVGs} from '../../components/EmptyState/EmptyState';
import {TasksList} from '../../components/TasksList';
import TextTwoLines from '../../components/TextTwoLines';
import TimerFreelances from '../../components/Timers/TimerFreelances';
import EmptyTimerSvg from '../../components/EmptyState/Timer/TimerSvg';
import {HomeNavigationProps} from '../../navigation/interface';
import {getDateFromUNIX, getStringDateFromDate} from '../../utils/general/time';
import {getStyles} from './style';
import useProjectData from './useProjectData';
import {ModalWithBackdrop} from '../../components/Modal';

const ProjectDataScreen = ({
  navigation,
  route,
}: HomeNavigationProps<'projectData'>) => {
  const styles = getStyles();
  const {
    projectSelected,
    projectTypeUIHandler,
    onDeleteProject,
    onResetTimer,
    onStartTimer,
    onStopTimer,
    onSaveTimePress,
    taskDescriptionSetter,
    taskData,
    showData,
    showModal,
    saveTimeonDB,
    showDataHandler,
    showTaskDescriptionInput,
    resetTimer,
  } = useProjectData();
  const colors = useTheme();

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
              onPress: showDataHandler,
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
          {showData ? (
            <View
              style={[
                styles.projectData__globalPadding,
                styles.projectData__elevation,
              ]}>
              <View
                style={[
                  styles.projectData__cardContainer,
                  {
                    backgroundColor: colors['background-basic-color-1'],
                  },
                ]}>
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
          ) : null}
          <View style={styles.projectData__timerContainer}>
            <TimerFreelances
              label="Timer"
              onPressReset={onResetTimer}
              onStartPress={onStartTimer}
              onStopPress={e => onStopTimer(e)}
              resetTimer={resetTimer}
              // onSavePress={e => onSaveTimePress(e)}
            />
            {showTaskDescriptionInput ? (
              <View style={{width: '90%'}}>
                <Input
                  value={taskData.description}
                  label="Qué hiciste en este tiempo ?"
                  size="medium"
                  multiline={true}
                  textStyle={{minHeight: 48}}
                  placeholder="Ej: Freelances app"
                  style={{marginBottom: 4}}
                  autoCorrect={false}
                  // caption={renderCaption}
                  // accessoryRight={renderIcon}
                  // secureTextEntry={secureTextEntry}
                  onChangeText={taskDescriptionSetter}
                />
                <Button
                  status={'info'}
                  disabled={!taskData.description}
                  accessoryLeft={<Icon name="save-outline" />}
                  onPress={onSaveTimePress}
                />
              </View>
            ) : null}
          </View>
          <View
            style={[
              styles.projectData__taskListContainer,
              styles.projectData__globalPadding,
              styles.projectData__elevation,
            ]}>
            {projectSelected.tasks && projectSelected.tasks.length > 0 ? (
              // <TasksList />
              <TasksList
                data={projectSelected.tasks}
                customContainerStyle={{
                  backgroundColor: colors['background-basic-color-1'],
                }}
                label={'Tareas'}
                amountEstimated={projectSelected.amountXHour}
                showScrollBarIndicator
              />
            ) : (
              <EmptyTimerSvg
                width={80}
                height={80}
                title={'Aun no tienes tareas cargadas'}
                description={'Utiliza el contador para registrarlas'}
              />
            )}
          </View>
        </>
      ) : (
        <EmptyState
          svgIcon={SVGs.PAPERPLANE}
          description="Vuelve atrás y selecciona un proyecto"
          title="Ups.. Ocurrio un error"
        />
      )}
      <ModalWithBackdrop
        isVisible={showModal}
        label="estas seguro?"
        primaryButtonLabel="Guardar"
        onPressPrimary={saveTimeonDB}
      />
      {/* <ModalCustom isVisible={showModal} /> */}
    </Layout>
  );
};

export default ProjectDataScreen;
