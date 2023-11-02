import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VUtils from '../common/VUtils';

export default function InsightScreen() {
  const [currentTime, setCurrentTime] = React.useState(Date.now());
  setTimeout(() => {
    setCurrentTime(Date.now() + 1);
  }, 1000);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{backgroundColor: '#f0f0f0f0'}}>
        <Text style={{color: 'black', padding: 15}}>
          It is {VUtils.showTime(currentTime, 'h:mm:ss a')} on{' '}
          {VUtils.showTime(currentTime, 'MMMM D')}
        </Text>
      </View>
      <Image
        source={require('../../../assets/images/insightIcon.jpg')}
        style={{height: '30%', width: '100%'}}
      />
      <Text style={{color: 'black', fontSize: 18, textAlign: 'center'}}>
        You have no fields
      </Text>
      <Text style={{textAlign: 'center', marginTop: 6, marginHorizontal: 20}}>
        Add fields to monitor their vegetation, growth stages, and weather
        forecast
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#f0f0f0f0',
          margin: 10,
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialIcons name="add" size={30} color="gray" />
          <Text>Add fields</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
