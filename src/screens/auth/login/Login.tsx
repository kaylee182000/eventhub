import { NavigationProp } from '@react-navigation/native';
import { Lock, Sms } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Image, Switch, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import { rootState } from '../../../store';
import {
  setIsAuthorized,
  setStoredEmail,
  setUserData,
} from '../../../store/auth/authReducer';
import { globalStyles } from '../../../styles/globalStyles';
import { showToast } from '../../../utils';
import SocialLogin from '../components/SocialLogin';

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
        const { username, email, photoUrl } = res.data.user;
        methods.reset({
          password: '',
          email: '',
        });
        setIsLoading(false);
        dispatch(setIsAuthorized(true));
        dispatch(setUserData({ username, email, photoUrl }));
        if (isRemember) {
          dispatch(setStoredEmail(email));
        } else {
          dispatch(setStoredEmail(''));
        }
        showToast('Login successful!', 'success');
      }
    } catch (error: any) {
      setIsLoading(false);

      if (error.message === '403') {
        showToast('User not found', 'error');
      } else if (error.message === '401') {
        showToast('Email or Password is not correct', 'error');
      } else {
        showToast('Try again later', 'error');
      }
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
            onPress={methods.handleSubmit(onSubmit)}
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
          <SocialLogin />
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
