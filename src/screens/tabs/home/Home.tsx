import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuthorized } from '../../../store/auth/authReducer';
import { NavigationProp } from '@react-navigation/native';
import { globalStyles } from '../../../styles/globalStyles';
import {
  CustomButton,
  CustomContainer,
  CustomEventCard,
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
import Geolocation from '@react-native-community/geolocation';

interface HomeProps {
  navigation: NavigationProp<any, any>;
}

interface DummyEventDataType {
  date: string;
  month: string;
  name: string;
  address: string;
  bookmark: boolean;
  eventThumbnail: string;
}

const Home = ({ navigation }: HomeProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentPosition();
  }, []);

  //test
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos: any) => {
        console.log(JSON.stringify(pos));
      },
      (error: any) =>
        console.error('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    );
  };

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
      month: `${date.toLocaleDateString('en-US', { month: 'short' })}`,
      name: 'Những thành phố mơ màng',
      address: 'SECC',
      bookmark: false,
      eventThumbnail:
        'https://ntpmm.live/wp-content/uploads/2022/10/NKK4232-scaled.jpg',
    },
    {
      date: `${date.getDate() + 1}`,
      month: `${date.toLocaleDateString('en-US', { month: 'short' })}`,
      name: 'GenFest',
      address: 'SECC',
      bookmark: false,
      eventThumbnail:
        'https://b-star.vn/wp-content/uploads/2023/10/Thumbnail-GENfest-.png',
    },
    {
      date: `${date.getDate() + 1}`,
      month: `${date.toLocaleDateString('en-US', { month: 'short' })}`,
      name: "Vu's Concert",
      address: 'Nguyen Du Stadium',
      bookmark: false,
      eventThumbnail:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRUYGBgYGBkYGBgYGBgYGBoYGBgZGhgYGBgcIS4lHCErIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABAgADBAUGBwj/xAA+EAACAQIEBAQEAgoBAgcAAAABAgADEQQSITEFBkFRBxMiYTJxgZFSoRQjQmJygrHR4fDBosIVM0ODkrLx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APHwIwElpLQIBCYwEBgLLsPbOpb4cwzfw3F7fSIIYFmJRQ5yMGW9wRfY6gG/USoCGHSABGkjQIBGVYBHF/eAQssQDrFCGEaQILS1KthoB9ZTeOtu8AZoJaGUdNYM0BFQmN5ZhVoAYEWmYQo7yQCAMsa4G0BMGQmAxqjoIGqEyBIyp7wEBPeBjLfLkyrAotCKZ6AzLNVR8I/KKa8DHGHbt95GwxljOYnmN3gMcKTbpMzB4Wgrg1czp1CnKZgkk7k/eWKkDJrGlmOWkoW+lzc295Jj5JIGqZr62A9htIJDaEGADIBCz9tIRUPtAAQyCBmJ3kgPb3jKo6mIBCVMByR01kvAqwstoBzmOKhiIt4xSAS0kghEAqI4X2gV7QloBRbyWgBkEB1WXFFEovFJgWkiTzZUTGV1tax+d/8AECZpM0sp0g2zC/Y6fntEqUypswse0AZjAbxpAICWjqsdVjgQKwsOSXokvRO4gYWSDy5thRHz/rEeittoGtVJZll5pSeXAokj5ZIGjVZHWxtDmiZjAemlzaM6AaDUyq5hgECGLCBAsV7QXgAjAQIDDeSECAAYwgAjCAQIRIBGAgS0IENoQu50099fp3gCS8l4BAN5AJAIQICBCdbad+kIpzPWmbAdLa/3i06H+IGNTRhqDNw+HQ4bPmOdGtlb942IX5WF+mo2trhBWuQBewJPsBuT0/0DrPROcMLhKVLMQuath0KKuZGzqgGYja18uhA1geZAR1WFRGAgACMBCBGUQHRZm01lFETOSl2NvzEBcnbSY7TLde/+JjsIFWWErpHCxysDCySTK8qGByDGSCEQJDJCIEEIkhgERoBCIEEYQARwIAAjAQgRgIAAjASASxUgJaTLLlSejcG8OFbCviMTVan6C6hQPQqgsWqXGug2Fra6wPMssIEtZZWX7QJNjw7CXUuw9Oy+5G5+Q2+81ofuJtBxAMAtgthYACy/TtAsqN0EVFgAjKTsRACM2bIrkByoYdGsdLr+1abXnaiq4kotQvlGWzG7KAxIzNYXLZi56gsbkzKqYJ8Fh2dldK2IXy0Oa2Sk2R2Zraq5ygAGxsWPTXmCICBYwEYLGCwFEdRIFlqCBdQpzPpUz/8AkxsOBNmi/wC/5EDFqTHZZn1Pf+8x2SBQEkKTICQBdYCKsMyLSQPPIYIRAIhEEMBoRFjCARCBIIRAYCMBLMLQZ3VEF2Zgqi4GpNhqdBOsxnIFdMM+JWrRqCn/AOciMS1OwBYXtZioIJ207wORAjARgksFOAES89b5D5ApNRWvilLGoLpTJIUIR6Wa2pJ330uOs4Xk7hNOviVStVSnTUZ3LsFzBSPQpbS5v9rmetVfEDBU3NNRUcL6QyKpQ2/CSwJHvt2gcbhOW8PW4o1KghGHptme5LD0WDAFrmxfTU953XPWGxFWgMNhqZY1CA7XCqqLY2JJG5toL6AzecKpUxTVkoiiGAOQIqEX1AYLpeeN84c44iq9RUrMtEsyoiHLmUenOxXUg22Jtr7QOL4nTCOyB1fISpdCSjMNDkJAJUG4vbXcaWmFHcxDAk3HAuHJiG8rPkqE+i4ujn8B/CdNDre/trp5dRqFWDKbEEEEbgjUEQPYORuRghFTE+ooTZDYrmB0J/ELaj5+2u84VytSVGq4wLUOZnU1LHy0uWCs51aw7kgdJncncYGJw1Ot+0Rkf+NdG/v9Z5tz3zZXrVXw5Hl06bspQG5Yq1gznrtcDbUb7wLefOc/0kGhRW1FWBzEepyuxt+yvYb97bThYWa8AgECMBAssECASxBAqyxRAycOBNnSRZgYc+02lBAYCPSlPlzLqJ2lQECry4Fo6zICyymkDH8syTN8uSB5PDBDAghEEYQCIwiiMIDCEQCWWtAdD0H1ntHhtw9n4ViUABNXzVUHQEtRVR8tTPGaKXIA66Ce94Gt/wCGcJVnF3C3CnY1KjelT7AEX9lMDVcP4Dw3B1KeGrIuJxNQXYsAyoLX+E6IO27H5Wm6xHJPDqdXz3pgKcqLS18s1GbKpCdSbgZfh626zgvDvCviccarsWK3qOx3ZmOx7X9X2npONcVuIUqN/Th6Zrsveo3pQEd1BzfWBrMR4eYZ8TnClKIVb00JAZ7tex3UWC3A79NZtKnKWBpla3lrTFM5ycxyaDTMGJFgbH6TZUuOYdjUArJ+qbK5LKAD1Fyem3znCc48wpiq9DB0GDIai53U3UsxCqFP7QGYm+17doHVc2cWy4JnS4auFp0uhvV0B9iFu3taeM4zB0bkZiTte9hpoLDoO07bxN4oP0inh1+GjTaoQNs9QZQPmEuf55589XXSBr8Rg2XoSO41EwDN8uLYdYKnlv8AGmvddDA0QjKZtRw2kfhqMv8AEAf6WhTgLt8Do3zbKT9/7wO28JOPLTaphqh9L2dP4howH5H6GYXiMiO9DG0yCuKpjORt5lMKrX98pUfyTQ4DheJoVUcIPSwPxpt1G/abjG4cNReg1RQi4hqtE6nKjghkIsLb/lA5MGMJmPw5RcCqCwv6chF+1jfr8rbanphCBYkyDTYBWKsFa+UkEBrb5SdDb2mRwjhrVSTsi/E3/avv/SdBxymHyUPWFouQ2VLgs+VfRcgsoVFCkC252Igcuplqzbc01V84U0IK0EFK42uGd2H8pcp/JNQkDPwyza0tBNVhhNlTGkCO8VWhdYogOpMyKN5jBpfRMC+0kTNDA8lkghgSEQQwGhEWEQLqIuddhqYxNzeNQy5Hu+VhlyrlJz66i4+G2+sRTA6Pknhhr42hTG2cMx7KnrY/ZZ6N4y4/KmHoDqzVGHYKMi//AHb7TG8F+DW8zFNvl8tfqbsf+kfecr4kcU8/H1SDdadqK/8At3z/APWXgejeHOBTC4A4iqQvmA1XY6WQD0D7a27tPKeOcWfEYipWJILuSBfZdlX6KAPpNpy1yli8dTzrUVaakhfMdiCyixyIL2sLC5A30vNnwbkRkao+ObyqFFsrWOtVtLKh3ym41Aub2Gt7BruCc74rDUxSpClkG2ZLntckEX6bzB4VSr4rFDIbVXcvmX0hCWzs4t8Njr9p6jzJyxghgarph0pslNmRgLOCvw5m3a+xuTvOK8OcBiWxHm0AoVAVd3ByBTY5RbUtoD/WB1/GeCYTBYWpWrp+k1n9OeqSzu7AgZT+wALm41su+08mpU2YkBGcjfJckDuRYz3fmHFDynZsKtelTUuxcqoJUG+RWU302PW9heYfKuMqYlC60Vw2HvZVQDM562awCr0uBfsRA8Qcra9/uDf8pQa69/6z2HxB5awlPBPUp0kpugVVyALmzVELZvxEBWOvvPEakDL/AEtZBjR7zAMkDe4bilh8WnYmZB4ozAgZT721+85sS1XIG9oG1dwR8r29jI1Nq9VvKQm5GmUKBYAEtbRdiSbzb8NwlOgjDEBHdspyEE+XoGNyd2ubEbDKd76W1+NnKQiKiDTYBR2Fh19oGbg8GERUNRVVd9bXJ1Y/fb6QioiVTUQqwooat9jnUgUwSNWvUZB8iZytbGMxJJuT1P8AwIGrs1gToOgAA662G513gPmvqTcncnUk9SY6mUBpahgbLDPNijzS0mMz8Ow6mBls0qLS4MLbTHrPaAwaWI8qxHEA1OnTCqDTLksN3zspGb+G1h85jJVN4GzzSTFzSQPNZJJIBkEEMBhDAIRAYR1lYjgwPVuA+IOHwmAWjTV2r5fw2QVCtszMTrYgaAa/e3mzVCxuSSSbknUkncmYqmZFBbkAC99hA9j8G8ERTeqRuzKD7WT/AJB+0bjWKfGcTTDA/qsO+YjoXUC7t3sxCjsL951HLuFXA4Bc+gp0zUf52LN+d5zPhfSNR6+KfVndvuTmb7lz9hA6PnOkz0UwlP4q7qn8KJZnY+wsv3mTheGLTWnhaItSQZqp6v2UnqWNy37otazCPhK61MZW3JootMek2BcB2Oba5uBb92YFTnrArUNM1tjq4VilxpYMAb7b7e8DL5jwTYk08OLimTnrMPwqfQn8za/yTZYRV+BAAlP0gDbMNCPp/W/acLzP4kUlRkwhLO1x5hUqqDuobVj20t112mjPiayUFpUKAVlXLndy52+K1hdr3NyT9bwOj43h34jWxNNT+rw1KpTTs2JdSCT3y/D9feeK0KWdgotc3tewBNrgXM6Pll8TXxC4aniXpCqWzlXYXGX1aAjMSBb8+k1vN+AXD4qrRQlgjfEbXOYBumml+nvA0jqQSDoQSCPcbwQXkgMJmYBwjh3W4Qhsp6sPhU+17E+wMw1axBHTaZeJxbVAmexZQQW/ackk3Y+wyqP4e5MDbcUARlzEuculzowuSrM25upQ6b95rKldmOuw2A0AHYDpNjxSrnw2Gf8AaQPTY+wylL/TMPpNSDAsBlqmY6mODAyVMuVpiK8sDGBlK0yqNbsLzXrMygYGfnbqbewlLqT/AHlqMo9/n/aV1a/aBXtHRpjF4waBmZxDMTNJA4molokuB6SphaAIYIYBhghgERhFjCA4M6nkDCJVxtIVGVUQ+YxYgD0EZRc/vFfsZyoMdTA9p8T+bKPk/otCorsz/rchzBVQ3ykjS5a2n7pvvOT5K52GCzK1M1Fa+z5bXt0IPb85wvmSB4HoPMviNWxCNSpKKFNr58rZncHoWsLA9QBrte2k4o1pi5p0fCzgqKo9ZWxVRxcUUYBKd+jm1y/7oga3AYWpXdadJGd22VfzJOwA7nSd1wjw1LAPicUiID6xTux0/ZFRrLfvYNNrwWpgMMv6TXwj4IMpUZ6hzOpFyFpK2cjT8PSdbxXmLC4bD06jVclOoL0ai0nqLYrmX4RoSp0vbY9jA5ulyuKLriMDhS5VQtHzWCgMVa9dy7ZrbAKFvvtfTyrmjEO+JdnYNUzFahAsM6sQ1vbSfQGH5go2wquzBsSD5WdQjGy5gWW/pLC1vcgbm08K5/WsMfiPPCh826iwan/6bf8Awy/a3SBzt5AYILwLAZLxAZaDfcfUdfmP+YG2w7BsJUHVHpP9/MT/ALxNZebHymRKtxYPSXsRda1Iggje4ZSD7mawQLQYymVAx1MC5TLlmOrS1TAyFMuR5igy1H+kDOT3N/YR2F/7TGpv/vWWq9/9/rAVxEzR6ptMQvAyM0kxvNkgc0DGOsrhBgAiCWMLyuAYYIYBjCJGgMDGBiCMIDCMsQR1EBhOl4Tj8bRoZaFDIHbMMQuHY1Tp8KViCMuh0A76zmVnsnhzzUqcPqis/qwl2VS1i1MofLQDqM2ZQOnp9oHn+K5dxr4c46orulyGd3vU0fJcqxzWzEj/AItrGwvOOJTCnBkU6lHYLVpl2UXzAKcw0B1FwbdNLCey1q74ng7OSHergSWIyqDUaic3YL6r6dJ4dx3gFbDLReqEtXTzEyvmOWykhtND617jXeBh4/iVasytVqM7IoRCx1VVN1A+V/nMfFYh3Od3d22LOzO2m12Yk9YloVS+n+36QKZIWFosAiOsS8IMDoxjFfBuuzoqIw/EmdSjj+Frgj98GaIQ4TElGDruNwdmBFmVh1BFx9ZKi2JA26fI6j8oBBjCVgxgYFqmMGlN46mBcrywPKAZM0DJFeN+lHpMQNGsf9/32MC1qpPWVtUlTv7/AJyovAvzyTHvDA1kgMkkB1MjCKIwMBIYWEECQwQwGl2Gp53VMwXMyrma9lzEDMbAmwvfTXSUTM4UFNakHYInmJmdrlVXOMzGwJtaB1WM5Pp4fH0cFiMTfzAuZqVI3R3bLTSzG2pt6tbdR1nWYDw74e9evh1r4pqmHNMOt6Ki1QBsy+jUAHX/AJjcx8e4M+ITEGsz1UxFKrnpU3NkoqCtMlrKVLLe4ufV7XGspc/4ajjsTi6FOsy4ikA61MikVksEKhSfRlGtze5Pygber4e8O/RquIWtiFWn54zO9LLmou9PX0agsmncEd555yhwNsbiUoAhbhndrXyqo9RA6m5A/mnWcN8Q8PTwAwjYeq7eU6uWamUepULMztfW2ZidtL9d5ynJPHxgcWldlLIFZHVbZirAXK3NrghTrva2l4Hbjw0RrNTxv6h1psrtTzMzVXyoMoYdcmptqR8wF8Km8su+LC5FfMBQZreWzCynOLqbE7DfbWZfDOeOGUx5NOnUpUgKNTOKa53q0qgYlwhOYkKl2+e2k2D+JeCbDuM7h3WtZPKe6lsxQEj0nQgEgnXsIGkoeGVFVXz8UwqZqS1EpovpNZsqqrMddT8VtlOk3+H8OeHU6gpN5tVzTdwj1QvpRkXNamFIBLgX+c1mJ5z4XVZMS6VP0gGgbikGen5T5mVHJAym7A2OoO3SW4jxUwYcVEoVnYKyh38pPS7K2QEEnKCg+3WByHiZwGjhsRlw6Oq5FZ1YOVUnQMjt8QOxN9G0vc2nDkzs+b+eHxykGglK4RCQxdygYuULkAZS602sANUGpnGGALw3gkEB0OovtfWX4lSrEEWIA+1hb8rTGmfVfPSQ65qZyE90a7Jr7WcfUQMYGNeIIwMBlmQiSui4A21PU9B7Qh9YHTcB4pSWvQZ6dILT9DnIgFWm91cVVAsxCkkNa9wASdx2vN/hxSCPiMGWRkUv5Q9StlGb9Wb3U9tx8p5Nntr2nqPh7z2q0vIxLoiUk0q1KnqNycqBCLsoAte+npEDyypVzepiWYm5Ym97976k31veRUv/AJ0mbzJgTQrulwysPMplSLNSckoRbTTUadVmvoYjIGt8RFgegva5A76W+pgF1A/D97xLfL6CVu5O5JinSBdp3hlqYywA7Af0kgaeSSSBIwkkgMIpEkkCWhtJJAkYSSQGvCDJJAl5AZJIDBoc0MkAZpLwyQBeLJJABkkkgQGZ/D3Rg9Ngczr6GH4x6grexsNen1MMkDEBgkkgEGWI2ogkgWMmhuff6RQ9iDexBBH0kkgZWK4y70Fw7kslNr0y3xINfSCNxqbA3AubWvMB3v7WFrabDbXrBJAXN84rOTa5JsLC/QdpJIC5pJJIH//Z',
    },
    {
      date: `${date.getDate() + 1}`,
      month: `${date.toLocaleDateString('en-US', { month: 'short' })}`,
      name: "Blackpink's concert",
      address: 'My Dinh National Stadium',
      bookmark: false,
      eventThumbnail:
        'https://photo-mekongasean.epicdn.me/w950/Uploaded/2024/juzngu/2023_07_06/0a05b6cd-concert-blackpink-thumbnail-facebook-blackpink-3-5937.jpg',
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
        color = appColors.red;
        break;
      case 'Music':
        color = appColors.orange;
        break;
      case 'Food':
        color = appColors.green;
        break;
      case 'Art':
        color = appColors.blue;
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

  const renderEventCard = (type: string) => {
    if (type === 'all') {
      return dummyEventData.map((data, index) => {
        return (
          <CustomEventCard
            key={index}
            eventData={data}
            onPressCard={() => console.log('hi')}
            onPressBooknark={() => onPressBooknark(index)}
          />
        );
      });
    } else if (type === 'nearby') {
      return dummyEventData
        .filter((el) => el.address === 'SECC')
        .map((data, index) => {
          return (
            <CustomEventCard
              key={index}
              eventData={data}
              onPressCard={() => console.log('hi')}
              onPressBooknark={() => onPressBooknark(index)}
            />
          );
        });
    }
  };

  const onPressBooknark = (index: number) => {
    const eventDatas = [...dummyEventData];
    const data = dummyEventData[index];
    data.bookmark = !data.bookmark;
    eventDatas[index] = data;
    setDummyEventData(eventDatas);
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: 'white' }]}>
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
            <View style={[styles.cardContainer]}>{renderEventCard('all')}</View>
          </ScrollView>

          <View style={[styles.bannerContainer]}>
            <View style={[styles.bannerContent]}>
              <CustomText
                text="Invite your friends"
                fontSize={18}
                fontFamily={appFonts.bold}
              />
              <CustomText
                text="Get $20 for ticket"
                color={appColors.gray}
                fontFamily={appFonts.medium}
              />
              <CustomButton
                onPress={() => {}}
                text="INVITE"
                type="primary"
                styles={[styles.bannerButton]}
                textStyles={[styles.bannerButtonText]}
              />
            </View>
            <Image
              source={require('../../../assets/img/banner-img.png')}
              style={{
                width: 320,
                height: 160,
                resizeMode: 'cover',
                position: 'absolute',
                right: -10,
              }}
            />
          </View>

          <View style={[globalStyles.row, { marginTop: 22 }]}>
            <CustomText
              text="Nearby You"
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
            <View style={[styles.cardContainer]}>
              {renderEventCard('nearby')}
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
    paddingTop: StatusBar.currentHeight!,
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
    marginVertical: 16,
  },
  bannerContainer: {
    backgroundColor: appColors.skyOpacity,
    height: 130,
    width: '100%',
    borderRadius: 12,
    marginTop: 20,
  },
  bannerContent: {
    padding: 18,
    flex: 1,
    justifyContent: 'space-between',
  },
  bannerButton: {
    width: 80,
    height: 32,
    backgroundColor: appColors.sky,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  bannerButtonText: {
    fontSize: 14,
    fontFamily: appFonts.bold,
  },
});

export default Home;
