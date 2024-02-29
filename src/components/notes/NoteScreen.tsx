import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Mapbox from "@rnmapbox/maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NoteScreen() {
  const navigationRef = useNavigation();
  const isFocused = useIsFocused();

  const userData = firebase.auth().currentUser;
  const [user, setUser] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(user?.userNotes);
  const [searchItem, setSearchItem] = useState("");

  Mapbox.setAccessToken(
    "sk.eyJ1IjoiYmhhdmktazkiLCJhIjoiY2xzbGtiZTFzMGdmYTJpbjIzN3k0bnlxaCJ9.QA8nG8R26zj9buRyiMlUTg"
  );
  Mapbox.setTelemetryEnabled(false);

  console.log("user", user);

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

  useEffect(() => {
    setFilteredUsers(user?.userNotes);
  }, [user]);

  const filterSearch = (text) => {
    setSearchItem(text);
    const filteredItems = user?.userNotes?.filter(
      (user) =>
        user?.fieldName?.toLowerCase().includes(text?.toLowerCase()) ||
        user?.cooment?.toLowerCase().includes(text?.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };

  console.log("filteredUsers", filteredUsers);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  console.log("user?.userNotes?.length", user?.userNotes?.length);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f6f9" }}>
        <View style={{ backgroundColor: "#fff", flex: user?.userNotes?.length == 0 ? 0 : 1 }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 18,
                textAlign: "center",
                flex: 1,
                marginLeft: 30,
              }}
            >
              Notes
            </Text>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor: "#EE82EE",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                bottom: 2,
              }}
              onPress={() => {
                user?.userEvent?.length === 0
                  ? alert("Please first add field and then add notes")
                  : navigationRef.navigate("NoteEditScreen", {
                      newaddting: true,
                    });
              }}
            >
              <AntDesign name="plus" color="black" size={18} />
            </TouchableOpacity>
          </View>
          {user?.userNotes?.length !== 0 && (
            <>
              <View style={styles.searchView}>
                <AntDesign name="search1" color="gray" size={20} />
                <TextInput
                  placeholder="Search notes"
                  style={styles.textInput}
                  value={searchItem}
                  onChangeText={(text) => {
                    filterSearch(text);
                  }}
                />
              </View>
              {filteredUsers?.length > 0 && (
                <FlatList
                  data={filteredUsers}
                  style={{ flex: 1 }}
                  renderItem={({ item }) => {
                    console.log("item", item);
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          //@ts-ignore
                          navigationRef.navigate("NoteEditScreen", {
                            newaddting: false,
                            userId: item?.id,
                          })
                        }
                        style={styles.listView}
                      >
                        <View style={styles.topView}>
                          <View style={styles.leftView}>
                            <Text style={styles.topTextStyle}>
                              {`${item.date} ${item.time}`}
                            </Text>
                            <Text style={styles.topSubTextStyle}>
                              {item?.fieldName}
                            </Text>
                          </View>
                          <Ionicons
                            name="share-outline"
                            color="#2c93f6"
                            size={22}
                          />
                        </View>
                        <View style={styles.bodyView}>
                          <MapView
                            provider={"google"}
                            style={styles.map}
                          ></MapView>
                        </View>
                        <Text style={styles.bottomText}>{item?.cooment}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </>
          )}
        </View>

        {user?.userNotes?.length == 0 && (
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

            <TouchableOpacity
              onPress={() => {
                user?.userEvent?.length === 0
                  ? alert("Please first add field and then add notes")
                  : navigationRef.navigate("NoteEditScreen", {
                      newaddting: true,
                    });
              }}
            >
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
      </SafeAreaView>
    </>
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
    overflow: "hidden",
  },
  bottomText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "400",
  },
  map: {
    flex: 1,
  },
});
