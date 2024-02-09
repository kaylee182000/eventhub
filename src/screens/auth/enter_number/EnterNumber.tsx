import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image } from 'react-native';
import { isValidNumber } from 'react-native-phone-number-input';
import {
  CustomButton,
  CustomContainer,
  CustomPhoneInput,
  CustomSection,
  CustomText,
  MyArrowIcon,
  Space,
} from '../../../components';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { globalStyles } from '../../../styles/globalStyles';

interface EnterNumberProps {
  navigation: NavigationProp<any, any>;
}

const EnterNumber = ({ navigation }: EnterNumberProps) => {
  const [country, setCountry] = useState<any>();

  const { ...methods } = useForm<{ phoneNumber: string }>({ mode: 'onChange' });

  const onError: SubmitErrorHandler<{ phoneNumber: string }> = (errors, e) => {
    return console.log({ errors });
  };

  const onSubmit: SubmitHandler<{ phoneNumber: string }> = (data) => {
    console.log(data);

    navigation.navigate('EnterOtp');
  };

  return (
    <CustomContainer
      isImageBackground
      isScroll
      showHeader
      onPressNavigate={() => navigation.goBack()}
    >
      <CustomSection
        styles={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          },
        ]}
      >
        <Image
          source={require('../../../assets/img/otp-logo.png')}
          style={{ width: 250, height: 250, resizeMode: 'contain' }}
        />
      </CustomSection>
      <CustomSection
        styles={[{ justifyContent: 'center', alignItems: 'center' }]}
      >
        <CustomText
          text="Otp Verification"
          title
          styles={[{ marginTop: 24, letterSpacing: 1 }]}
        />
        <CustomText
          text={`We will send you one-time password\n to your mobile number`}
          styles={[
            {
              marginTop: 24,
              lineHeight: 24,
              fontSize: 15,
              textAlign: 'center',
            },
          ]}
        />
      </CustomSection>
      <CustomSection
        styles={[
          { justifyContent: 'center', alignItems: 'center', marginTop: 24 },
        ]}
      >
        <CustomText
          text={`Enter your phone number`}
          color={appColors.gray}
          fontSize={15}
        />
        <Space height={20} />
        <FormProvider {...methods}>
          <CustomPhoneInput
            defaultCode={'VN'}
            name="phone-input"
            rules={{
              required: 'Phone number is required!',
              validate: (value) => {
                return (
                  isValidNumber(value, country ? country.cca2 : 'VN') ||
                  'Invalid phone number'
                );
              },
            }}
            onChangeCountry={(value) => setCountry(value)}
          />
        </FormProvider>
      </CustomSection>

      <CustomButton
        onPress={methods.handleSubmit(onSubmit, onError)}
        icon={<MyArrowIcon />}
        iconFlex="right"
        text="Get OTP"
        type="primary"
        textStyles={{
          textAlign: 'center',
          fontFamily: appFonts.medium,
          fontSize: 16,
          letterSpacing: 1,
        }}
        styles={[
          globalStyles.shadow,
          { width: 271, alignSelf: 'center', marginVertical: 24 },
        ]}
      />
    </CustomContainer>
  );
};

export default EnterNumber;
