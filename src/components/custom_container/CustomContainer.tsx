import React, { ReactNode } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import { CustomHeader } from '..';
import { globalStyles } from '../../styles/globalStyles';

interface CustomContainerProps {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  showHeader?: boolean;
  onPressNavigate?: () => void;
}

const CustomContainer = (props: CustomContainerProps) => {
  const {
    children,
    isImageBackground,
    isScroll,
    title,
    showHeader,
    onPressNavigate,
  } = props;

  const returnContainer = () => {
    if (isScroll) {
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={[{ flex: 1 }]}>
          {children}
        </ScrollView>
      );
    } else {
      return <View style={[{ flex: 1 }]}>{children}</View>;
    }
  };

  return isImageBackground ? (
    <ImageBackground
      source={require('../../assets/img/splash-background.png')}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}
    >
      {showHeader && onPressNavigate && (
        <CustomHeader onPress={onPressNavigate} />
      )}
      <SafeAreaView style={{ flex: 1 }}>{returnContainer()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      {showHeader && onPressNavigate && (
        <CustomHeader onPress={onPressNavigate} />
      )}
      {returnContainer()}
    </SafeAreaView>
  );
};

export default CustomContainer;
