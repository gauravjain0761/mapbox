import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { Style } from "@rnmapbox/maps";
import WebView from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WebScreen() {
  const { params } = useRoute();
  const { goBack } = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={['top']}>
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => goBack()}>
          <AntDesign name="arrowleft" color="gray" size={26} />
        </TouchableOpacity>
        <Text
          style={{
            color: "black",
            fontSize: 18,
            textAlign: "center",
            flex: 1,
            right: 10,
          }}
        >
          {params?.screenName}
        </Text>
      </View>
      <WebView source={{ uri: params.link }} />
    </SafeAreaView>
  );
}
