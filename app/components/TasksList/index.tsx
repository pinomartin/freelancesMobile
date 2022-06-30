import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Button, Icon, IconProps, List, ListItem} from '@ui-kitten/components';
import {EvaSize} from '@ui-kitten/components/devsupport';
import {TaskTime} from '../../interfaces/tasktime';
import {getStyles} from './styles';

interface Props {
  data: any[];
  showScrollBarIndicator?: boolean;
  customContainerStyle?: StyleProp<ViewStyle>;
  listItemMinHeigth?: number;
  showAccesoryButtons?: boolean;
  accesoryButtonsSize?: EvaSize;
  leftIconName?: string;
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
      title={`${item.hours}hs ${item.minutes}min ${item.seconds}seg`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={showAccesoryButtons ? accessoryButtons : undefined}
      style={{minHeight: listItemMinHeigth}}
    />
  );

  return (
    <List
      style={[{maxHeight: listItemMinHeigth * 4}, customContainerStyle]}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={showScrollBarIndicator}
    />
  );
};
