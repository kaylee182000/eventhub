import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuthorized } from '../../../store/auth/authReducer';
import { NavigationProp } from '@react-navigation/native';
import { globalStyles } from '../../../styles/globalStyles';
import {
  CustomContainer,
  CustomSection,
  CustomText,
  Space,
} from '../../../components';
import { appColors } from '../../../constants/appColors';
import {
  HambergerMenu,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { appFonts } from '../../../constants/appFonts';

interface HomeProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: HomeProps) => {
  const dispatch = useDispatch();
  return (
    <View style={[globalStyles.container]}>
      <CustomContainer isScroll>
        <View style={[styles.headerContainer]}>
          <View style={[globalStyles.row, { flex: 0, display: 'flex' }]}>
            <TouchableOpacity onPress={() => console.log('hi')}>
              <HambergerMenu size="24" color={appColors.white} />
            </TouchableOpacity>
            <Space width={24} />
            <View style={[styles.locationContainer]}>
              <View
                style={[globalStyles.row, { flex: 0, display: 'flex', gap: 4 }]}
              >
                <CustomText
                  text="Current Location"
                  fontSize={12}
                  color={appColors.white}
                  fontFamily={appFonts.light}
                />
                <FontAwesome6
                  name="caret-down"
                  color={appColors.white}
                  size={12}
                />
              </View>
              <CustomText
                text="New York, USA"
                fontSize={16}
                color={appColors.white}
                fontFamily={appFonts.bold}
              />
            </View>
            <View
              style={[globalStyles.row, { flex: 0, display: 'flex', gap: 4 }]}
            >
              <TouchableOpacity style={[styles.notiButton]}>
                <SearchNormal1 size="24" color={appColors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.notiButton]}>
                <Notification size="24" color={appColors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 160,
    backgroundColor: appColors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 24,
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  notiButton: {
    padding: 8,
    backgroundColor: appColors.blackOpacity,
    borderRadius: 50,
  },
});

export default Home;
