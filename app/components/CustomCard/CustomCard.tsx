import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Button, Card, Text} from '@ui-kitten/components';
import {getStyles} from './styles';
import {EvaSize, EvaStatus} from '@ui-kitten/components/devsupport/typings';

interface Props {
  label: string;
  labelLinesNumber?: number;
  headerTitle: string;
  headerSubtitle?: string;
  headerRightText?: string;
  primaryButtonLabel?: string;
  primaryButtonStatus?: EvaStatus;
  primaryButtonSize?: EvaSize;
  secondaryButtonLabel?: string;
  secondaryButtonStatus?: EvaStatus;
  secondaryButtonSize?: EvaSize;
  onPressCard?: () => void;
  onPressPrimary?: () => void;
  onPressSecondary?: () => void;
  customStyle?: StyleProp<ViewStyle>;
  customFooterStyle?: StyleProp<ViewStyle>;
  withFooter?: boolean;
  withHeader?: boolean;
  status?: EvaStatus;
  withShadow?: boolean;
}

export const CustomCard = ({
  headerTitle,
  headerSubtitle,
  headerRightText,
  label,
  labelLinesNumber = 2,
  customStyle,
  customFooterStyle,
  onPressCard,
  onPressPrimary,
  onPressSecondary,
  primaryButtonLabel,
  primaryButtonStatus = 'primary',
  primaryButtonSize = 'small',
  secondaryButtonLabel,
  secondaryButtonStatus = 'basic',
  secondaryButtonSize = 'small',
  withFooter,
  withHeader,
  status,
  withShadow,
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
          size={secondaryButtonSize}
          status={secondaryButtonStatus}
          onPress={onPressSecondary}>
          {secondaryButtonLabel}
        </Button>
      )}
      {onPressPrimary && primaryButtonLabel && (
        <Button
          style={styles.footerControl}
          size={primaryButtonSize}
          status={primaryButtonStatus}
          onPress={onPressPrimary}>
          {primaryButtonLabel}
        </Button>
      )}
    </View>
  );

  return (
    <View style={withShadow && styles.shadow}>
      <Card
        style={[styles.card, customStyle]}
        header={withHeader ? Header : undefined}
        footer={withFooter ? Footer : undefined}
        status={status}
        onPress={onPressCard}>
        <View style={styles.labelContainer}>
          <Text category={'p1'} numberOfLines={labelLinesNumber}>
            {label}
          </Text>
        </View>
      </Card>
    </View>
  );
};
