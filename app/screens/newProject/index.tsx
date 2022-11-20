/**
 * @format
 */

import React, {useLayoutEffect} from 'react';
import {
  Button,
  Icon,
  Input,
  Layout,
  Radio,
  RadioGroup,
  RangeDatepicker,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {AppBarProps} from '../../components/AppBar';
// import {AuthContext} from '../../context/AuthContext';
import {HomeNavigationProps} from '../../navigation/interface';
import {getStyles} from './style';
import useNewProject from './useNewProject';
import Loader from '../../components/Loader';
import {
  localMoneyFormat,
  // moneyStringFormat,
} from '../../utils/general/numbersFormatters';

enum PROJECT_BUDGET_TYPE {
  HOUR = 'HOUR',
  TOTAL = 'TOTAL',
}

const NewProjectScreen = ({navigation, route}: HomeNavigationProps<'home'>) => {
  const colors = useTheme();
  const styles = getStyles();
  const {
    clientName,
    description,
    estimatedDates,
    name,
    projectType,
    amountXHour,
    estimatedHours,
    estimatedTotalBudgetAmount,
    hoursPerDay,
    isLoading,
    setClientName,
    setDescription,
    setEstimatedDates,
    setName,
    onSubmit,
    submitButtonIsDisabled,
    onRadioButtonPress,
    estimatedTotalHourProjectCalculator,
    amountXHourInputHandler,
    estimatedTotalBudgetAmountInputHandler,
    hoursInputHandler,
  } = useNewProject();

  const appBarOptions: AppBarProps = {
    title: 'Nuevo Proyecto',
    alignment: 'start',
    rightMenu: false,
    customStyle: {backgroundColor: colors['$color-basic-100']},
    onLeftAccesoryPress: () => navigation.goBack(),
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      appBar: appBarOptions,
    });
  }, [navigation, route]);

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {/* {AlertIcon(styles.captionIcon)} */}
        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };

  const typeBudgetLabelHandler = () => {
    switch (projectType) {
      case 0:
        return 'Defines un precio por hora y cantidad de horas estimadas de trabajo.';

      case 1:
        return 'Defines un precio total presupuestado y una fecha estimada de entrega.';
      default:
        return '';
    }
  };

  const typeBudgetRenderUIHandler = () => {
    switch (projectType) {
      case 0:
        return (
          <>
            <View
              style={[
                styles.newProject__input__container,
                styles.newProject__inputGroup__container,
              ]}>
              <Input
                value={amountXHour.formatted}
                label="Monto por hora"
                size="large"
                // textStyle={{minHeight: 64}}
                keyboardType={'number-pad'}
                placeholder="$0.00"
                style={{width: '45%'}}
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}

                onChangeText={amountXHourInputHandler}
              />
              <Input
                value={estimatedHours.formatted}
                label="Cantidad de horas"
                size="large"
                // textStyle={{minHeight: 64}}
                keyboardType={'number-pad'}
                placeholder="20hs"
                style={{width: '45%'}}
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}

                onChangeText={hoursInputHandler}
              />
            </View>
            <Text style={{alignSelf: 'center'}}>
              {estimatedTotalHourProjectCalculator() !== 0 ? (
                <>
                  <Text category={'p2'}>Monto total estimado a cobrar: </Text>
                  <Text status={'primary'} category={'s1'}>
                    {`${localMoneyFormat(
                      estimatedTotalHourProjectCalculator(),
                      '$',
                    )}`}
                  </Text>
                </>
              ) : (
                ''
              )}
            </Text>
          </>
        );
      case 1:
        return (
          <>
            <View
              style={[
                styles.newProject__input__container,
                styles.newProject__inputGroup__container,
              ]}>
              <Input
                value={estimatedTotalBudgetAmount.formatted}
                label="Monto total estimado"
                size="large"
                placeholder="$15000.00"
                keyboardType={'numeric'}
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                onChangeText={estimatedTotalBudgetAmountInputHandler}
              />
              <Input
                value={hoursPerDay.formatted}
                label="Horas por Dia (aprox)"
                size="large"
                // textStyle={{minHeight: 64}}
                maxLength={1}
                keyboardType={'number-pad'}
                placeholder="3hs al dia"
                style={{width: '45%'}}
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}

                onChangeText={hoursInputHandler}
              />
            </View>
          </>
        );

      default:
        return;
    }
  };

  return isLoading ? (
    <Loader color={'primary'} isFullScreen />
  ) : (
    <Layout style={styles.newProject__mainContainer} level={'2'}>
      <SafeAreaView style={styles.newProject__safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.newProject__scrollView}>
          <Layout
            style={[
              styles.newProject__container,
              styles.newProject__globalSpacing,
            ]}
            level={'2'}>
            <View style={styles.newProject__input__container}>
              <Input
                value={name}
                label="Nombre"
                size="large"
                placeholder="Ej: Freelances app"
                textContentType="name"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                onChangeText={nextValue => setName(nextValue)}
              />
            </View>
            <View style={styles.newProject__input__container}>
              <Input
                value={clientName}
                label="Cliente"
                size="large"
                placeholder="Ej: Estudio Grafica Digital"
                textContentType="organizationName"
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                onChangeText={nextValue => setClientName(nextValue)}
              />
            </View>
            <View style={styles.newProject__input__container}>
              <Input
                value={description}
                label="Qué es lo que harás ?"
                size="large"
                multiline={true}
                textStyle={{minHeight: 64}}
                placeholder="Ej: Freelances app"
                //Fix - prevents new line on enter key press
                blurOnSubmit={true}
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                onChangeText={nextValue => setDescription(nextValue)}
              />
            </View>
            <View style={[styles.newProject__input__container]}>
              <Text
                category={'s1'}
                status={'basic'}
                style={{alignSelf: 'center', marginBottom: 8}}>
                Tipo de Presupuesto
              </Text>
              <RadioGroup
                style={{flexDirection: 'row', justifyContent: 'space-around'}}
                selectedIndex={projectType}
                onChange={onRadioButtonPress}>
                <Radio status={'info'}>Por Hora 🕰️</Radio>
                <Radio status={'info'}>Monto Total 💵</Radio>
              </RadioGroup>
              <View style={styles.newProject__input__container}>
                <Text
                  category={'p2'}
                  status={'basic'}
                  style={styles.newProject__centerAlignment}>
                  {`*${typeBudgetLabelHandler()}*`}
                </Text>
              </View>
              {typeBudgetRenderUIHandler()}
            </View>
            <View>
              <RangeDatepicker
                range={estimatedDates}
                onSelect={nextRange => setEstimatedDates(nextRange)}
                accessoryRight={<Icon name="calendar" />}
                label={'* Fecha inicio - * Fecha fin'}
                // caption={'Soy un caption'}
              />
            </View>
          </Layout>
        </ScrollView>
        <View
          style={[
            styles.newProject__submitButton__container,
            styles.newProject__globalSpacing,
          ]}>
          <Button disabled={submitButtonIsDisabled()} onPress={onSubmit}>
            Crear
          </Button>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default NewProjectScreen;
