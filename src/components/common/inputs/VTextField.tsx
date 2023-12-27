import React from 'react';
import {Controller} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';

export default function VTextField({
  name,
  control,
  style,
  rules = {},
  label,
  componentProps,
  errMsgStyle,
  lblStyle,
}: any) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
          // style={{width: '100%'}}
          >
            {label && <Text style={lblStyle}>{label}</Text>}
            <TextInput
              placeholderTextColor="#777777"
              // textAlignVertical={'center'}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={{    borderWidth: 1,
                borderColor: '#ededed',
                borderRadius: 3,}}
              {...componentProps}
            />
          </View>
          {error && (
            <Text
              style={[
                {
                  color: 'red',
                  textAlign: 'center',
                },
                ,
                {...errMsgStyle},
              ]}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
}
