import React from 'react';
import {Image, View} from 'react-native';
import VUtils from '../common/VUtils';

export default function SplashScreen(props: any) {
  React.useEffect(() => {
    setTimeout(() => {
      VUtils.navigate(props.navigation, 'TabScreen');
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <Image
        source={require('../../../assets/images/splashImg.jpeg')}
        style={{height: '70%', width: '100%'}}
      />
    </View>
  );
}
