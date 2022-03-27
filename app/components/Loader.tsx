import {Layout, Spinner} from '@ui-kitten/components';
import {EvaSize, EvaStatus} from '@ui-kitten/components/devsupport';
import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

interface LoaderProps {
  containerStyles?: StyleProp<ViewStyle>;
  size?: EvaSize;
  color?: EvaStatus;
  loaderStyles?: StyleProp<TextStyle>;
  isFullScreen?: boolean;
}

const Loader = ({
  containerStyles,
  size,
  color,
  isFullScreen = false,
}: LoaderProps) => {
  return (
    <Layout
      style={[isFullScreen ? styles.loader__container : null, containerStyles]}>
      <Spinner status={color} size={size} />
    </Layout>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader__container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader__indicator: {},
});
