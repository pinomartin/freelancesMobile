import React, {useLayoutEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Icon, Input, Layout, useTheme} from '@ui-kitten/components';
import {AppBarProps, RightActionsMenuProps} from '../../components/AppBar';
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from 'react-native-reanimated';
import {isEmpty} from 'lodash';
import ButtonGroup from '../../components/ButtonGroup';
import EmptyState, {SVGs} from '../../components/EmptyState/EmptyState';
import {TasksList} from '../../components/TasksList';
import TimerFreelances from '../../components/Timers/TimerFreelances';
import EmptyTimerSvg from '../../components/EmptyState/Timer/TimerSvg';
import Loader from '../../components/Loader';
import {ModalWithBackdrop} from '../../components/Modal';
import DetailScrollCard from '../../components/DetailScrollCard';
import {HomeNavigationProps} from '../../navigation/interface';
import {convertToDuration} from '../../utils/general/time';
import useProjectData from './useProjectData';
import {secondsToMoney} from '../../utils/money';
import {EDIT_PROJECT} from '../../navigation/routes';
import {getStyles} from './style';

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
    onTaskListItemPress,
    taskDescriptionSetter,
    taskData,
    showData,
    showModal,
    saveTimeonDB,
    showDataHandler,
    showModalHandler,
    showTaskDescriptionInput,
    resetTimer,
    isLoading,
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

  return isLoading ? (
    <Loader isFullScreen />
  ) : (
    <Layout style={styles.projectData__mainContainer} level={'2'}>
      <SafeAreaView style={{flex: 1}}>
        {projectSelected ? (
          <>
            <ButtonGroup
              firstButton={{
                iconName: 'bar-chart-2-outline',
                onPress: showDataHandler,
                label: '',
                status: 'primary',
              }}
              secondButton={{
                iconName: 'edit-outline',
                onPress: () => navigation.navigate(EDIT_PROJECT),
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
              <Animated.View
                entering={SlideInDown.duration(200)}
                exiting={FadeOut}>
                <DetailScrollCard
                  client={projectSelected.client}
                  date={projectSelected.creationDate.seconds}
                  type={projectTypeUIHandler().labelType}
                  hours={projectTypeUIHandler().hours!}
                  hourLabel={projectTypeUIHandler().labelHour!}
                  totalAmount={projectTypeUIHandler().total!}
                />
              </Animated.View>
            ) : null}
            <View style={styles.projectData__timerContainer}>
              <TimerFreelances
                label="Contador"
                onPressReset={onResetTimer}
                onStartPress={onStartTimer}
                onStopPress={e => onStopTimer(e)}
                resetTimer={resetTimer}
                // onSavePress={e => onSaveTimePress(e)}
              />
              {showTaskDescriptionInput ? (
                <Animated.View entering={FadeIn} style={{width: '90%'}}>
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
                    onPress={onSaveTimePress}>
                    Guardar tarea
                  </Button>
                </Animated.View>
              ) : null}
            </View>
            <View
              style={[
                styles.projectData__taskListContainer,
                styles.projectData__globalPadding,
                styles.projectData__elevation,
              ]}>
              {projectSelected.tasks && !isEmpty(projectSelected.tasks) ? (
                <>
                  <TasksList
                    data={projectSelected.tasks}
                    customContainerStyle={{
                      backgroundColor: colors['background-basic-color-1'],
                    }}
                    label={'Tiempos y Tareas'}
                    amountEstimated={projectSelected.amountXHour}
                    showScrollBarIndicator
                    onPressListItem={onTaskListItemPress}
                    // TODO -> Add functionality to this task item buttons
                    onPressAccesoryPrimaryButton={() =>
                      console.log('edit button')
                    }
                    onPressAccesorySecondaryButton={() =>
                      console.log('delete button')
                    }
                  />
                </>
              ) : (
                <View style={styles.projectData__emptyStateContainer}>
                  <EmptyTimerSvg
                    width={80}
                    height={80}
                    title={'Aún no tienes tareas cargadas'}
                    description={'Utiliza el contador para registrarlas'}
                  />
                </View>
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
        <View style={styles.projectData__bottomButtonContainer}>
          <Button status={'success'}>Finalizar proyecto</Button>
        </View>
        <ModalWithBackdrop
          isVisible={showModal}
          title="Detalle de tarea"
          label={`Tiempo: ${convertToDuration(taskData.secondsFromDate)}`}
          description={`Descripción: ${taskData.description}`}
          altDescription={`Monto: $${secondsToMoney(
            taskData.secondsFromDate,
            projectSelected?.amountXHour!,
          )}`}
          primaryButtonLabel="Guardar"
          onPressPrimary={saveTimeonDB}
          onPressSecondary={showModalHandler}
          secondaryButtonLabel={'Cancelar'}
          onBackdropPress={showModalHandler}
        />
      </SafeAreaView>
    </Layout>
  );
};

export default ProjectDataScreen;
