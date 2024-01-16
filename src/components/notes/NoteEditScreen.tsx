import Mapbox, { Camera, LineLayer, MapView } from "@rnmapbox/maps";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import axios from "axios";
import WebView from "react-native-webview";
import { Modalize } from "react-native-modalize";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiYmhhdmktazkiLCJhIjoiY2xrdDg5MjJiMDE1NzNkbzloYWJoYTd0MyJ9.OBRDXcu-2A_GdNsk5UJf6g"
);
Mapbox.setTelemetryEnabled(false);

type Position = [number, number];

const NoteEditScreen = () => {
  const { params } = useRoute();
  const navigationRef = useNavigation();
  const isFocused = useIsFocused();

  const userData = firebase.auth().currentUser;
  const [editSelectModal, setEditSelectModal] = React.useState<boolean>(false);

  const [coordinates, setCoordinates] = useState<Position[]>([]);
  const [lastCoordinate, setLastCoordinate] = useState<Position>([0, 0]);
  const [crosshairPos, setCrosshairPos] = useState([0, 0]);
  const [user, setUser] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [fieldName, setFieldName] = useState("");
  const [selectDate, setSelectDate] = useState(
    moment(new Date()).format("MMMM DD YYYY")
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectTime, setSelectTime] = useState(
    moment(new Date()).format("HH:MM a")
  );
  const [coomentValue, setCoomentValue] = useState("");

  const [webView, setWebView] = useState("");
  const modalizeRef = useRef<Modalize>(null);

  function onAuthStateChanged(user) {
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    var config = {
      method: "GET",
      url: "http://143.198.226.104:5431/get_final_geometry/",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setWebView(response?.data);
      })
      .catch(function (error) {
        // console.log(error.response);
      });
    modalizeRef.current?.open();
  }, []);

  const onUserData = async () => {
    const firestoreDocument = await firestore()
      .collection("Users")
      .doc(userData?.uid)
      .get();

    const updatedUser = firestoreDocument.data();
    setUser(updatedUser);
    const userUpdate = [];
    console.log("updatedUser", updatedUser?.userNotes[0]);
    console.log("updatedUser", updatedUser?.userEvent[0]?.fieldName);
    // if (updatedUser?.userNotes?.length !== 0) {
    //   setSelectDate(updatedUser?.userNotes[0].date);
    //   setSelectTime(updatedUser?.userNotes[0].time);
    //   setCoomentValue(updatedUser?.userNotes[0]?.cooment);
    //   setFieldName(updatedUser?.userNotes[0]?.fieldName);
    // }
    setFieldName(updatedUser?.userEvent[0]?.fieldName);

    updatedUser?.userEvent?.map((item) => {
      userUpdate.push(JSON.parse(item.latLong));
    });
    var data = JSON.stringify({
      lats_longs: userUpdate,
    });
    var config = {
      method: "post",
      url: "http://143.198.226.104:5431/get_final_geometry/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setWebView(response?.data);
      })
      .catch(function (error) {
        // console.log(error.response);
      });
  };

  useEffect(() => {
    onUserData();
  }, [isFocused]);

  const coordinatesWithLast = useMemo(() => {
    return [...coordinates, lastCoordinate];
  }, [coordinates, lastCoordinate]);

  const onPress = async () => {
    const firestoreDocument = await firestore()
      .collection("Users")
      .doc(userData?.uid)
      .get();

    const updatedUser = firestoreDocument.data();
    if (coordinatesWithLast?.length < 3) return;
    if (fieldName == "") return Alert.alert("Enter the field name");
    const updateValue = updatedUser?.userEvent
      ? {
          userEvent: [
            ...updatedUser?.userEvent,
            {
              fieldName: fieldName,
              date: selectDate,
              latLong: JSON.stringify(coordinatesWithLast),
            },
          ],
        }
      : {
          userEvent: [
            {
              fieldName: fieldName,
              date: selectDate,
              latLong: JSON.stringify(coordinatesWithLast),
            },
          ],
        };

    firestore()
      .collection("Users")
      .doc(userData?.uid)
      .update(updateValue)
      .then(async (res) => {
        navigationRef.goBack();
        setCoordinates([]), setLastCoordinate([0, 0]);
        setFieldName("");
      });
  };

  const onNewNotesPress = () => {
    const updateValue1 = {
      userNotes: [
        {
          fieldName: fieldName,
          latLong: [],
          time: selectTime,
          date: selectDate,
          cooment: coomentValue,
        },
      ],
    };

    firestore()
      .collection("Users")
      .doc(userData?.uid)
      .update(updateValue1)
      .then(async (res) => {
        navigationRef.goBack();
        setCoordinates([]),
         setLastCoordinate([0, 0]);
        setFieldName("");
      })
      .catch((E) => {
        console.log(E);
      });
  };

  const onEditNotesPress = () => {
    const updateValue1 = {
      userNotes: [
        {
          fieldName: fieldName,
          latLong: [],
          time: selectTime,
          date: selectDate,
          cooment: coomentValue,
        },
      ],
    };

    firestore()
      .collection("Users")
      .doc(userData?.uid)
      .update(updateValue1)
      .then(async (res) => {
        setEditSelectModal(false);
        onUserData();
      })
      .catch((E) => {
        console.log(E);
      });
  };

  const onDeletePree = () => {
    firestore()
      .collection("Users")
      .doc(userData?.uid)
      .update({ userNotes: [] })
      .then(async (res) => {
        navigationRef.goBack();
      });
  };

  const FieldView = ({ label, value }) => {
    return (
      <View style={styles.fieldView}>
        <Text style={styles.fieldText}>{label}</Text>
        <Text style={styles.fieldSubText}>{value}</Text>
      </View>
    );
  };

  return (
    <>
      <WebView
        source={{ html: webView }}
        style={{ flex: 1 }}
        injectedJavaScriptForMainFrameOnly={true}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled
        startInLoadingState
        mixedContentMode="always"
      />
      <SafeAreaView style={{}}>
        <Modalize
          ref={modalizeRef}
          // alwaysOpen={300}
          modalHeight={600}
          snapPoint={300}
          alwaysOpen={400}
          
        >
          {params?.newaddting ? (
            <View style={{ marginTop: 18 }}>
              <View style={styles.editTopView}>
                <TouchableOpacity onPress={() => navigationRef.goBack()}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.editingText}>New note</Text>
                </View>
                <TouchableOpacity onPress={onNewNotesPress}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 1.5,
                  backgroundColor: "#f2f6f9",
                  marginTop: 10,
                }}
              />
              <View style={{ marginTop: 0, marginLeft: 16 }}>
                <View style={styles.editFiledView}>
                  <Text style={styles.fieldText}>{"Field"}</Text>
                  <TextInput
                    placeholder="Enter your field"
                    value={fieldName}
                    onChangeText={(text) => {
                      setFieldName(text);
                    }}
                    style={{
                      fontSize: 16,
                      color: "#2c93f6",
                      fontWeight: "400",
                      textAlign: "right",
                      marginRight: 16,
                      // height:10
                    }}
                  />
                </View>
                <View
                  style={{
                    height: 1.5,
                    backgroundColor: "#f2f6f9",
                    // marginTop: 10,
                  }}
                />
                <TextInput
                  placeholder="Your comment..."
                  style={styles.editTextInput}
                  multiline
                  value={coomentValue}
                  onChangeText={(text) => {
                    setCoomentValue(text);
                  }}
                />
              </View>
              <View
                style={{
                  height: 15,
                  backgroundColor: "#f2f6f9",
                  marginVertical: 15,
                }}
              />
              <View style={[styles.editFiledView, { marginHorizontal: 16 }]}>
                <Text style={styles.fieldText}>{"Date"}</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text
                    style={[
                      styles.fieldSubText,
                      { color: "#2c93f6", marginRight: 16 },
                    ]}
                  >
                    {selectDate}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(e, d) => {
                      setSelectDate(moment(d).format("MMMM DD YYYY"));
                      setShowDatePicker(false);
                    }}
                    style={{ backgroundColor: "white" }}
                  />
                )}
              </View>
              <View
                style={{
                  height: 1.5,
                  backgroundColor: "#f2f6f9",
                  marginVertical: 10,
                }}
              />
              <View style={[styles.editFiledView, { marginHorizontal: 16 }]}>
                <Text style={styles.fieldText}>{"Time"}</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                  <Text
                    style={[
                      styles.fieldSubText,
                      { color: "#2c93f6", marginRight: 16 },
                    ]}
                  >
                    {selectTime}
                  </Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="clock"
                    onChange={(e, d) => {
                      setSelectTime(moment(d).format("HH:MM a"));
                      setShowTimePicker(false);
                    }}
                    style={{ backgroundColor: "white" }}
                  />
                )}
              </View>
              <View
                style={{
                  height: 15,
                  backgroundColor: "#f2f6f9",
                  marginVertical: 15,
                }}
              />
            </View>
          ) : editSelectModal ? (
            <View style={{ marginTop: 18 }}>
              <View style={styles.editTopView}>
                <TouchableOpacity onPress={() => setEditSelectModal(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.editingText}>Editing</Text>
                </View>
                <TouchableOpacity onPress={() => onEditNotesPress()}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 1.5,
                  backgroundColor: "#f2f6f9",
                  marginTop: 10,
                }}
              />
              <View style={{ marginTop: 0, marginLeft: 16 }}>
                <View style={styles.editFiledView}>
                  <Text style={styles.fieldText}>{"Field"}</Text>

                  <TextInput
                    placeholder="Enter your field"
                    value={fieldName}
                    onChangeText={(text) => {
                      setFieldName(text);
                    }}
                    style={{
                      fontSize: 16,
                      color: "#2c93f6",
                      fontWeight: "400",
                      textAlign: "right",
                      marginRight: 16,
                      
                    }}
                  />
                </View>
                <View
                  style={{
                    height: 1.5,
                    backgroundColor: "#f2f6f9",
                    // marginTop: 10,
                  }}
                />
                <TextInput
                  placeholder="Your comment..."
                  style={styles.editTextInput}
                  multiline
                  value={coomentValue}
                  onChangeText={(text) => {
                    setCoomentValue(text);
                  }}
                />
              </View>
              <View
                style={{
                  height: 15,
                  backgroundColor: "#f2f6f9",
                  marginVertical: 15,
                }}
              />
              <View style={[styles.editFiledView, { marginHorizontal: 16 }]}>
                <Text style={styles.fieldText}>{"Date"}</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text
                    style={[
                      styles.fieldSubText,
                      { color: "#2c93f6", marginRight: 16 },
                    ]}
                  >
                    {selectDate}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(e, d) => {
                      setSelectDate(moment(d).format("MMMM DD YYYY"));
                      setShowDatePicker(false);
                    }}
                    style={{ backgroundColor: "white" }}
                  />
                )}
              </View>
              <View
                style={{
                  height: 1.5,
                  backgroundColor: "#f2f6f9",
                  marginVertical: 10,
                }}
              />
              <View style={[styles.editFiledView, { marginHorizontal: 16 }]}>
                <Text style={styles.fieldText}>{"Time"}</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                  <Text
                    style={[
                      styles.fieldSubText,
                      { color: "#2c93f6", marginRight: 16 },
                    ]}
                  >
                    {selectTime}
                  </Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="clock"
                    onChange={(e, d) => {
                      setSelectTime(moment(d).format("HH:MM a"));
                      setShowTimePicker(false);
                    }}
                    style={{ backgroundColor: "white" }}
                  />
                )}
              </View>
              <View
                style={{
                  height: 15,
                  backgroundColor: "#f2f6f9",
                  marginVertical: 15,
                }}
              />
            </View>
          ) : (
            <View style={{ marginTop: 18 }}>
              <View style={styles.topView}>
                <View style={styles.leftView}>
                  <Text style={styles.topTextStyle}>
                    {`${user?.userNotes?.[0]?.date} ${user?.userNotes?.[0]?.time}`}
                  </Text>
                  <Text style={styles.topSubTextStyle}>
                    {user?.userNotes?.[0]?.cooment}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigationRef.goBack();
                  }}
                >
                  <AntDesign
                    name="closecircle"
                    color="grey"
                    style={{ opacity: 0.4 }}
                    size={22}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 15,
                  backgroundColor: "#f2f6f9",
                  marginVertical: 10,
                }}
              />
              <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                <Text style={styles.headerText}>Field information</Text>
                <FieldView
                  label="Name"
                  value={user?.userNotes?.[0]?.fieldName}
                />
              </View>
              <View
                style={{
                  height: 15,
                  backgroundColor: "#f2f6f9",
                  marginVertical: 15,
                }}
              />
            </View>
          )}
          {!params?.newaddting && (
            <TouchableOpacity
              style={styles.btnStyleBottom}
              onPress={() => {
                editSelectModal ? onDeletePree() :
                 setEditSelectModal(true);
                 setSelectDate(user?.userNotes?.[0].date);
                 setSelectTime(user?.userNotes?.[0].time);
                 setCoomentValue(user?.userNotes?.[0]?.cooment);
                 setFieldName(user?.userNotes?.[0]?.fieldName);

              }}
            >
              <Text
                style={[
                  styles.btnStyleBottomText,
                  { color: editSelectModal ? "red" : "#2c93f6" },
                ]}
              >
                {editSelectModal ? "Delete note" : "Edit note"}
              </Text>
            </TouchableOpacity>
          )}
        </Modalize>
      </SafeAreaView>
    </>
  );
};

NoteEditScreen.title = "Draw Polyline";
NoteEditScreen.tags = [
  "LineLayer",
  "ShapeSource",
  "onCameraChanged",
  "getCoordinateFromView",
  "Overlay",
];
NoteEditScreen.docs = `
# Draw Polyline

This example shows a simple polyline editor. It uses \`onCameraChanged\` to get the center of the map and \`getCoordinateFromView\` 
to get the coordinates of the crosshair.

The crosshair is an overlay that is positioned using \`onLayout\` and \`getCoordinateFromView\`.

The \`ShapeSource\` is updated with the new coordinates and the \`LineLayer\` is updated with the new coordinates.
`;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
  btnStyle: {
    position: "absolute",
    top: 10,

    right: 10,
    width: 130,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  btnTextStyle: { fontSize: 18, color: "#fff" },
  listView: {
    // borderWidth: 1,
    // borderTopWidth:1,
    paddingHorizontal: 16,
    marginTop: 12,
    paddingVertical: 18,
    elevation: 1,
    marginHorizontal: 16,
  },
  topView: {
    flexDirection: "row",
    marginHorizontal: 16,
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
    fontWeight: "400",
  },
  fieldView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#808080",
  },
  fieldText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
  fieldSubText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
  headerText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "700",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderBottomColor: "#808080",
  },
  btnStyleBottom: {
    alignSelf: "center",
  },
  btnStyleBottomText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2c93f6",
  },
  editFiledView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editTopView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  cancelText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c93f6",
  },
  editingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  saveText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c93f6",
  },
  editTextInput: {
    maxHeight: 100,
    minHeight: 50,
  },
});

export default NoteEditScreen;
