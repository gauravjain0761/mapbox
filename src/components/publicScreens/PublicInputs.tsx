import React from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import VTextField from "../common/inputs/VTextField";
import LoggedInFbGoogle from "./LoggedInFbGoogle";

type IProps = {
  control: any;
  value: any;
  email: any;
  emailChange: any;
  passwordChange: any;
  password: any;
};
export default function PublicInputs(props: IProps) {
  const { control, email, emailChange, password, passwordChange } = props;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

  return (
    <View>
      <KeyboardAvoidingView>
        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={{
              marginTop: 10,
              fontWeight: "bold",
              color: "black",
              fontSize: 12,
              marginBottom: 5,
            }}
          >
            E-Mail
          </Text>
          <TextInput
            placeholderTextColor="#777777"
            placeholder="Email"
            value={email}
            onChangeText={emailChange}
            style={{
              borderWidth: 1,
              borderColor: "#ededed",
              borderRadius: 3,
              paddingLeft: 10,
              paddingVertical:Platform.OS == 'ios' ? 20:0
            }}
          />
          <View>
            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
                color: "black",
                fontSize: 12,
                marginBottom: 5,
              }}
            >
              Password
            </Text>
            <TextInput
              placeholderTextColor="#777777"
              placeholder="Password"
              value={password}
              onChangeText={passwordChange}
              style={{
                borderWidth: 1,
                borderColor: "#ededed",
                borderRadius: 3,
                paddingLeft: 10,
              paddingVertical:Platform.OS == 'ios' ? 20:0

              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* <Text style={{paddingVertical: 15, textAlign: 'center'}}>or with</Text> */}
      {/* <LoggedInFbGoogle /> */}
    </View>
  );
}
