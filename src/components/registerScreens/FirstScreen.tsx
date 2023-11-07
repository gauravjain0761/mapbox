import {View, Text, Button, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import VUtils from '../common/VUtils';
import {Data} from '../staticData/Data';
import {setLoggedIn} from '../globalState/store';

export default function FirstScreen(props: any) {
  const ary = ['Jun 29', 'Jun 25', 'Jun 22', 'Jun 17'];
  const [isIndex, setIndex] = React.useState<number>(0);
  const [pageNo, setPageNo] = React.useState<number>(0);
  setTimeout(() => {
    if (ary.length - 1 === isIndex) {
      setIndex(0);
    } else {
      setIndex(isIndex + 1);
    }
  }, 1000);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor="#27ae61" barStyle={'light-content'} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        {[1, 1, 1, 1, 1].map((item: any, index: number) => (
          <React.Fragment key={index}>
            <View
              style={{
                borderWidth: 5,
                borderRadius: 5,
                marginLeft: 3,
                borderColor: index === pageNo ? '#27ae61' : '#f0f0f0f0',
              }}
            />
          </React.Fragment>
        ))}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        {ary.map((item: string, index: number) => (
          <React.Fragment key={index}>
            <View
              style={{
                backgroundColor: isIndex === index ? '#393939' : '#e8ecee',
                padding: 13,
                borderRadius: 8,
              }}>
              <Text style={{color: isIndex === index ? 'white' : 'black'}}>
                {item}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>

      <View style={{margin: 10}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
          {Data[pageNo].title}
        </Text>
        <Text style={{fontSize: 15, marginTop: 10}}>
          {Data[pageNo].subTitle}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#27ae61',
            padding: 17,
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={() => {
            // if (pageNo == 4) return setLoggedIn(true);
            if (pageNo == 4) return VUtils.navigate(props.navigation, 'SignIn');
            return setPageNo(pageNo + 1);
          }}>
          <Text style={{color: 'white', textTransform: 'uppercase'}}>
            {Data[pageNo].btn}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 10}}
          onPress={() => VUtils.navigate(props.navigation, 'SignIn')}>
          <Text style={{color: '#2f80dc'}}>
            I've already signed up, Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
