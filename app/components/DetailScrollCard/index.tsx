import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {ScrollView} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {getDateFromUNIX, getStringDateFromDate} from '../../utils/general/time';
import TextTwoLines from '../TextTwoLines';
import {getStyles} from './styles';

interface Props {
  client: string;
  clientLabel?: string;
  date: number;
  dateLabel?: string;
  type: string;
  typeLabel?: string;
  hours: number;
  hourLabel: string;
  totalAmount: number;
  totalLabel?: string;
}

const DetailScrollCard = ({
  client,
  clientLabel = 'Cliente',
  date,
  dateLabel = 'Creado',
  type,
  typeLabel = 'Tipo',
  hours,
  hourLabel,
  totalAmount,
  totalLabel = 'Total estimado',
}: Props) => {
  const styles = getStyles();
  const colors = useTheme();

  return (
    <Animated.View
      key={'unique'}
      entering={FadeIn.duration(400)}
      // exiting={FadeOut.duration(400)}
      style={[styles.globalPadding, styles.elevation]}>
      <ScrollView
        style={[
          styles.cardContainer,
          {
            backgroundColor: colors['background-basic-color-1'],
          },
        ]}
        showsVerticalScrollIndicator>
        <TextTwoLines title={clientLabel} description={client} />
        <TextTwoLines
          title={dateLabel}
          description={getStringDateFromDate(getDateFromUNIX(date))}
        />
        <TextTwoLines title={typeLabel} description={type} />
        <TextTwoLines title={hourLabel} description={hours} />
        <TextTwoLines title={totalLabel} description={totalAmount} isCurrency />
      </ScrollView>
    </Animated.View>
  );
};

export default DetailScrollCard;
