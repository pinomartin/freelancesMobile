import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {
  Button,
  Icon,
  IconProps,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import {EvaSize} from '@ui-kitten/components/devsupport';
import {TaskTime} from '../../interfaces/tasktime';
import {getStyles} from './styles';
import {secondsToMoney} from '../../utils/money';
import {convertToDuration} from '../../utils/general/time';

interface Props {
  data: any[];
  showScrollBarIndicator?: boolean;
  customContainerStyle?: StyleProp<ViewStyle>;
  listItemMinHeigth?: number;
  showAccesoryButtons?: boolean;
  accesoryButtonsSize?: EvaSize;
  leftIconName?: string;
  label?: string;
  amountEstimated: number;
}

interface ListItemCustomProps {
  item: TaskTime;
  index: number;
}
const mockData = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export const TasksList = ({
  data = mockData,
  showScrollBarIndicator = false,
  customContainerStyle,
  listItemMinHeigth = 88,
  leftIconName = 'clock-outline',
  accesoryButtonsSize = 'small',
  showAccesoryButtons = true,
  label,
  amountEstimated,
}: Props) => {
  const styles = getStyles();

  const accessoryButtons = () => (
    <View style={styles.tasksList__item__container}>
      <Button
        size={accesoryButtonsSize}
        status={'warning'}
        accessoryRight={<Icon name="edit-outline" />}
      />

      <View style={styles.tasksList__item__spacing} />
      <Button
        size={accesoryButtonsSize}
        status={'danger'}
        accessoryRight={<Icon name="trash-2-outline" />}></Button>
    </View>
  );

  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name={leftIconName} />
  );

  const renderItem = ({item, index}: ListItemCustomProps) => (
    <ListItem
      title={convertToDuration(item.secondsFromDate)}
      description={`$${secondsToMoney(item.secondsFromDate, amountEstimated)}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={showAccesoryButtons ? accessoryButtons : undefined}
      style={{minHeight: listItemMinHeigth}}
    />
  );

  return (
    <>
      {label ? (
        <Text category={'s1'} style={styles.tasksList__label}>
          {label}
        </Text>
      ) : null}
      <List
        style={[{maxHeight: listItemMinHeigth * 3}, customContainerStyle]}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={showScrollBarIndicator}
      />
    </>
  );
};
