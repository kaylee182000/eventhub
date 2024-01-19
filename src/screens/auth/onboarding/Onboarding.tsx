import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { appColors } from '../../../constants/appColors';
import { appInfos } from '../../../constants/appInfo';
import { globalStyles } from '../../../styles/globalStyles';
import { CustomText } from '../../../components';
import { appFonts } from '../../../constants/appFonts';

const Onboarding = ({ navigation }: any) => {
  const NextButton = (
    <CustomText
      color={appColors.white}
      fontSize={18}
      fontFamily={appFonts.medium}
      text="Next"
    />
  );
  const PrevButton = (
    <CustomText
      color={appColors.white}
      fontSize={18}
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
        dotStyle={{ marginBottom: 24 }}
        activeDotStyle={{ marginBottom: 24 }}
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
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <CustomText
            text="Skip"
            color={appColors.black}
            fontSize={18}
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
    paddingHorizontal: 24,
  },
  buttonSwipeContainer: {
    alignItems: 'flex-end',
    paddingBottom: 44,
    paddingHorizontal: 24,
  },
});

export default Onboarding;
