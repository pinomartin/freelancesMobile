/**
 * @format
 */

import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  Button,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {AppBarProps} from '../../components/AppBar';
import {AuthContext} from '../../context/AuthContext';
import {HomeNavigationProps} from '../../navigation/interface';
import {getStyles} from './style';

const NewProjectScreen = ({navigation, route}: HomeNavigationProps<'home'>) => {
  const colors = useTheme();
  const styles = getStyles();
  const {logout} = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [projectType, setProjectType] = useState<number | undefined>(undefined);

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

  return (
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
                // caption={renderCaption}
                // accessoryRight={renderIcon}
                // secureTextEntry={secureTextEntry}
                onChangeText={nextValue => setDescription(nextValue)}
              />
            </View>
            <View style={[styles.newProject__input__container]}>
              <Text
                category={'s1'}
                style={{alignSelf: 'center', marginBottom: 8}}>
                Tipo de Presupuesto
              </Text>
              <RadioGroup
                style={{flexDirection: 'row', justifyContent: 'space-around'}}
                selectedIndex={projectType}
                onChange={(index: number) => setProjectType(index)}>
                <Radio status={'info'}>Por Hora</Radio>
                <Radio status={'info'}>Presupuesto Total</Radio>
              </RadioGroup>
              <Text category={'p2'}>
                {' '}
                *******TODO: Descripcion de cada tipo de proyecto....
              </Text>
            </View>
          </Layout>
        </ScrollView>
        <View
          style={[
            styles.newProject__submitButton__container,
            styles.newProject__globalSpacing,
          ]}>
          <Button disabled={false}>Crear</Button>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default NewProjectScreen;
