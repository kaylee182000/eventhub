import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyles } from '../../styles/globalStyles';

interface CustomContainerProps {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
}

const CustomContainer = (props: CustomContainerProps) => {
  const { children, isImageBackground, isScroll, title } = props;

  const returnContainer = () => {
    if (isScroll) {
      return (
        <ScrollView
          style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}
        >
          {children}
        </ScrollView>
      );
    } else {
      return (
        <View
          style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}
        >
          {children}
        </View>
      );
    }
  };

  return isImageBackground ? (
    <ImageBackground
      source={require('../../assets/img/splash-background.png')}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{returnContainer()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{returnContainer()}</View>
    </SafeAreaView>
  );
};

export default CustomContainer;
