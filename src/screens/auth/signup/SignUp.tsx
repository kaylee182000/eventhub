import { NavigationProp } from '@react-navigation/native';
import { Lock, Sms, User } from 'iconsax-react-native';
import React, { useState } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Image, View } from 'react-native';
import { authApi } from '../../../apis/auth.api';
import {
  CustomButton,
  CustomContainer,
  CustomInput,
  CustomSection,
  CustomText,
  ModalLoading,
  MyArrowIcon,
} from '../../../components';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { globalStyles } from '../../../styles/globalStyles';
import { showToast } from '../../../utils';

interface SignUpProps {
  navigation: NavigationProp<any, any>;
}

interface FormValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { ...methods } = useForm<FormValue>({ mode: 'onChange' });

  const password = methods.watch('password', '');

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    setIsLoading(true);
    try {
      const { email } = data;
      const res = await authApi.SendVerificationCode({
        email: email,
      });

      if (res.data) {
        methods.reset({
          username: '',
          password: '',
          email: '',
          confirmPassword: '',
        });
        navigation.navigate('EnterOtp', {
          code: res.data.code,
          ...data,
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.message === '400') {
        showToast('User already exists', 'error');
      } else {
        showToast('Try again later', 'error');
      }
    }
  };

  const PrefixSvgIcon = (icon: string) => {
    if (icon === 'Facebook') {
      return (
        <Image
          source={require('../../../assets/img/facebook-icon.png')}
          width={30}
          height={30}
        />
      );
    } else {
      return (
        <Image
          source={require('../../../assets/img/google-icon.png')}
          width={30}
          height={30}
        />
      );
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
        <CustomSection>
          <CustomText text="Sign up" title />
        </CustomSection>

        <CustomSection>
          <FormProvider {...methods}>
            <CustomInput
              name="username"
              placeholder="Username"
              prefix={<User size={22} color={appColors.gray} />}
              allowClear
              onResetField={methods.resetField}
              rules={{ required: 'Username is required!' }}
            />
            <CustomInput
              name="email"
              placeholder="Email"
              prefix={<Sms size={22} color={appColors.gray} />}
              allowClear
              onResetField={methods.resetField}
              rules={{
                required: 'Email is required!',
                pattern: {
                  value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                  message: 'Must be formatted: john.doe@email.com',
                },
              }}
            />
            <CustomInput
              name="password"
              placeholder="Password"
              prefix={<Lock size={22} color={appColors.gray} />}
              isPassword
              rules={{
                required: 'Password is required!',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                maxLength: {
                  value: 12,
                  message: 'Password can only have a maximum of 12 characters',
                },
              }}
            />
            <CustomInput
              name="confirmPassword"
              placeholder="Password"
              prefix={<Lock size={22} color={appColors.gray} />}
              isPassword
              rules={{
                required: 'Confirm password is required!',
                validate: (value) => {
                  return value === password || 'The passwords do not match';
                },
              }}
            />
          </FormProvider>

          <CustomButton
            onPress={methods.handleSubmit(onSubmit)}
            text="SIGN UP"
            icon={<MyArrowIcon />}
            iconFlex="right"
            type="primary"
            textStyles={{
              textAlign: 'center',
              fontFamily: appFonts.medium,
              fontSize: 16,
              letterSpacing: 1,
            }}
            styles={[
              globalStyles.shadow,
              { width: 271, alignSelf: 'center', marginVertical: 36 },
            ]}
          />

          <CustomText
            text="OR"
            fontSize={16}
            color={appColors.gray2}
            fontFamily={appFonts.medium}
            styles={{ textAlign: 'center', marginBottom: 6 }}
          />
          <CustomButton
            onPress={() => {}}
            text="Login with Google"
            icon={PrefixSvgIcon('Google')}
            iconFlex="left"
            type="primary"
            textStyles={{
              textAlign: 'center',
              fontFamily: appFonts.regular,
              fontSize: 16,
              color: appColors.black,
            }}
            styles={[
              globalStyles.shadow,
              {
                width: 271,
                alignSelf: 'center',
                backgroundColor: appColors.white,
                marginBottom: 18,
              },
            ]}
          />
          <CustomButton
            onPress={() => {}}
            text="Login with Facebook"
            icon={PrefixSvgIcon('Facebook')}
            iconFlex="left"
            type="primary"
            textStyles={{
              textAlign: 'center',
              fontFamily: appFonts.regular,
              fontSize: 16,
              color: appColors.black,
            }}
            styles={[
              globalStyles.shadow,
              {
                width: 271,
                alignSelf: 'center',
                backgroundColor: appColors.white,
                marginBottom: 18,
              },
            ]}
          />

          <View
            style={[globalStyles.row, { justifyContent: 'center', gap: 8 }]}
          >
            <CustomText
              text="Already have an account?"
              styles={{ fontFamily: appFonts.regular, fontSize: 15 }}
            />
            <CustomButton
              type="link"
              text="Sign in"
              onPress={() => navigation.goBack()}
              textStyles={{ fontFamily: appFonts.medium, fontSize: 15 }}
            />
          </View>
        </CustomSection>
      </CustomContainer>
      {isLoading && <ModalLoading isVisible={isLoading} />}
    </>
  );
};

export default SignUp;
