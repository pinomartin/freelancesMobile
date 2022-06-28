import React from 'react';
import {Button, Icon, IconProps, List, ListItem} from '@ui-kitten/components';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TaskTime} from '../../interfaces/tasktime';

interface Props {
  data: any[];
  showScrollBarIndicator?: boolean;
  customContainerStyle?: StyleProp<ViewStyle>;
  listItemMinHeigth?: number;
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
}: Props) => {
  const renderItemAccessory = () => (
    <View style={{flexDirection: 'row'}}>
      <Button
        size="small"
        status={'warning'}
        accessoryRight={<Icon name="edit-outline" />}
      />

      <View style={{marginHorizontal: 4}} />
      <Button
        size="small"
        status={'danger'}
        accessoryRight={<Icon name="trash" />}></Button>
    </View>
  );

  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name="clock-outline" />
  );

  const renderItem = ({item, index}: ListItemCustomProps) => (
    <ListItem
      title={`${item.hours}hs ${item.minutes}min ${item.seconds}seg`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
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
