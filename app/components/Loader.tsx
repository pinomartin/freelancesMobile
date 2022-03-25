import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';
// import {getTheme} from '../utils/theme/colors';

interface LoaderProps {
  containerStyles?: StyleProp<TextStyle>;
  size?: number | 'small' | 'large';
  color?: string;
  loaderStyles?: StyleProp<TextStyle>;
  isFullScreen?: boolean;
}

const Loader = ({
  containerStyles,
  loaderStyles,
  size,
  color = 'red',
  isFullScreen = false,
}: LoaderProps) => {
  return (
    <View
      style={[isFullScreen ? styles.loader__container : null, containerStyles]}>
      <ActivityIndicator
        size={size}
        color={color}
        style={[styles.loader__indicator, loaderStyles]}
      />
    </View>
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
