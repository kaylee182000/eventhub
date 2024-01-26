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
  MyArrowIcon,
} from '../../../components';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { globalStyles } from '../../../styles/globalStyles';

interface SignUpProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const [email, setEmail] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const [username, setUsername] = useState<string>('');

  const [confirmPassword, setConfirmPassword] = useState<string>('');

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
          value={username}
          onChange={(val) => setUsername(val)}
          prefix={<User size={22} color={appColors.gray} />}
          allowClear
        />
        <CustomInput
          placeholder="Email"
          value={email}
          onChange={(val) => setEmail(val)}
          prefix={<Sms size={22} color={appColors.gray} />}
          allowClear
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChange={(val) => setPassword(val)}
          prefix={<Lock size={22} color={appColors.gray} />}
          isPassword
        />
        <CustomInput
          placeholder="Password"
          value={confirmPassword}
          onChange={(val) => setConfirmPassword(val)}
          prefix={<Lock size={22} color={appColors.gray} />}
          isPassword
        />

        <CustomButton
          onPress={() => {}}
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

        <View style={[globalStyles.row, { justifyContent: 'center', gap: 8 }]}>
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
  );
};

export default SignUp;
