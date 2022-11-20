import {StyleSheet} from 'react-native';

const colors = {
  elevation: '#000',
  // elevation: 'rgb(72, 95, 127)',
};
const elevations = StyleSheet.create({
  elevation02: {
    shadowColor: colors.elevation,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  elevation04: {
    shadowColor: colors.elevation,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    elevation: 4,
  },
  elevation06: {
    shadowColor: colors.elevation,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 6,
  },
  elevation08: {
    shadowColor: colors.elevation,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 8,
  },
  elevation10: {
    shadowColor: colors.elevation,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 10,
  },
  elevation12: {
    shadowColor: colors.elevation,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 12,
  },
});

export default elevations;
