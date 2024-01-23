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
  flex?: number;
}

const CustomText = (props: CustomTextProps) => {
  const { text, color, fontSize, fontFamily, styles, title, flex } = props;
  return (
    <Text
      style={[
        globalStyles.primaryText,
        {
          flex: flex ? 1 : 0,
          color: color ?? appColors.text,
          fontSize: title ? 24 : fontSize ? fontSize : 14,
          fontFamily: title
            ? appFonts.bold
            : fontFamily
            ? fontFamily
            : appFonts.regular,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  );
};

export default CustomText;
