import { Tab, TabView } from "@rneui/themed";
import React, { useEffect, useState } from "react";
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
import firestore from "@react-native-firebase/firestore";

export default function SignIn() {
  const [index, setIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const { control, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function FileRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  const emailCheck = (email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [index]);

  function onSubmit(data: any) {
    if (email.trim().length === 0) {
      Alert.alert("Please enter your email address");
    } else if (!emailCheck(email)) {
      Alert.alert("Please enter your valid email address");
    } else if (password.trim().length === 0) {
      Alert.alert("Please enter your password");
    } else if (password.trim().length < 6) {
      Alert.alert("Your password must be at least 6 characters");
    } else {
      console.log('index',index);
      
      if (index === 1) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            const uid = response.user.uid;
            const userData = {
              id: uid,
              email: email,
              userEvent: [],
              userNotes: [],
            };

            firestore()
              .collection("Users")
              .doc(uid)
              .set(userData)
              .then(async (res) => {
                setLoggedIn(true);
                setEmail("");
                setPassword("");
              });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              Alert.alert("That email address is already in use!");
            }

            if (error.code === "auth/invalid-email") {
              Alert.alert("That email address is invalid!");
            }
            console.log(error);
          });
      } else {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setLoggedIn(true);
            setEmail("");
            setPassword("");
            console.log("User account created & signed in!");
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              Alert.alert("That email address is already in use!");
            }

            if (error.code === "auth/invalid-email") {
              Alert.alert("That email address is invalid!");
            }
            if (error.code === "auth/wrong-password") {
              Alert.alert("The password is invalid or the user does not have a password!");
            }
            if (error.code === "auth/user-not-found") {
              Alert.alert("User not found!");
            }
            console.log(error);
            
          });
      }
    }
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={FileRefresh} />
          // }
          contentContainerStyle={{ margin: 20 }}
        >
          <Tab
            value={index}
            onChange={async (e) => {
              setIndex(e);
            }}
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
          <View style={{ flex: 1, minHeight: 200 }}>
            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item style={{ width: "100%" }}>
                <PublicInputs
                  control={control}
                  email={email}
                  emailChange={(text) => setEmail(text.trim())}
                  password={password}
                  passwordChange={(text) => setPassword(text.trim())}
                />
              </TabView.Item>
              <TabView.Item style={{ width: "100%" }}>
                <PublicInputs
                  control={control}
                  email={email}
                  emailChange={(text) => setEmail(text.trim())}
                  password={password}
                  passwordChange={(text) => setPassword(text.trim())}
                />
              </TabView.Item>
            </TabView>
          </View>
          <View
            style={{
              marginTop: 0,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                width: "90%",
                borderRadius: 4,
              }}
              onPress={onSubmit}
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
        </ScrollView>
      </View>
    </>
  );
}
