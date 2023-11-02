import React from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import VTextField from '../common/inputs/VTextField';
import LoggedInFbGoogle from './LoggedInFbGoogle';

type IProps = {
  control: any;
};
export default function PublicInputs(props: IProps) {
  const {control} = props;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

  return (
    <View>
      <KeyboardAvoidingView>
        <View style={{paddingHorizontal: 15}}>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              color: 'black',
              fontSize: 12,
            }}>
            E-Mail
          </Text>
          <VTextField
            name="email"
            control={control}
            style={{
              borderWidth: 1,
              borderColor: '#ededed',
              borderRadius: 3,
            }}
            componentProps={{
              placeholder: 'Enter e-mail address',
            }}
            rules={{
              required: 'E-mail is required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'E-mail is invalid!',
              },
            }}
          />
          <View>
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                color: 'black',
                fontSize: 12,
              }}>
              Password
            </Text>
            <VTextField
              name="password"
              control={control}
              rules={{required: 'Password is required'}}
              style={{
                borderWidth: 1,
                borderColor: '#ededed',
                borderRadius: 3,
              }}
              componentProps={{
                placeholder: 'Enter password',
                secureTextEntry: true,
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <Text style={{paddingVertical: 15, textAlign: 'center'}}>or with</Text>
      <LoggedInFbGoogle />
    </View>
  );
}
