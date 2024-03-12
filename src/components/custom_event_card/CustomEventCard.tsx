import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { CustomText } from '..';
import { appFonts } from '../../constants/appFonts';
import { Archive, Location } from 'iconsax-react-native';
import { appColors } from '../../constants/appColors';

interface CustomEventCardProps {
  eventData: {
    date: string;
    month: string;
    name: string;
    address: string;
    bookmark: boolean;
    eventThumbnail: string;
  };
  onPressCard: () => void;
  onPressBooknark: () => void;
}

const CustomEventCard = ({
  eventData,
  onPressCard,
  onPressBooknark,
}: CustomEventCardProps) => {
  return (
    <TouchableOpacity onPress={onPressCard} activeOpacity={0.8}>
      <View style={[globalStyles.shadow, styles.container]}>
        <ImageBackground
          source={{ uri: eventData.eventThumbnail }}
          resizeMode="stretch"
          style={[styles.imageContainer]}
          imageStyle={{ borderRadius: 12 }}
        >
          <View style={[styles.imageContentContainer]}>
            <View style={[styles.blurContainer]}>
              <CustomText
                text={eventData.date}
                color={appColors.red}
                fontFamily={appFonts.bold}
                fontSize={20}
              />
              <CustomText
                text={eventData.month.toUpperCase()}
                color={appColors.red}
                fontFamily={appFonts.extra_bold}
                fontSize={12}
              />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressBooknark}>
              <View style={[styles.blurContainer]}>
                <Archive
                  color={
                    eventData.bookmark
                      ? appColors.red
                      : appColors.blackHighOpacity
                  }
                  variant="Bold"
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={[styles.contentContainer]}>
          <CustomText
            text={eventData.name}
            fontSize={18}
            fontFamily={appFonts.medium}
            numberOfLines={1}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Location color={appColors.gray} variant="Bold" size={16} />
            <CustomText
              text={eventData.address}
              fontSize={16}
              fontFamily={appFonts.medium}
              numberOfLines={1}
              color={appColors.gray}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    width: 220,
    height: 150,
  },
  contentContainer: {
    marginVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
  blurContainer: {
    backgroundColor: appColors.white,
    opacity: 0.9,
    width: 50,
    height: 50,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomEventCard;
