import {StyleSheet} from 'react-native';

export const getStyles = () => {
  const globalPadding = 8;
  return StyleSheet.create({
    projectData__mainContainer: {
      flex: 1,
    },
    projectData__globalPadding: {
      paddingHorizontal: globalPadding * 2,
    },
    projectData__listContainer: {
      marginTop: globalPadding * 3,
    },
  });
};
