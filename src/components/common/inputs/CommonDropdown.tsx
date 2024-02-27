import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {};

const CommonDropdown = ({
  label,
  placeholder,
  value,
  data,
  renderRightView,
  onChangeText,
  labelField,
  valueField,
  dropdownContainer,
  mainContainerStyle,
  search,
  searchQuery,
  onChangeSearch,
}: any) => {
  return (
      <Dropdown
        style={[styles.dropdown]}
        data={data}
        placeholder="Select field"
        labelField={labelField}
        onChangeText={(text) => {
          search && onChangeSearch(text);
        }}
        onChange={(item) => {
          console.log("item", item);
          onChangeText(item[valueField]);
        }}
        valueField={valueField}
        value={value}
        search={search}
        // searchQuery={searchQuery}
        searchField={labelField}
        searchPlaceholder="Search..."
        containerStyle={styles.containerStyle}
        selectedTextStyle={styles.inputText}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.rederItemStyle}
        inputSearchStyle={styles.inputSearchStyle}
        renderRightIcon={() => (
          <AntDesign name="down" color="black" size={18} />
        )}
      />
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  headerView: {
    width: 100,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  labelText: {
    textTransform: "uppercase",
    fontSize:18
  },
  inputText: {},
  dropdown: {
    // flex: 1,
    width: "30%",
    height: 60,
    // paddingLeft: 10,
    right: 20,

  },
  itemContainer: {
    backgroundColor: "#fff",
  },
  containerStyle: {
    backgroundColor: "#fff",
  },
  downBtn: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    // marginRight: hp(1),
  },
  downIcon: {
    width: 13,
    height: 13,
    resizeMode: "contain",
    transform: [{ rotate: "270deg" }],
    tintColor: "#fff",
  },
  rederItemStyle: {},
  inputSearchStyle: {},
});
