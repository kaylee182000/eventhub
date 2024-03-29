import { View, Text } from 'react-native';
import React, { useState } from 'react';
import {
  CustomButton,
  CustomContainer,
  CustomInput,
  CustomSection,
  CustomText,
  ModalLoading,
  MyArrowIcon,
  Space,
} from '../../../components';
import { NavigationProp } from '@react-navigation/native';
import { Image } from 'react-native';
import { appColors } from '../../../constants/appColors';
import { Sms } from 'iconsax-react-native';
import { appFonts } from '../../../constants/appFonts';
import { globalStyles } from '../../../styles/globalStyles';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { authApi } from '../../../apis/auth.api';
import { showToast } from '../../../utils';

interface ResetPasswordProps {
  navigation: NavigationProp<any, any>;
}

const ResetPassword = ({ navigation }: ResetPasswordProps) => {
  const { ...methods } = useForm<{ email: string }>({ mode: 'onChange' });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setIsLoading(true);
    const { email } = data;
    try {
      const res = await authApi.ResetPassword({ email: email });
      if (res.data) {
        setIsLoading(false);
        showToast('Changed password successfully', 'success');
        navigation.goBack();
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.message === '403') {
        showToast('User not found', 'error');
      } else {
        showToast('Try again later', 'error');
      }
    }
  };

  return (
    <>
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
            text="Reset Password"
            title
            styles={[{ marginTop: 24, letterSpacing: 1 }]}
          />
          <CustomText
            text={`Please enter your email address to\n request a password reset`}
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
            text={`Enter your Email address`}
            color={appColors.gray}
            fontSize={15}
          />
          <Space height={20} />
          <FormProvider {...methods}>
            <CustomInput
              name="email"
              placeholder="Email"
              prefix={<Sms size={22} color={appColors.gray} />}
              allowClear
              customStyles={{ width: '74%' }}
              onResetField={methods.resetField}
              rules={{
                required: 'Email is required!',
                pattern: {
                  value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                  message: 'Must be formatted: john.doe@email.com',
                },
              }}
            />
          </FormProvider>
          {/* <CustomInput
          placeholder="Email"
          value={email}
          onChange={(val) => setEmail(val)}
          prefix={<Sms size={22} color={appColors.gray} />}
          allowClear
          keyboardType="email-address"
          customStyles={{ width: '65%' }}
        /> */}
        </CustomSection>
        <CustomButton
          onPress={methods.handleSubmit(onSubmit)}
          icon={<MyArrowIcon />}
          iconFlex="right"
          text="Send"
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
      {isLoading && <ModalLoading isVisible={isLoading} />}
    </>
  );
};

export default ResetPassword;
