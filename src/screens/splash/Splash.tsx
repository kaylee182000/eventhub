import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { appInfos } from '../../constants/appInfo';
import { Space } from '../../components';
import { appColors } from '../../constants/appColors';

const Splash = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/splash-background.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('../../assets/img/splash-logo.png')}
        style={{ width: appInfos.SIZES.WIDTH * 0.7, resizeMode: 'contain' }}
      />
      <Space height={16} />
      <ActivityIndicator color={appColors.primary} size={24} />
    </ImageBackground>
  );
};

export default Splash;
