import {Text} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleProp, useColorScheme, View, ViewStyle} from 'react-native';
import PaperPlaneWithLine from '../PaperPlaneWithLine';
import TimerSvg from './Timer/TimerSvg';
import getStyles from './styles';

interface Props {
  title: string;
  withCustomImage?: boolean;
  svgIcon: SVGs;
  imgURL?: string;
  description: string;
  customStyle?: StyleProp<ViewStyle>;
}

export enum SVGs {
  PAPERPLANE = 'PAPERPLANE',
  TIMER = 'TIMER',
}

const EmptyState = ({
  title,
  description,
  customStyle,
  withCustomImage = false,
  imgURL = '',
  svgIcon = SVGs.PAPERPLANE,
}: Props) => {
  const styles = getStyles();
  const colorScheme = useColorScheme();

  const svgIconRenderHandler = () => {
    switch (svgIcon) {
      case SVGs.PAPERPLANE:
        return (
          <PaperPlaneWithLine
            borderColor={colorScheme === 'dark' ? '#3366FF' : undefined}
          />
        );
      case SVGs.TIMER:
        return <TimerSvg width={80} height={80} />;
    }
  };

  return (
    <View style={[styles.emptyState__mainContainer, customStyle]}>
      {withCustomImage ? (
        <Image
          style={styles.emptyState__image}
          source={{
            uri: imgURL,
          }}
        />
      ) : (
        svgIconRenderHandler()
      )}
      <View style={styles.emptyState__text__container}>
        <Text
          category={'h5'}
          status={'primary'}
          style={styles.emptyState__text__title}>
          {title}
        </Text>
        <Text category={'p1'} style={styles.emptyState__text__description}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default EmptyState;
