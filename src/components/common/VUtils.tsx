import moment from 'moment';
import {Dimensions} from 'react-native';

export default class VUtils {
  static navigate(navigation: any, route: any, data?: any) {
    if (route) return navigation.navigate(route, {item: data});
    return navigation.goBack();
  }
  static clcDeviceHeightWidth(height: number, width: number) {
    let deviceHeight = Dimensions.get('window').height;
    let deviceWidth = Dimensions.get('window').width;
    if (height && width)
      return {
        height: deviceHeight / height,
        width: deviceWidth / width,
      };
  }
  static showTime(time: number, format: string) {
    return moment(time).format(format);
  }
}
