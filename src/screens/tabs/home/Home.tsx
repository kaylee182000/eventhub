import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
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
import { SvgXml } from 'react-native-svg';
import { AppIcon } from '../../../assets/svg_icons';

interface HomeProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: HomeProps) => {
  const dispatch = useDispatch();

  const eventTypeData = [
    { name: 'Sport', iconUri: AppIcon.sport_icon },
    { name: 'Music', iconUri: AppIcon.music_icon },
    { name: 'Food', iconUri: AppIcon.food_icon },
    { name: 'Art', iconUri: AppIcon.art_icon },
  ];

  const EventTypeComponent = ({
    iconUri,
    name,
  }: {
    iconUri: string;
    name: string;
  }) => {
    let color;
    switch (name) {
      case 'Sport':
        color = appColors.sportEvent;
        break;
      case 'Music':
        color = appColors.musicEvent;
        break;
      case 'Food':
        color = appColors.foodEvent;
        break;
      case 'Art':
        color = appColors.artEvent;
        break;
      default:
        break;
    }
    return (
      <TouchableOpacity
        onPress={() => console.log(name)}
        style={[styles.eventTypeComponentContainer, { backgroundColor: color }]}
      >
        <SvgXml width={18} height={18} xml={iconUri} />
        <CustomText
          text={name}
          color={appColors.white}
          fontFamily={appFonts.medium}
        />
      </TouchableOpacity>
    );
  };

  const renderEventTypeBar = () => {
    return eventTypeData.map((data, index) => {
      return (
        <EventTypeComponent
          name={data.name}
          iconUri={data.iconUri}
          key={index}
        />
      );
    });
  };

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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.eventTypeBarContainer]}>
              {renderEventTypeBar()}
            </View>
          </ScrollView>
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
    paddingTop: StatusBar.currentHeight! + 10,
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
  eventTypeBarContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
    marginBottom: 12,
  },
  eventTypeComponentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 100,
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
});

export default Home;
