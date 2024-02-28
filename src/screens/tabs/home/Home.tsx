import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuthorized } from '../../../store/auth/authReducer';
import { NavigationProp } from '@react-navigation/native';
import { globalStyles } from '../../../styles/globalStyles';
import {
  CustomButton,
  CustomContainer,
  CustomEventCard,
  CustomSection,
  CustomText,
  Space,
} from '../../../components';
import { appColors } from '../../../constants/appColors';
import {
  ArrowRight2,
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

interface DummyEventDataType {
  date: string;
  month: string;
  name: string;
  address: string;
  bookmark: boolean;
}

const Home = ({ navigation }: HomeProps) => {
  const dispatch = useDispatch();

  const date = new Date();
  const eventTypeData = [
    { name: 'Sport', iconUri: AppIcon.sport_icon },
    { name: 'Music', iconUri: AppIcon.music_icon },
    { name: 'Food', iconUri: AppIcon.food_icon },
    { name: 'Art', iconUri: AppIcon.art_icon },
  ];

  const [dummyEventData, setDummyEventData] = useState<DummyEventDataType[]>([
    {
      date: `${date.getDate() + 1}`,
      month: `${date.getMonth()}`,
      name: 'NTPMM',
      address: 'SECC',
      bookmark: false,
    },
    {
      date: `${date.getDate() + 1}`,
      month: `${date.getMonth()}`,
      name: 'GenFest',
      address: 'SECC',
      bookmark: false,
    },
    {
      date: `${date.getDate() + 1}`,
      month: `${date.getMonth()}`,
      name: "Vu's Concert",
      address: 'SECC',
      bookmark: false,
    },
    {
      date: `${date.getDate() + 1}`,
      month: `${date.getMonth()}`,
      name: "BlacPink's concert",
      address: 'SECC',
      bookmark: false,
    },
  ]);

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

  const renderEventCard = () => {
    return dummyEventData.map((data, index) => {
      return <CustomEventCard key={index} eventData={data} />;
    });
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: 'transparent' }]}>
      <View style={[styles.headerContainer]}>
        <View style={[globalStyles.row, { flex: 0, display: 'flex' }]}>
          <TouchableOpacity onPress={() => dispatch(setIsAuthorized(false))}>
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
            <TouchableOpacity
              style={[styles.notiButton]}
              onPress={() => navigation.navigate('Search')}
            >
              <SearchNormal1 size="24" color={appColors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.notiButton]}
              onPress={() => navigation.navigate('Notification')}
            >
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
      <CustomContainer isScroll>
        {/* body */}
        <View style={[styles.bodyContainer]}>
          <View style={[globalStyles.row, { marginTop: 22 }]}>
            <CustomText
              text="Upcoming Events"
              fontSize={20}
              fontFamily={appFonts.medium}
            />
            <View style={[globalStyles.row, { justifyContent: 'flex-end' }]}>
              <CustomButton
                text="See All"
                onPress={() => console.log('see all')}
                type="text"
                textStyles={{ color: appColors.gray, fontSize: 16 }}
              />
              <ArrowRight2 color={appColors.gray} variant="Bold" size={16} />
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.cardContainer]}>{renderEventCard()}</View>
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
  bodyContainer: {
    paddingHorizontal: 24,
  },
  cardContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
    marginBottom: 12,
  },
});

export default Home;
