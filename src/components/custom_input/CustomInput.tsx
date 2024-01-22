import { Eye, EyeSlash } from 'iconsax-react-native';
import React, { ReactNode, useState } from 'react';
import {
  KeyboardType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { appColors } from '../../constants/appColors';
import { globalStyles } from '../../styles/globalStyles';

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
  placeholder?: string;
  isPassword?: boolean;
  allowClear?: boolean;
  keyboardType?: KeyboardType;
}

const CustomInput = (props: CustomInputProps) => {
  const {
    onChange,
    prefix,
    suffix,
    value,
    isPassword,
    placeholder,
    allowClear,
    keyboardType,
  } = props;

  const [isShowPwd, setIsShowPwd] = useState(isPassword ? true : false);

  return (
    <View style={styles.inputContainer}>
      {prefix ?? prefix}
      <TextInput
        style={[styles.input, globalStyles.primaryText]}
        value={value}
        placeholder={placeholder ?? ''}
        onChangeText={(val) => onChange(val)}
        secureTextEntry={isShowPwd}
        placeholderTextColor={'#747688'}
        keyboardType={keyboardType ?? 'default'}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPwd(!isShowPwd) : () => onChange('')
        }
      >
        {isPassword ? (
          <FontAwesome
            name={isShowPwd ? 'eye-slash' : 'eye'}
            size={22}
            color={appColors.gray}
          />
        ) : (
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={22} color={appColors.gray} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: appColors.white,
    marginBottom: 18,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
  },
});

export default CustomInput;
