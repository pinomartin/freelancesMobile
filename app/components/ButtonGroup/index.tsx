import React from 'react';
import {Button, Icon} from '@ui-kitten/components';
import {EvaSize, EvaStatus} from '@ui-kitten/components/devsupport';
import {StyleProp, View, ViewStyle} from 'react-native';
import {getStyles} from './styles';

interface ButtonProps {
  label: string;
  onPress: () => void;
  status: EvaStatus;
  iconName?: string;
  customStyles?: StyleProp<ViewStyle>;
}
interface Props {
  firstButton: ButtonProps;
  secondButton?: ButtonProps;
  thirdButton?: ButtonProps;
  size?: EvaSize;
  customStyle?: StyleProp<ViewStyle>;
}

const ButtonGroup = ({
  firstButton,
  secondButton,
  thirdButton,
  size = 'medium',
  customStyle,
}: Props) => {
  const styles = getStyles();
  return (
    <View style={[styles.buttonGroup__mainContainer, customStyle]}>
      <Button
        style={[styles.buttonGroup__buttonItem, firstButton.customStyles]}
        accessoryLeft={
          firstButton.iconName ? (
            <Icon name={firstButton.iconName} />
          ) : undefined
        }
        status={firstButton.status}
        onPress={firstButton.onPress}
        size={size}>
        {firstButton.label}
      </Button>
      {secondButton ? (
        <Button
          style={[styles.buttonGroup__buttonItem, secondButton.customStyles]}
          accessoryLeft={
            secondButton.iconName ? (
              <Icon name={secondButton.iconName} />
            ) : undefined
          }
          status={secondButton.status}
          onPress={secondButton.onPress}
          size={size}>
          {secondButton.label}
        </Button>
      ) : null}
      {thirdButton ? (
        <Button
          style={[styles.buttonGroup__buttonItem, thirdButton.customStyles]}
          accessoryLeft={
            thirdButton.iconName ? (
              <Icon name={thirdButton.iconName} />
            ) : undefined
          }
          status={thirdButton.status}
          onPress={thirdButton.onPress}
          size={size}>
          {thirdButton.label}
        </Button>
      ) : null}
    </View>
  );
};

export default ButtonGroup;
