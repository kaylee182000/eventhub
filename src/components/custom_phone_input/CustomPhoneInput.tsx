import React from 'react';
import {
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';
import { CustomText } from '..';
import { appColors } from '../../constants/appColors';

interface CustomPhoneInputProps extends PhoneInputProps, UseControllerProps {
  name: string;
  defaultValue?: string;
  defaultCode: any;
}

const ControlledPhoneInput = (
  controlledPhoneInputProps: CustomPhoneInputProps,
) => {
  const formContext = useFormContext();

  const { formState } = formContext;

  const { name, defaultValue, rules, onChangeCountry, defaultCode } =
    controlledPhoneInputProps;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  const errorBorder = hasError ? appColors.errorColor : appColors.blackOpacity;

  return (
    <>
      <View style={[styles.inputContainer, { borderColor: errorBorder }]}>
        <PhoneInput
          value={field.value}
          onChangeText={field.onChange}
          defaultCode={defaultCode}
          onChangeCountry={onChangeCountry}
          layout="first"
          placeholder="Phone number"
          containerStyle={[
            styles.phoneInput,
            {
              width: '90%',
            },
          ]}
          textContainerStyle={[
            styles.phoneInput,
            {
              paddingHorizontal: 0,
            },
          ]}
          textInputStyle={[styles.phoneInput]}
        />
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

const CustomPhoneInput = (props: CustomPhoneInputProps) => {
  return <ControlledPhoneInput {...props} />;
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    width: '74%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.blackOpacity,
    marginTop: 8,
  },
  errorContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  phoneInput: {
    backgroundColor: 'transparent',
    height: 56,
  },
});

export default CustomPhoneInput;
