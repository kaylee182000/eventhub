import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';

interface CustomSectionProps {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const CustomSection = (props: CustomSectionProps) => {
  const { children, styles } = props;
  return <View style={[globalStyles.section, {}, styles]}>{children}</View>;
};

export default CustomSection;
