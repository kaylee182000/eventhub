import { View, Text, Image, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../../styles/globalStyles';
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
import { ArrowRight, Lock, Sms } from 'iconsax-react-native';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { NavigationProp } from '@react-navigation/native';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { showToast } from '../../../utils';
import { authApi } from '../../../apis/auth.api';
import {
  setIsAuthorized,
  setStoredEmail,
} from '../../../store/auth/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../store';

interface LoginProps {
  navigation: NavigationProp<any, any>;
}

interface FormValue {
  email: string;
  password: string;
}

const Login = ({ navigation }: LoginProps) => {
  const dispatch = useDispatch();

  const auth = useSelector((state: rootState) => state.auth);

  const [isRemember, setIsRemeber] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { ...methods } = useForm<FormValue>({ mode: 'onChange' });

  useEffect(() => {
    if (auth.storedEmail) {
      methods.setValue('email', auth.storedEmail);
    }
  }, [auth.storedEmail]);

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const res = await authApi.Login({
        email: email,
        password: password,
      });
      if (res.data) {
        methods.reset({
          password: '',
          email: '',
        });
        setIsLoading(false);
        dispatch(setIsAuthorized(true));
        if (isRemember) {
          dispatch(setStoredEmail(email));
        } else {
          dispatch(setStoredEmail(''));
        }
        showToast('Login successful!', 'success');
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      showToast('Try again later', 'error');
    }
  };

  const onError: SubmitErrorHandler<FormValue> = (errors, e) => {
    return console.log({ errors });
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
      <CustomContainer isImageBackground isScroll>
        <CustomSection
          styles={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 75,
            marginBottom: 30,
          }}
        >
          <Image
            source={require('../../../assets/img/login-logo.png')}
            style={{ width: 162, height: 114, resizeMode: 'contain' }}
          />
        </CustomSection>
        <CustomSection>
          <CustomText text="Sign in" title styles={{ marginBottom: 20 }} />
          <FormProvider {...methods}>
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
          </FormProvider>
          <View style={[globalStyles.row]}>
            <View
              style={[
                globalStyles.row,
                { justifyContent: 'flex-start', gap: 8 },
              ]}
            >
              <Switch
                value={isRemember}
                onChange={() => setIsRemeber(!isRemember)}
                thumbColor={appColors.white}
                trackColor={{ false: appColors.gray2, true: appColors.primary }}
              />
              <CustomText text="Remember me" />
            </View>
            <CustomButton
              onPress={() => navigation.navigate('ResetPassword')}
              text="Forgot Password?"
              type="text"
            />
          </View>

          <CustomButton
            onPress={methods.handleSubmit(onSubmit, onError)}
            text="SIGN IN"
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
              { width: 271, alignSelf: 'center', marginVertical: 30 },
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
              text="Don't have an account?"
              styles={{ fontFamily: appFonts.regular, fontSize: 15 }}
            />
            <CustomButton
              type="link"
              text="Sign up"
              onPress={() => navigation.navigate('SignUp')}
              textStyles={{ fontFamily: appFonts.medium, fontSize: 15 }}
            />
          </View>
        </CustomSection>
      </CustomContainer>
      {isLoading && <ModalLoading isVisible={isLoading} />}
    </>
  );
};

export default Login;
