import {Text} from '@ui-kitten/components';
import React from 'react';
import {getStyles} from './styles';

interface Props {
  title: string;
  description: string | number;
  isCurrency?: boolean;
}
const TextTwoLines = ({title, description, isCurrency = false}: Props) => {
  const styles = getStyles();

  return (
    <Text style={styles.textItem}>
      <Text category={'s2'}>{title}: </Text>
      <Text category={'p1'}>
        {isCurrency ? '$' : ''}
        {description}
      </Text>
    </Text>
  );
};

export default TextTwoLines;
