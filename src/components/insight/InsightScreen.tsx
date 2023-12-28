import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import VUtils from "../common/VUtils";
import axios from "axios";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import MapView from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";

export default function InsightScreen() {
  const userData = firebase.auth().currentUser;
  const [currentTime, setCurrentTime] = React.useState(Date.now());
  const [user, setUser] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  setTimeout(() => {
    setCurrentTime(Date.now() + 1);
  }, 1000);

  function onAuthStateChanged(user: any) {
    if (initializing) setInitializing(false);
  }

  const onUserData = async () => {

    const firestoreDocument = await firestore()
      .collection("Users")
      .doc(userData?.uid)
      .get();

    const updatedUser = firestoreDocument.data();
    setUser(updatedUser);
    const userUpdate = [];
    updatedUser?.userEvent?.map((item) => {
      userUpdate.push(JSON.parse(item.latLong));
    });
    var data = JSON.stringify({
      lats_longs: userUpdate,
    });
    var config = {
      method: "post",
      url: "http://143.244.177.79:5431/get_final_geometry/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        
        // setWebView(response?.data);
      })
      .catch(function (error) {
        // console.log(error.response);
      });
    setIsLoading(false)

  };

  useEffect(() => {
    setIsLoading(true)
    onUserData();
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"}/>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f6f9" }}>
      <View style={{ backgroundColor: "#fff" }}>
        <Text style={{ color: "black", padding: 18, textAlign: "center" }}>
          {/* It is {VUtils.showTime(currentTime, "h:mm:ss a")} on{" "}
          {VUtils.showTime(currentTime, "MMMM D")} */}
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
          >
            {/* <TouchableOpacity
              style={[styles.btnStyle, { backgroundColor: "#2b2b08" }]}
            >
              <Text style={[styles.btnTextStyle, { color: "#fff" }]}>
                All fields
              </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.btnStyle, { backgroundColor: "#cccccc" }]}
            >
              <Text style={styles.btnTextStyle}>Cotton</Text>
            </TouchableOpacity> */}
          </View>
          {user?.userEvent?.map((item: any) => {
            return (
              <View style={styles.listView}>
                <View style={styles.leftView} >
                <MapView provider={"google"} style={styles.map}>
                      
                      </MapView>
                </View>
                <View style={styles.bodyView}>
                  <Text style={styles.bodyText}>{item?.fieldName}</Text>
                  {/* <Text style={styles.bodySubText}>Cotton</Text> */}
                </View>
                <View style={styles.rightView}>
                  <Text style={styles.rightText}>
                    {item?.date}
                  </Text>
                  <Text style={styles.rightSubText}> {item?.time}</Text>
                </View>
              </View>
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
    </View>
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
  rightView: {},
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
