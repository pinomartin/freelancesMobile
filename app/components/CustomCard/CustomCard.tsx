import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  Button,
  Card,
  CardProps,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import {getStyles} from './styles';

interface Props {
  label: string;
  headerTitle: string;
  headerSubtitle?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPressPrimary?: () => void;
  onPressSecondary?: () => void;
  customStyle?: StyleProp<ViewStyle>;
  customFooterStyle?: StyleProp<ViewStyle>;
  withFooter?: boolean;
  withHeader?: boolean;
}

export const CustomCard = ({
  headerTitle,
  label,
  customStyle,
  customFooterStyle,
  headerSubtitle,
  onPressPrimary,
  onPressSecondary,
  primaryButtonLabel,
  secondaryButtonLabel,
  withFooter,
  withHeader,
}: Props) => {
  const styles = getStyles();

  const Header = () => (
    <View style={styles.headerContainer}>
      <Text category="h6">{headerTitle}</Text>
      {headerSubtitle ? <Text category="s1">{headerSubtitle}</Text> : null}
    </View>
  );

  const Footer = () => (
    <View style={[customFooterStyle, styles.footerContainer]}>
      {secondaryButtonLabel && onPressSecondary && (
        <Button
          style={styles.footerControl}
          size="small"
          status="basic"
          onPress={onPressSecondary}>
          {secondaryButtonLabel}
        </Button>
      )}
      {onPressPrimary && primaryButtonLabel && (
        <Button
          style={styles.footerControl}
          size="small"
          status="primary"
          onPress={onPressSecondary}>
          {primaryButtonLabel}
        </Button>
      )}
    </View>
  );

  return (
    <React.Fragment>
      <Card
        style={[styles.card, customStyle]}
        header={withHeader ? Header : undefined}
        footer={withFooter ? Footer : undefined}>
        <Text>{label}</Text>
      </Card>
    </React.Fragment>
  );
};
