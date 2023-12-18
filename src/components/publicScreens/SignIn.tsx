import { Tab, TabView } from "@rneui/themed";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PublicInputs from "./PublicInputs";
import { setLoggedIn } from "../globalState/store";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

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
    console.log(data, index, "form data");
    if(index ===1){
      auth()
      .createUserWithEmailAndPassword(data?.email, data?.password)
      .then((response) => {
        const uid = response.user.uid
        const userData = {
          id: uid,
          email:data?.email,
          userEvent:[]
        }

        firestore()
        .collection('Users')
          .doc(uid)
          .set(userData)
          .then(async (res) => {
            setLoggedIn(true);
          })
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }
      });
    }else{
      auth()
      .signInWithEmailAndPassword(data?.email, data?.password)
      .then(() => {
        setLoggedIn(true);
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }
      });
    }
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={FileRefresh} />
          }
          contentContainerStyle={{ margin: 20 }}
        >
          <Text style={{ textAlign: "center" }}>App Name</Text>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: "white",
              height: 3,
              marginTop: 10,
            }}
            containerStyle={(active) => ({
              backgroundColor: active ? "white" : "#e8ecef",
            })}
            titleStyle={{ color: "black" }}
          >
            <Tab.Item
              title="Sign In"
              titleStyle={{ fontSize: 12, color: "black" }}
            />
            <Tab.Item
              title="Register"
              titleStyle={{ fontSize: 12, color: "black" }}
            />
          </Tab>
          <View style={{ flex: 1, minHeight: 400 }}>
            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item style={{ width: "100%" }}>
                <PublicInputs control={control} />
              </TabView.Item>
              <TabView.Item style={{ width: "100%" }}>
                <PublicInputs control={control} />
              </TabView.Item>
            </TabView>
          </View>
        </ScrollView>
        <View
          style={{
            marginTop: 0,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ backgroundColor: "green", width: "90%", borderRadius: 4 }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              style={{
                paddingVertical: 15,
                textAlign: "center",
                color: "white",
              }}
            >
              {index === 0 ? "Sign In" : "Register"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
