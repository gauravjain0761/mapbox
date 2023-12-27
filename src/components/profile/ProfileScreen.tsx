import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { Style } from "@rnmapbox/maps";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const {navigate}=useNavigation()
  const profileDetails: any = [
    // {
    //   name: "Settings",
    //   icon: <Ionicons name="settings-outline" color="gray" size={26} />,
    //   mt: false,
    // },
    {
      name: 'Privacy policy',
      icon: <Ionicons name="desktop-outline" color="gray" size={26} />,
      mt: true,
      onPress:()=>navigate("WebScreen",{screenName:'Privacy policy'})
    },
    {
      name: "Terms of use",
      icon: (
        <Ionicons name="file-tray-stacked-outline" color="gray" size={26} />
      ),
      mt: false,
      onPress:()=>navigate("WebScreen",{screenName:'Terms of use'})
    },
    // {
    //   name: 'Support Chat',
    //   icon: <Ionicons name="chatbox-outline" size={26} color="gray" />,
    //   mt: true,
    // },

    {
      name: "User Guide",
      icon: <Ionicons name="copy-outline" size={26} color="gray" />,
      mt: false,
      onPress:()=>navigate("WebScreen",{screenName:"User Guide"})
    },
    {
      name: "Telegram Community",
      icon: <Ionicons name="paper-plane-outline" size={26} color="gray" />,
      mt: true,
      onPress:()=>navigate("WebScreen",{screenName:"Telegram Community"})
    },
    // {
    //   name: 'Share app',
    //   icon: <Ionicons name="share-outline" color="gray" size={26} />,
    //   mt: true,
    // },
    {
      name: "Logout",
      icon: <AntDesign name="logout" color="gray" size={24} />,
      mt: true,
      onPress: () => {
        auth()
          .signOut()
          .then(() => console.log("User signed out!"));
      },
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#f2f6f9" }}>
      <View
        style={{
          marginBottom: 40,
          marginTop: 20,
          marginLeft: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "green",
            padding: 5,
            borderRadius: 10,
            width: 55,
            marginRight: 10,
          }}
        >
          <Ionicons name="leaf-outline" color="#fff" size={40} />
        </View>
        <View>
          <Text style={{ fontSize: 18, color: "#000" }}>My Fields</Text>
          <Text style={{ fontSize: 14, color: "#000", opacity: 0.7 }}>
            Owner
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {profileDetails.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <TouchableOpacity onPress={item?.onPress}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  backgroundColor: "white",
                  paddingHorizontal: 17,
                  marginTop: item.mt ? 15 : 0,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {item.icon}
                  <Text style={{ marginLeft: 20, color: "black" }}>
                    {item.name}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward-outline"
                  color="gray"
                  size={26}
                />
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
}
