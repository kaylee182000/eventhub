import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { CustomText } from '..';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../constants/appColors';

enum CustomButtonTypes {}

interface CustomButtonProps {
  icon?: React.ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  onPress: () => void;
  iconFlex?: 'left' | 'right';
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    onPress,
    text,
    color,
    icon,
    styles,
    textColor,
    textStyles,
    type,
    iconFlex,
  } = props;
  return type === 'primary' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.btnContainer,
        { backgroundColor: color ?? appColors.primary },
        styles,
      ]}
    >
      {icon && iconFlex === 'left' && icon}
      <CustomText
        text={text}
        color={textColor ?? appColors.white}
        styles={[textStyles, { marginLeft: icon ? 12 : 0 }]}
        flex={icon && iconFlex === 'right' ? 1 : 0}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity>
      <CustomText
        text={text}
        color={type === 'link' ? appColors.link : appColors.text}
        styles={textStyles}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;
