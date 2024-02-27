import Mapbox, {
  Camera,
  LineLayer,
  MapView,
  MarkerView,
  ShapeSource,
  FillLayer,
  // MapboxGL
} from "@rnmapbox/maps";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, {
  useState,
  useRef,
  ComponentProps,
  useMemo,
  forwardRef,
  useEffect,
} from "react";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import BottomModal from "../common/modal/BottomModal";
import BottomFieldModal from "../common/modal/BottomFieldModal";
import axios from "axios";
import WebView from "react-native-webview";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";

Mapbox.setAccessToken(
  "sk.eyJ1IjoiYmhhdmktazkiLCJhIjoiY2xzbGtiZTFzMGdmYTJpbjIzN3k0bnlxaCJ9.QA8nG8R26zj9buRyiMlUTg"
);
Mapbox.setTelemetryEnabled(false);

type Position = [number, number];

type CrosshairProps = {
  size: number;
  w: number;
  onLayout: ComponentProps<typeof View>["onLayout"];
};
const Crosshair = forwardRef<View, CrosshairProps>(
  ({ size, w, onLayout }: CrosshairProps, ref) => (
    <View
      onLayout={onLayout}
      ref={ref}
      style={{
        width: 2 * size + 1,
        height: 2 * size + 1,
      }}
    >
      {/* <View
        style={{
          position: "absolute",
          left: size,
          top: 0,
          bottom: 0,
          borderColor: "red",
          borderWidth: w / 2.0,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: size,
          left: 0,
          right: 0,
          borderColor: "red",
          borderWidth: w / 2.0,
        }}
      /> */}
    </View>
  )
);

const CrosshairOverlay = ({
  onCenter,
}: {
  onCenter: (x: [number, number]) => void;
}) => {
  const ref = useRef<View>(null);

  if (ref.current != null) {
    console.log("=> ref.current", ref.current != null);
  }
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
      pointerEvents="none"
    >
      <Crosshair
        size={20}
        w={1.0}
        ref={ref}
        onLayout={(e) => {
          const { x, y, width, height } = e.nativeEvent.layout;
          onCenter([x + width / 2.0, y + height / 2.0]);
        }}
      />
    </View>
  );
};

const lineLayerStyle = {
  lineColor: "red",
  lineWidth: 2,
};

const Polygon = ({ coordinates }: { coordinates: Position[] }) => {
  const features: GeoJSON.FeatureCollection = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: "a-feature",
          geometry: {
            type: "LineString",
            coordinates,
          },
          properties: {},
        } as const,
      ],
    };
  }, [coordinates]);
  console.log("=> features", JSON.stringify(features));
  return (
    <ShapeSource id={"shape-source-id-0"} shape={features}>
      <LineLayer id={"line-layer"} style={lineLayerStyle} />
    </ShapeSource>
  );
};

const InsightMapScreen = () => {
  const userData = firebase.auth().currentUser;
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const isFocused = useIsFocused();

  const [coordinates, setCoordinates] = useState<Position[]>([]);
  const [lastCoordinate, setLastCoordinate] = useState<Position>([0, 0]);
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [crosshairPos, setCrosshairPos] = useState([0, 0]);

  const [fieldName, setFieldName] = useState("");
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectMapView, setSelectMapView] = useState(false);
  const navigationRef = useNavigation();
  const { params } = useRoute();

  const [polygon, setPolygon] = useState({
    type: "Feature",
    geometry: {
      type: "MultiPolygon",
      coordinates: [],
    },
  });
  const [webView, setWebView] = useState("");
  const camera = useRef(null);

  console.log("userData", userData?.uid);

  const onUserData = async () => {
    const firestoreDocument = await firestore()
      .collection("Users")
      .doc(userData?.uid)
      .get();

    const updatedUser = firestoreDocument.data();
    const eventList = updatedUser?.userEvent?.filter(
      (list) => list.id == params?.eventId
    );

    const userUpdate = [];
    userUpdate.push(JSON.parse(eventList[0]?.latLong))
    if (updatedUser?.userEvent?.length == 0) {
      var config = {
        method: "GET",
        url: "http://143.198.226.104:80/get_final_geometry/",
        headers: {
          "Content-Type": "application/json",
          Accept: "Application/json",
          Authorization: "jwt",
        },
        data: {},
      };

      axios(config)
        .then(function (response) {
          console.log("response?.data", response?.data);

          setWebView(response?.data);
        })
        .catch(function (error) {
          console.log("error.response", error.response);
        });
    } else {
      var data = JSON.stringify({
        lats_longs: userUpdate,
      });
      const config = {
        method: "post",
        url: "http://143.198.226.104:80/get_final_geometry/",
        headers: {
          "Content-Type": "application/json",
          Accept: "Application/json",
          Authorization: "jwt",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setWebView(response?.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          setIsLoading(false);
          console.log("error.response", error);
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    onUserData();
  }, [isModalOpen, isFocused, userData]);

  const onDeletePress= async () => {
    const firestoreDocument = await firestore()
      .collection("Users")
      .doc(userData?.uid)
      .get();

    const updatedUser = firestoreDocument.data();
    const userEventList = updatedUser?.userEvent?.filter(
      (list: any) => list.id !== params?.eventId
    );
    firestore()
      .collection("Users")
      .doc(userData?.uid)
      .update({ userEvent: userEventList })
      .then(async (res) => {
           navigationRef.goBack()        
      });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <AntDesign name="arrowleft" color="black" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            color: "black",
            padding: 18,
            textAlign: "center",
            flex: 1,
            fontSize: 20,
            marginLeft: 80,
          }}
        >
          {params?.titleName}
        </Text>
        {!isLoading && (
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                backgroundColor: "red",
              },
            ]}
            onPress={() => {
              Alert.alert("", "Are you sure you want to Delete", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "Ok", onPress: () => onDeletePress() },
              ]);
            }}
          >
            <Text style={styles.btnTextStyle}>{"Delete Field"}</Text>
          </TouchableOpacity>
        )}
      </View>
      <WebView
        source={{ html: webView }}
        style={{ flex: 1 }}
        injectedJavaScriptForMainFrameOnly={true}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        startInLoadingState
        mixedContentMode="always"
        allowFileAccess={true}
        domStorageEnabled={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
      />
    </View>
  );
};

InsightMapScreen.title = "Draw Polyline";
InsightMapScreen.tags = [
  "LineLayer",
  "ShapeSource",
  "onCameraChanged",
  "getCoordinateFromView",
  "Overlay",
];
InsightMapScreen.docs = `
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
    // position: "absolute",
    // top: Platform.OS == "ios" ? 70 : 10,
    // right: 10,
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnTextStyle: { fontSize: 18, color: "#fff" },
});

export default InsightMapScreen;
