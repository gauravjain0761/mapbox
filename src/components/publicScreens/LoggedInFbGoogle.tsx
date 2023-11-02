import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
// import PropertySafetyOutlined from '@ant-design/icons';
import Icon from 'react-native-vector-icons/Ionicons';
export default function LoggedInFbGoogle() {
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4286f5',
            width: '48%',
            padding: 4,
            borderRadius: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/gImages.jpg')}
              style={{
                height: 40,
                width: 40,
              }}
            />
            <Text
              style={{
                color: 'white',
                width: '80%',
                textAlign: 'center',
              }}>
              Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#4167b2',
            width: '48%',
            padding: 4,
            borderRadius: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/fb.png')}
              style={{
                height: 40,
                width: 40,
              }}
            />
            <Text
              style={{
                color: 'white',
                width: '80%',
                textAlign: 'center',
              }}>
              Facebook
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* ios-heart" */}

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 4,
          borderRadius: 5,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="logo-apple" size={20} color="white" />
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              paddingVertical: 10,
            }}>
            Sign in with Apple
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
