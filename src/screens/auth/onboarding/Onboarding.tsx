import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { appColors } from '../../../constants/appColors';
import { appInfos } from '../../../constants/appInfo';
import { globalStyles } from '../../../styles/globalStyles';

const Onboarding = ({ navigation }: any) => {
  const NextButton = <Text style={[styles.textWhite]}>Next</Text>;
  const PrevButton = <Text style={[styles.textWhite]}>Previous</Text>;
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
          <Text style={[styles.textBlack]}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBlack: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.black,
  },
  textWhite: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.white,
  },
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
