import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  const profileDetails: any = [
    {
      name: 'Settings',
      icon: <Ionicons name="settings-outline" color="gray" size={26} />,
      mt: false,
    },
    {
      name: 'Web Version Features',
      icon: <Ionicons name="desktop-outline" color="gray" size={26} />,
      mt: true,
    },
    {
      name: 'Update History',
      icon: (
        <Ionicons name="file-tray-stacked-outline" color="gray" size={26} />
      ),
      mt: false,
    },
    {
      name: 'Support Chat',
      icon: <Ionicons name="chatbox-outline" size={26} color="gray" />,
      mt: true,
    },

    {
      name: 'User Guide',
      icon: <Ionicons name="copy-outline" size={26} color="gray" />,
      mt: false,
    },
    {
      name: 'Telegram Community',
      icon: <Ionicons name="paper-plane-outline" size={26} color="gray" />,
      mt: true,
    },
    {
      name: 'Share app',
      icon: <Ionicons name="share-outline" color="gray" size={26} />,
      mt: true,
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#f2f6f9'}}>
      <View style={{alignItems: 'center', marginVertical: 60}}>
        <Ionicons name="leaf-outline" color="green" size={46} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {profileDetails.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                  backgroundColor: 'white',
                  paddingHorizontal: 17,
                  marginTop: item.mt ? 15 : 0,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item.icon}
                  <Text style={{marginLeft: 20, color: 'black'}}>
                    {item.name}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward-outline"
                  color="gray"
                  size={26}
                />
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
}
