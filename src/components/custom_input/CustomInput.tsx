import React, { ReactNode, useState } from 'react';
import {
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CustomText } from '..';
import { appColors } from '../../constants/appColors';
import { globalStyles } from '../../styles/globalStyles';

interface CustomInputProps extends UseControllerProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  placeholder?: string;
  isPassword?: boolean;
  allowClear?: boolean;
  keyboardType?: KeyboardType;
  customStyles?: StyleProp<ViewStyle>;
  onResetField?: any;
  //controller props
  name: string;
  defaultValue?: string;
}

const ControlledInput = (conntrolledInputProps: CustomInputProps) => {
  const formContext = useFormContext();

  const { formState } = formContext;

  const {
    prefix,
    suffix,
    isPassword,
    placeholder,
    allowClear,
    keyboardType,
    customStyles,
    onResetField,
    //controller props
    name,
    defaultValue,
    rules,
  } = conntrolledInputProps;

  const [isShowPwd, setIsShowPwd] = useState(isPassword ? true : false);

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  const errorBorder = hasError ? appColors.errorColor : appColors.blackOpacity;

  return (
    <>
      <View
        style={[
          styles.inputContainer,
          customStyles,
          { borderColor: errorBorder },
        ]}
      >
        {prefix ?? prefix}
        <TextInput
          autoCapitalize="none"
          style={[styles.input, globalStyles.primaryText]}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          placeholder={placeholder ?? ''}
          secureTextEntry={isShowPwd}
          placeholderTextColor={appColors.gray}
          keyboardType={keyboardType ?? 'default'}
          cursorColor={appColors.primary}
        />
        {suffix ?? suffix}
        <TouchableOpacity
          onPress={
            isPassword
              ? () => setIsShowPwd(!isShowPwd)
              : allowClear
              ? () => onResetField(name)
              : () => {}
          }
        >
          {isPassword ? (
            <FontAwesome
              name={isShowPwd ? 'eye-slash' : 'eye'}
              size={22}
              color={appColors.gray}
            />
          ) : (
            field.value?.length > 0 &&
            allowClear && (
              <AntDesign name="close" size={22} color={appColors.gray} />
            )
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.errorContainer}>
        {hasError && (
          <CustomText
            text={formState.errors[name]?.message as string}
            color={appColors.errorColor}
            fontSize={13}
          />
        )}
      </View>
    </>
  );
};

const CustomInput = (props: CustomInputProps) => {
  const {
    //controller props
    name,
  } = props;

  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  return <ControlledInput {...props} />;
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: appColors.blackOpacity,
    marginTop: 8,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
  },
  errorContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
});

export default CustomInput;
