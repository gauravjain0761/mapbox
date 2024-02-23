//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment = require("moment");

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  onPress: () => void;
  setSelectDate: () => void;
  setFieldName: () => void;
  selectDate: any;
  fieldName: any;
};
const screen_height: number = Dimensions.get("window").height;
// create a component
const BottomFieldModal = ({
  isModalOpen,
  onClose,
  onPress,
  selectDate,
  fieldName,
  setSelectDate,
  setFieldName,
}: Props) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  return (
    <Modal
      animationInTiming={500}
      animationOutTiming={500}
      style={{ margin: 0 }}
      backdropOpacity={0.2}
      isVisible={isModalOpen}
      onBackButtonPress={() => {
        onClose();
      }}
      onBackdropPress={() => {
        onClose();
      }}
    >
      <View style={styles.container}>
        <View style={styles.bodyContent}>
          <View style={styles.topLine} />
          <View style={{flex:1}}>
          <View style={styles.bodyStyle}>
            <Text style={styles.bodyText}>Field Name</Text>
            <TextInput
              placeholder="Name"
              style={styles.bodyInput}
              value={fieldName}
              onChangeText={(text) => {
                setFieldName(text);
              }}
            />
          </View>
          <View style={styles.bodyStyle}>
            <Text style={styles.bodyText}>Select Date</Text>
            <TouchableOpacity onPress={() => setIsShowDatePicker(true)}>
              <Text style={styles.dateText}>
                {moment(selectDate).format("MM/DD/YYYY")}
              </Text>
             
            </TouchableOpacity>
          </View>

          </View>
          {isShowDatePicker && (
                <View>
                  <RNDateTimePicker
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "calendar"}
                    maximumDate={new Date()}
                    value={selectDate}
                    onChange={(e, d) => {
                      setIsShowDatePicker(false);
                      setSelectDate(d);
                    }}
                  />
                </View>
              )}
          <TouchableOpacity onPress={onPress} style={styles.btnText}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              Save
            </Text>
          </TouchableOpacity>
       
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  bodyContent: {
    height: screen_height * 0.4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topLine: {
    width: 25,
    height: 4,
    backgroundColor: "#000",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  bodyStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 18,
    marginTop:20
    // flex: 1,
  },
  bodyText: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  bodyInput: {
    fontSize: 18,
    fontWeight: "600",
    flex: 0.3,
    marginRight: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
  },
  btnText: {
    backgroundColor: "#2aae62",
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 10,
    marginBottom:30
  },
});

//make this component available to the app
export default BottomFieldModal;
