import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Style } from "@rnmapbox/maps";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileScreen() {
  const { navigate } = useNavigation();
  const userData = firebase.auth().currentUser;
  const [user, setUser] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

  const profileDetails: any = [
    // {
    //   name: "Settings",
    //   icon: <Ionicons name="settings-outline" color="gray" size={26} />,
    //   mt: false,
    // },
    {
      name: "Privacy policy",
      icon: <Ionicons name="desktop-outline" color="gray" size={26} />,
      mt: true,
      onPress: () => navigate("WebScreen", { screenName: "Privacy policy",link:"https://en.wikipedia.org/wiki/Privacy_policy"  }),
    },
    {
      name: "Terms of use",
      icon: (
        <Ionicons name="file-tray-stacked-outline" color="gray" size={26} />
      ),
      mt: false,
      onPress: () => navigate("WebScreen", { screenName: "Terms of use",link:"https://en.wikipedia.org/wiki/Privacy_policy" }),
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
      onPress: () => navigate("WebScreen", { screenName: "User Guide",link:"https://en.wikipedia.org/wiki/Privacy_policy" }),
    },
    {
      name: "Telegram Community",
      icon: <Ionicons name="paper-plane-outline" size={26} color="gray" />,
      mt: true,
      onPress: () =>
        navigate("WebScreen", { screenName: "Telegram Community",link:'https://t.me/c/1806002977/1' }),
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={['top']}>
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
          <Text style={{ fontSize: 18, color: "#000" }}>{user?.email}</Text>
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
    </SafeAreaView>
  );
}
