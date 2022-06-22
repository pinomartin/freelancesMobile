import {
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, useColorScheme, View, ViewStyle} from 'react-native';
import PaperPlaneLogo from './PaperPlaneLogo';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export interface RightActionsMenuProps {
  extraRightIconName?: string;
  onPressFirstListItem?: () => void;
  onPressSecondListItem?: () => void;
  onPressThirdListItem?: () => void;
  firstListItemLabel?: string;
  firstListItemIconName?: string;
  secondListItemLabel?: string;
  secondListItemIconName?: string;
  thirdListItemLabel?: string;
  thirdListItemIconName?: string;
  isMenuVisible?: boolean;
}

export interface AppBarProps {
  title: string;
  customStyle?: ViewStyle;
  titleWithLogo?: boolean;
  iconLeft?: string;
  onLeftAccesoryPress?: () => void;
  iconRight?: string;
  onRightIconPress?: () => void;
  rightMenu?: boolean;
  renderRightActionsProps?: RightActionsMenuProps;
  alignment?: 'start' | 'center';
}

const AppBar = ({
  title,
  customStyle,
  titleWithLogo = false,
  iconLeft = '',
  onLeftAccesoryPress,
  alignment = 'center',
  iconRight = '',
  onRightIconPress,
  rightMenu = false,
  renderRightActionsProps,
}: AppBarProps) => {
  const colors = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const [menuVisible, setMenuVisible] = useState(false);

  const ICON__FILL__COLOR = colors['color-info-600'];
  const VERTICALPOINTSICON__FILL__COLOR = colors['color-info-900'];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const MenuIcon = (props: any) => (
    <Icon
      {...props}
      name="more-vertical"
      fill={VERTICALPOINTSICON__FILL__COLOR}
    />
  );

  const renderIcon = (props: any, name: string) => (
    <Icon {...props} name={name} />
  );

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = ({
    extraRightIconName = '',
    onPressFirstListItem,
    firstListItemLabel,
    firstListItemIconName,
    secondListItemLabel,
    secondListItemIconName,
    onPressSecondListItem,
    thirdListItemIconName,
    onPressThirdListItem,
    thirdListItemLabel,
  }: RightActionsMenuProps) => (
    <>
      {extraRightIconName ? (
        <TopNavigationAction icon={<Icon name={extraRightIconName} />} />
      ) : null}
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem
          accessoryLeft={
            firstListItemIconName ? (
              <Icon name={firstListItemIconName} fill={ICON__FILL__COLOR} />
            ) : undefined
          }
          title={firstListItemLabel}
          onPressOut={toggleMenu}
          onPress={onPressFirstListItem}
        />
        <MenuItem
          accessoryLeft={
            secondListItemIconName ? (
              <Icon name={secondListItemIconName} fill={ICON__FILL__COLOR} />
            ) : undefined
          }
          title={secondListItemLabel}
          onPressOut={toggleMenu}
          onPress={onPressSecondListItem}
        />
        {thirdListItemIconName && thirdListItemLabel ? (
          <MenuItem
            accessoryLeft={
              thirdListItemIconName ? (
                <Icon name={thirdListItemIconName} fill={ICON__FILL__COLOR} />
              ) : undefined
            }
            title={thirdListItemLabel}
            onPressOut={toggleMenu}
            onPress={onPressThirdListItem}
          />
        ) : (
          <></>
        )}
      </OverflowMenu>
    </>
  );

  return (
    <View
      style={[
        styles.appBar__safeArea,
        {backgroundColor: colors['background-basic-color-1']},
      ]}>
      <TopNavigation
        style={customStyle}
        accessoryLeft={
          <TopNavigationAction
            icon={
              iconLeft ? (
                renderIcon({fill: ICON__FILL__COLOR}, iconLeft)
              ) : (
                <PaperPlaneLogo
                  width={30}
                  height={30}
                  borderColor={ICON__FILL__COLOR}
                />
              )
            }
            onPress={onLeftAccesoryPress}
          />
        }
        accessoryRight={
          rightMenu ? (
            renderRightActions({...renderRightActionsProps})
          ) : (
            <TopNavigationAction
              icon={
                iconRight
                  ? renderIcon({fill: ICON__FILL__COLOR}, iconRight)
                  : undefined
              }
              onPress={onRightIconPress}
            />
          )
        }
        alignment={alignment}
        title={evaProps => <Text {...evaProps}>{title}</Text>}
      />
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBar__safeArea: {
    paddingTop: getStatusBarHeight(true),
  },
});
