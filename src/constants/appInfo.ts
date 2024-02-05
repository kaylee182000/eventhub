import { Dimensions } from 'react-native';

export const appInfos = {
  SIZES: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },

  // BASE_URL: 'http://192.168.40.1:8080/api/v1',
  BASE_URL: 'http://192.168.1.13:8080/api/v1',
};
