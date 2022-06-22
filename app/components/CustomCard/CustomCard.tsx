import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Button, Card, Text} from '@ui-kitten/components';
import {getStyles} from './styles';
import {EvaStatus} from '@ui-kitten/components/devsupport/typings';

interface Props {
  label: string;
  headerTitle: string;
  headerSubtitle?: string;
  headerRightText?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPressPrimary?: () => void;
  onPressSecondary?: () => void;
  customStyle?: StyleProp<ViewStyle>;
  customFooterStyle?: StyleProp<ViewStyle>;
  withFooter?: boolean;
  withHeader?: boolean;
  status?: EvaStatus;
}

export const CustomCard = ({
  headerTitle,
  headerSubtitle,
  headerRightText,
  label,
  customStyle,
  customFooterStyle,
  onPressPrimary,
  onPressSecondary,
  primaryButtonLabel,
  secondaryButtonLabel,
  withFooter,
  withHeader,
  status,
}: Props) => {
  const styles = getStyles();

  const Header = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text category="h6">{headerTitle}</Text>
        {headerSubtitle ? <Text category="s1">{headerSubtitle}</Text> : null}
      </View>
      {headerRightText ? (
        <View style={styles.header__rightText__container}>
          <Text>{headerRightText}</Text>
        </View>
      ) : null}
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
    <Card
      style={[styles.card, customStyle]}
      header={withHeader ? Header : undefined}
      footer={withFooter ? Footer : undefined}
      status={status}>
      <Text>{label}</Text>
    </Card>
  );
};
