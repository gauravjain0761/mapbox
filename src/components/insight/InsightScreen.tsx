import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import VUtils from "../common/VUtils";
import axios from "axios";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import MapView from "react-native-maps";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function InsightScreen() {
  const userData = firebase.auth().currentUser;
  const [currentTime, setCurrentTime] = React.useState(Date.now());
  const [user, setUser] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigationRef = useNavigation();

  // setTimeout(() => {
  //   // setCurrentTime(Date.now() + 1);
  // }, 1000);

  function onAuthStateChanged(user: any) {
    if (initializing) setInitializing(false);
  }

  const onUserData = async () => {
    await firestore()
    .collection("Users")
    .onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.filter((document) => {
        return document.id == userData?.uid ? document.data() : null;
      });
      console.log("tweetArray", tweetArray[0]?._data);
      setUser(tweetArray[0]?._data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    onUserData();
  }, []);

  const onDeletePress = async (id: any) => {
    const firestoreDocument = await firestore()
      .collection("Users")
      .doc(userData?.uid)
      .get();

    const updatedUser = firestoreDocument.data();
    const userEventList = updatedUser?.userEvent?.filter(
      (list: any) => list.id !== id
    );
    firestore()
      .collection("Users")
      .doc(userData?.uid)
      .update({ userEvent: userEventList })
      .then(async (res) => {
        onUserData();
      });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  console.log("user?.userEvent", user?.userEvent);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f6f9" }}>
      <View style={{ backgroundColor: "#fff" }}>
        <Text
          style={{
            color: "black",
            padding: 18,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Insight
        </Text>
      </View>

      {user?.userEvent?.length !== 0 ? (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 16,
              marginTop: 10,
            }}
          ></View>
          {user?.userEvent?.map((item: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigationRef.navigate("InsightMapScreen", {
                    eventId: item?.id,
                    titleName: item?.fieldName,
                  });
                }}
                style={styles.listView}
              >
                <View style={styles.leftView}>
                  <MapView provider={"google"} style={styles.map}></MapView>
                </View>
                <View style={styles.bodyView}>
                  <Text numberOfLines={1} style={styles.bodyText}>
                    {item?.fieldName}
                  </Text>
                  {/* <Text style={styles.bodySubText}>Cotton</Text> */}
                </View>
                <View style={styles.rightView}>
                  <View>
                    <Text style={styles.rightText}>{item?.date}</Text>
                    <Text style={styles.rightSubText}> {item?.time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("", "Are you sure you want to Delete", [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        { text: "Ok", onPress: () => onDeletePress(item.id) },
                      ]);
                    }}
                  >
                    <MaterialIcons
                      name="delete"
                      color="red"
                      size={24}
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <>
          <Image
            source={require("../../../assets/images/insightIcon.jpg")}
            style={{ height: "30%", width: "100%" }}
          />
          <Text style={{ color: "black", fontSize: 18, textAlign: "center" }}>
            You have no fields
          </Text>
          <Text
            style={{ textAlign: "center", marginTop: 6, marginHorizontal: 20 }}
          >
            Add fields to monitor their vegetation, growth stages, and weather
            forecast
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#f0f0f0f0",
              margin: 10,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={() => navigationRef.navigate("Stack")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name="add" size={30} color="gray" />
              <Text>Add fields</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  btnStyle: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  btnTextStyle: { fontSize: 14, color: "#000" },

  listView: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 10,
  },

  leftView: {
    // borderWidth: 1,
    width: 100,
    height: 65,
  },
  bodyView: {
    // flexDirection: "row",
    flex: 1,
    marginLeft: 20,
  },
  bodyText: {
    fontSize: 18,
    color: "#000",
  },
  bodySubText: {
    fontSize: 14,
    color: "#000",
    opacity: 0.7,
    top: -4,
  },
  rightView: {
    flexDirection: "row",
  },
  rightText: {
    fontSize: 12,
    color: "#000",
    opacity: 0.7,
  },
  rightSubText: {
    fontSize: 14,
    color: "#000",
    textAlign: "right",
  },
});
