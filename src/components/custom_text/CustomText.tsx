import { View, Text, TextStyle, StyleProp } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../constants/appColors';
import { appFonts } from '../../constants/appFonts';

interface CustomTextProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  title?: boolean;
  styles?: StyleProp<TextStyle>;
}

const CustomText = (props: CustomTextProps) => {
  const { text, color, fontSize, fontFamily, styles, title } = props;
  return (
    <Text
      style={[
        globalStyles.primaryText,
        {
          color: color ?? appColors.text,
          fontSize: fontSize ?? title ? 24 : 14,
          fontFamily: fontFamily ?? title ? appFonts.bold : appFonts.regular,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  );
};

export default CustomText;
