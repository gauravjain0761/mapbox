import { Tab, TabView } from '@rneui/themed';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PublicInputs from './PublicInputs';
import { setLoggedIn } from '../globalState/store';

export default function SignIn() {
  const [index, setIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const { control, handleSubmit } = useForm();

  function FileRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }
  function onSubmit(data: any) {
    console.log(data, 'form data');
    setLoggedIn(true);
  }
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={FileRefresh} />
          }
          contentContainerStyle={{ margin: 20 }}>
          <Text style={{ textAlign: 'center' }}>App Name</Text>
          <Tab
            value={index}
            onChange={e => setIndex(e)}
            indicatorStyle={{
              backgroundColor: 'white',
              height: 3,
              marginTop: 10,
            }}
            containerStyle={active => ({
              backgroundColor: active ? 'white' : '#e8ecef',
            })}
            titleStyle={{ color: 'black' }}>
            <Tab.Item
              title="Sign In"
              titleStyle={{ fontSize: 12, color: 'black' }}
            />
            <Tab.Item
              title="Register"
              titleStyle={{ fontSize: 12, color: 'black' }}
            />
          </Tab>
          <View style={{ flex: 1, minHeight: 400 }}>
            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item style={{ width: '100%' }}>
                <PublicInputs control={control} />
              </TabView.Item>
              <TabView.Item style={{ width: '100%' }}>
                <PublicInputs control={control} />
              </TabView.Item>
            </TabView>
          </View>
        </ScrollView>
        <View
          style={{
            marginTop: 0,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{ backgroundColor: 'green', width: '90%', borderRadius: 4 }}
            onPress={handleSubmit(onSubmit)}>
            <Text
              style={{
                paddingVertical: 15,
                textAlign: 'center',
                color: 'white',
              }}>
              {index === 0 ? 'Sign In' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
