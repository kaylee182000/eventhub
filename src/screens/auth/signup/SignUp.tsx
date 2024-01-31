import { NavigationProp } from '@react-navigation/native';
import { ArrowRight, Lock, Sms, User } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
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
import { authApi } from '../../../apis/auth.api';

interface SignUpProps {
  navigation: NavigationProp<any, any>;
}

interface InitialValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValue: InitialValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({ navigation }: SignUpProps) => {
  const [values, setValues] = useState<InitialValue>(initialValue);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeInput = (
    value: string,
    type: 'username' | 'email' | 'password' | 'confirmPassword',
  ) => {
    const data = { ...values };

    data[type] = value;

    setValues(data);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const { email, password, username } = values;
      const res = await authApi.Register({
        email: email,
        password: password,
        username: username,
      });
      if (res.data) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
          <CustomInput
            placeholder="Username"
            value={values.username}
            onChange={(val) => handleChangeInput(val, 'username')}
            prefix={<User size={22} color={appColors.gray} />}
            allowClear
          />
          <CustomInput
            placeholder="Email"
            value={values.email}
            onChange={(val) => handleChangeInput(val, 'email')}
            prefix={<Sms size={22} color={appColors.gray} />}
            allowClear
          />
          <CustomInput
            placeholder="Password"
            value={values.password}
            onChange={(val) => handleChangeInput(val, 'password')}
            prefix={<Lock size={22} color={appColors.gray} />}
            isPassword
          />
          <CustomInput
            placeholder="Password"
            value={values.confirmPassword}
            onChange={(val) => handleChangeInput(val, 'confirmPassword')}
            prefix={<Lock size={22} color={appColors.gray} />}
            isPassword
          />

          <CustomButton
            onPress={handleRegister}
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
              { width: 271, alignSelf: 'center', marginVertical: 40 },
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
