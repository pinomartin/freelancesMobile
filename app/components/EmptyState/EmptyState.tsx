import {Text} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleProp, useColorScheme, View, ViewStyle} from 'react-native';
import PaperPlaneWithLine from '../PaperPlaneWithLine';
import getStyles from './styles';

interface Props {
  title: string;
  withCustomImage?: boolean;
  imgURL?: string;
  description: string;
  customStyle?: StyleProp<ViewStyle>;
}

const EmptyState = ({
  title,
  description,
  customStyle,
  withCustomImage = false,
  imgURL = '',
}: Props) => {
  const styles = getStyles();
  const colorScheme = useColorScheme();
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
        <PaperPlaneWithLine
          borderColor={colorScheme === 'dark' ? '#3366FF' : undefined}
        />
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
