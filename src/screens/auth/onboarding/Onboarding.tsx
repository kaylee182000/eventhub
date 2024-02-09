import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch } from 'react-redux';
import { CustomText } from '../../../components';
import { appColors } from '../../../constants/appColors';
import { appFonts } from '../../../constants/appFonts';
import { appInfos } from '../../../constants/appInfo';
import { setAlreadyOnboard } from '../../../store/main/mainReducer';
import { globalStyles } from '../../../styles/globalStyles';

interface OnBoardingProps {
  navigation: NavigationProp<any, any>;
}

const Onboarding = ({ navigation }: OnBoardingProps) => {
  const dispatch = useDispatch();
  const onPressSkip = () => {
    dispatch(setAlreadyOnboard(true));
    navigation.navigate('Login');
  };
  const NextButton = (
    <CustomText
      color={appColors.white}
      fontSize={16}
      fontFamily={appFonts.medium}
      text="Next"
    />
  );
  const PrevButton = (
    <CustomText
      color={appColors.white}
      fontSize={16}
      fontFamily={appFonts.medium}
      text="Previous"
    />
  );
  return (
    <View style={[globalStyles.container]}>
      <Swiper
        dotColor={appColors.whiteOpacity}
        activeDotColor={appColors.white}
        loadMinimal={true}
        loop={false}
        dotStyle={{ marginBottom: 16 }}
        activeDotStyle={{ marginBottom: 16 }}
        showsButtons={true}
        nextButton={NextButton}
        prevButton={PrevButton}
        buttonWrapperStyle={styles.buttonSwipeContainer}
      >
        <Image
          source={require('../../../assets/img/onboarding-1.png')}
          style={{
            flex: 1,
            width: appInfos.SIZES.WIDTH,
            height: appInfos.SIZES.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image
          source={require('../../../assets/img/onboarding-2.png')}
          style={{
            flex: 1,
            width: appInfos.SIZES.WIDTH,
            height: appInfos.SIZES.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image
          source={require('../../../assets/img/onboarding-3.png')}
          style={{
            flex: 1,
            width: appInfos.SIZES.WIDTH,
            height: appInfos.SIZES.HEIGHT,
            resizeMode: 'cover',
          }}
        />
      </Swiper>
      <View style={[styles.buttonSkipContainer]}>
        <TouchableOpacity onPress={onPressSkip}>
          <CustomText
            text="Skip"
            color={appColors.black}
            fontSize={16}
            fontFamily={appFonts.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSkipContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonSwipeContainer: {
    alignItems: 'flex-end',
    paddingBottom: 36,
    paddingHorizontal: 16,
  },
});

export default Onboarding;
