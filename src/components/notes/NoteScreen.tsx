import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function NoteScreen() {
  const navigationRef = useNavigation();

  const userData = firebase.auth().currentUser;
  const [user, setUser] = useState([]);
  const [initializing, setInitializing] = useState(true);

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
  };

  useEffect(() => {
    onUserData();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f6f9" }}>
      <View style={{ backgroundColor: "#fff" }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View />
          <Text style={{ color: "black", fontSize: 18, left: 25 }}>Notes</Text>
          <TouchableOpacity>
            <Text style={{ color: "#2c93f6" }}>Filters</Text>
          </TouchableOpacity>
        </View>
        {user?.userEvent?.length !== 0 && (
          <>
            <View style={styles.searchView}>
              <AntDesign name="search1" color="gray" size={20} />
              <TextInput placeholder="Search notes" style={styles.textInput} />
            </View>
            <FlatList
              data={user?.userEvent}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={()=>navigationRef.navigate("NoteEditScreen")} style={styles.listView}>
                    <View style={styles.topView}>
                      <View style={styles.leftView}>
                        <Text style={styles.topTextStyle}>
                          {moment(item.date).format("MMMM DD YYYY, hh:MM a")}
                        </Text>
                        <Text style={styles.topSubTextStyle}>{item?.fieldName}</Text>
                      </View>
                      <Ionicons
                        name="share-outline"
                        color="#2c93f6"
                        size={22}
                      />
                    </View>
                    <View style={styles.bodyView}></View>
                    <Text style={styles.bottomText}>comment</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </>
        )}
      </View>

      {user?.userEvent?.length == 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 15 }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}
          >
            You don't have any notes yet
          </Text>
          <Text style={{ textAlign: "center", marginTop: 7 }}>
            Add notes when you conduct field scouting or When you want to mark
            an important place on the map
          </Text>

          <TouchableOpacity>
            <Text
              style={{
                color: "#2c93f6",
                fontWeight: "bold",
                marginTop: 7,
                textAlign: "center",
              }}
            >
              Add your first note
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(232 232 232)",
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 10,
    height: 40,
  },
  textInput: {
    fontSize: 18,
    color: "#000",
    top: 2,
    flex: 1,
  },
  listView: {
    // borderWidth: 1,
    // borderTopWidth:1,
    paddingHorizontal: 16,
    marginTop: 12,
    paddingVertical: 18,
    elevation: 1,
  },
  topView: {
    flexDirection: "row",
  },
  leftView: {
    flex: 1,
  },
  topTextStyle: {
    fontSize: 18,
    color: "#000",
    fontWeight: "700",
  },
  topSubTextStyle: {
    fontSize: 16,
    color: "#000",
    opacity: 0.8,
    fontWeight: "500",
  },
  bodyView: {
    height: 130,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  bottomText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "400",
  },
});
