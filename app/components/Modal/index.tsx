import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Modal, Text} from '@ui-kitten/components';

interface Props {
  isVisible: boolean;
  label: string;
  onPressPrimary: () => void;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  onPressSecondary?: () => void;
  onBackdropPress?: () => void;
}

export const ModalWithBackdrop = ({
  isVisible,
  label,
  onPressPrimary,
  primaryButtonLabel = 'Guardar',
  onPressSecondary,
  secondaryButtonLabel,
  onBackdropPress,
}: Props) => {
  // const [visible, setVisible] = React.useState(isVisible);

  return (
    <View style={styles.container}>
      <Modal
        visible={isVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={onBackdropPress}>
        <Card disabled={true}>
          <Text>{label}</Text>
          <Button
            onPress={() => {
              onPressPrimary();
            }}>
            {primaryButtonLabel}
          </Button>
          {secondaryButtonLabel && onPressSecondary && (
            <Button
              onPress={() => {
                onPressSecondary();
              }}>
              {secondaryButtonLabel}
            </Button>
          )}
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
