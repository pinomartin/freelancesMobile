import {TextProps} from '@ui-kitten/components';
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Toast from 'react-native-toast-message';



interface ToastProps {
  type: 'success' | 'error' | 'info';
  title: string;
  subtitle: string;
  position?: 'top' | 'bottom';
  autoHide?: boolean;
  visibilityTime?: number;
  topOffset?: number;
  bottomOffset?: number;
}

export const showToast = ({
  type = 'success',
  title,
  subtitle,
  position = 'top',
  autoHide = true,
  visibilityTime = 4000,
  topOffset,
  bottomOffset,
}: ToastProps) => {
  Toast.show({
    type: type,
    text1: title,
    text2: subtitle,
    position,
    autoHide,
    visibilityTime,
    topOffset,
    bottomOffset,
  });
};

export const hideToast = () => Toast.hide();
