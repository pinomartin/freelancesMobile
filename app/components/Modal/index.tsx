import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, Card, Modal, Text} from '@ui-kitten/components';

interface Props {
  isVisible: boolean;
  title: string;
  label: string;
  description?: string;
  altDescription?: string;
  onPressPrimary: () => void;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  onPressSecondary?: () => void;
  onBackdropPress?: () => void;
}

export const ModalWithBackdrop = ({
  isVisible,
  title,
  label,
  description,
  altDescription,
  onPressPrimary,
  primaryButtonLabel = 'Guardar',
  onPressSecondary,
  secondaryButtonLabel,
  onBackdropPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <Modal
        visible={isVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={onBackdropPress}>
        <Card disabled={true} style={styles.cardContainer}>
          <Text category={'h6'} style={styles.titleContainer}>
            {title}
          </Text>
          <View style={styles.textContainer}>
            <Text category={'s1'}>{label}</Text>
          </View>
          <View style={styles.textContainer}>
            {description ? <Text category={'s1'}>{description}</Text> : null}
          </View>
          <View style={styles.textContainer}>
            {altDescription ? (
              <Text category={'s1'}>{altDescription}</Text>
            ) : null}
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              status={'info'}
              onPress={() => {
                onPressPrimary();
              }}>
              {primaryButtonLabel}
            </Button>
            {secondaryButtonLabel && onPressSecondary && (
              <Button
                status={'danger'}
                onPress={() => {
                  onPressSecondary();
                }}>
                {secondaryButtonLabel}
              </Button>
            )}
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    width: Dimensions.get('window').width,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardContainer: {
    width: Dimensions.get('screen').width * 0.8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
  titleContainer: {
    textAlign: 'center',
    marginVertical: 4,
  },
  textContainer: {
    marginVertical: 4,
  },
});
