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
import {ViewStyle} from 'react-native';
import PaperPlaneLogo from './PaperPlaneLogo';

export interface RightActionsMenuProps {
  extraRightIconName?: string;
  onPressFirstListItem?: () => void;
  onPressSecondListItem?: () => void;
  firstListItemLabel?: string;
  firstListItemIconName?: string;
  secondListItemLabel?: string;
  secondListItemIconName?: string;
}

interface AppBarProps {
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
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const MenuIcon = (props: any) => <Icon {...props} name="more-vertical" />;

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
              <Icon name={firstListItemIconName} />
            ) : undefined
          }
          title={firstListItemLabel}
          onPress={onPressFirstListItem}
        />
        <MenuItem
          accessoryLeft={
            secondListItemIconName ? (
              <Icon name={secondListItemIconName} />
            ) : undefined
          }
          title={secondListItemLabel}
          onPress={onPressSecondListItem}
        />
      </OverflowMenu>
    </>
  );

  return (
    <>
      <TopNavigation
        style={customStyle}
        accessoryLeft={
          <TopNavigationAction
            icon={
              iconLeft ? (
                <Icon iconName={iconLeft} />
              ) : (
                <PaperPlaneLogo
                  width={30}
                  height={30}
                  borderColor={colors['color-primary-default']}
                />
              )
            }
            onPress={onLeftAccesoryPress}
          />
        }
        accessoryRight={
          rightMenu
            ? renderRightActions({...renderRightActionsProps})
            : undefined
        }
        alignment={alignment}
        title={evaProps => <Text {...evaProps}>{title}</Text>}
      />
    </>
  );
};

export default AppBar;
