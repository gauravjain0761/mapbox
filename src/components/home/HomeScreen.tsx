// import MapLibreGL from '@maplibre/maplibre-react-native';
// import React from 'react';
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import BottomModal from '../common/modal/BottomModal';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import VUtils from '../common/VUtils';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Geolocation from 'react-native-geolocation-service';
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// export default function HomeScreen() {
//   const ary = ['Season 2023', 'Fields'];
//   const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
//   const [selectedIndex, setAryIndex] = React.useState<number>(0);
//   const [initialPosition, setInitialPosition] = React.useState<any>(null);
//   // MapLibreGL.setAccessToken(
//   //   'pk.eyJ1IjoiYmhhdmktazkiLCJhIjoiY2xrdDg5MjJiMDE1NzNkbzloYWJoYTd0MyJ9.OBRDXcu-2A_GdNsk5UJf6g',
//   // );

//   MapLibreGL.setAccessToken(
//     'pk.eyJ1IjoiYmhhdmktazkiLCJhIjoiY2xrc3NwYWxqMDR4NzNybXliMmRtNjR4eiJ9.TQC6j9nI9h4XxeIzYNCOdA',
//   );

//   // MapLibreGL.setAccessToken(null);

//   const apiKey =
//     'pk.eyJ1IjoiYmhhdmktazkiLCJhIjoiY2xrc3NwYWxqMDR4NzNybXliMmRtNjR4eiJ9.TQC6j9nI9h4XxeIzYNCOdA';
//   const styleUrl = `https://tiles.stadiamaps.com/styles/outdoors.json?api_key=${apiKey}`;

//   const startDate = VUtils.showTime(Date.now(), 'MMM D');
//   const endDate = VUtils.showTime(Date.now(), 'MMM D, YYYY');

//   const RadioButton = (label: string, selected: boolean) => {
//     return (
//       <View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: 15,
//           }}>
//           <TouchableOpacity>
//             <View style={styles.radioButton}>
//               <Icon
//                 name={
//                   selected ? 'radio-button-checked' : 'radio-button-unchecked'
//                 }
//                 size={24}
//                 color={selected ? '#27b35f' : 'gray'}
//               />
//               <View>
//                 <Text style={styles.radioButtonLabel}>{label}</Text>
//               </View>
//             </View>
//             <Text
//               style={{
//                 marginLeft: 34,
//                 fontSize: 10,
//                 marginTop: -4,
//               }}>{`${startDate} - ${endDate}`}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={{color: '#5988bc'}}>Edit</Text>
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             padding: 25,
//           }}>
//           <TouchableOpacity>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <AntDesign name="plus" size={20} color="black" />
//               <Text style={{color: 'black', marginLeft: 7}}>Add season</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{flexDirection: 'row', alignItems: 'center'}}>
//             <MaterialCommunityIcons
//               name="crop-rotate"
//               size={20}
//               color="black"
//             />
//             <Text style={{color: 'black', marginLeft: 7}}>Crop rotation</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
//   function indentifyingIndex() {
//     if (selectedIndex === 0)
//       return (
//         <>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               padding: 10,
//               alignItems: 'center',
//             }}>
//             <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
//               Select season
//             </Text>
//             <AntDesign name="closecircle" size={25} color="#dee3e6" />
//           </View>
//           <View>{RadioButton('Season 2023', true)}</View>
//         </>
//       );

//     return (
//       <>
//         <View>
//           <Text style={{color: 'green', padding: 10}}>Actions</Text>
//           <TouchableOpacity style={{padding: 10}}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <FontAwesome5 name="hand-point-up" size={20} color="black" />
//               <Text style={{marginLeft: 20, color: 'black'}}>
//                 Select on map
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity style={{padding: 10}}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <FontAwesome5 name="border-none" size={20} color="black" />
//               <Text style={{marginLeft: 20, color: 'black'}}>Draw borders</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </>
//     );
//   }
//   React.useEffect(() => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setInitialPosition({latitude, longitude});
//       },
//       error => {
//         console.log('Error getting location:', error.message);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   }, []);
//   console.log(initialPosition, 'initialPosition');
//   return (
//     <View style={styles.page}>
//       <StatusBar backgroundColor="#27ae61" barStyle={'light-content'} />

//       <View style={styles.mapContainer}>
//         {/* <MapLibreGL.MapView
//           style={styles.map}
//           logoEnabled={false}
//           // styleURL={styleUrl}

//           // styleURL="https://demotiles.maplibre.org/style.json"
//         /> */}
//         <MapView
//           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//           style={styles.map}
//           region={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//           }}></MapView>
//         {initialPosition?.latitude && initialPosition?.longitude && (
//           // <MapLibreGL.MapView
//           //   style={styles.map}
//           //   styleURL={styleUrl}
//           //   initialCoordinate={[initialPosition.longitude, initialPosition.latitude]}
//           //   zoomLevel={15}
//           // />
//           //   < L.Marker
//           //   coordinate={[
//           //     initialPosition.longitude,
//           //     initialPosition.latitude,
//           //   ]}
//           // ></>
//           // Add markers or other map components here */}

//           // <MapView
//           //   provider={PROVIDER_GOOGLE}
//           //   style={styles.map}
//           //   region={{
//           //     latitude: initialPosition.latitude,
//           //     longitude: initialPosition.longitude,
//           //     latitudeDelta: 0.05,
//           //     longitudeDelta: 0.05,
//           //   }}>
//           //   <Marker
//           //     coordinate={{
//           //       latitude: initialPosition.latitude,
//           //       longitude: initialPosition.longitude,
//           //     }}
//           //   />
//           // </MapView>
//           <Text>render</Text>
//         )}
//         <View style={styles.seasonContainer}>
//           {ary.map((item: string, index: number) => (
//             <React.Fragment key={index}>
//               <TouchableOpacity
//                 onPress={() => {
//                   setModalOpen(!isModalOpen);
//                   setAryIndex(index);
//                 }}>
//                 <View
//                   style={{
//                     padding: 10,
//                     paddingHorizontal: 20,
//                     borderRadius: 30,
//                     backgroundColor: 'white',
//                   }}>
//                   <Text style={{color: 'black'}}>{item}</Text>
//                 </View>
//               </TouchableOpacity>
//             </React.Fragment>
//           ))}
//         </View>
//       </View>

//       {/* modal */}
//       {/* isModalOpen && styles.centeredView */}
//       <View style={{}}>
//         <BottomModal
//           isModalOpen={isModalOpen}
//           setModalOpen={setModalOpen}
//           components={indentifyingIndex()}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   mapContainer: {
//     flex: 1,
//     position: 'relative', // To allow absolute positioning within
//     zIndex: 0, // Lower z-index for the map container
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject, // Fill the entire container
//   },
//   seasonContainer: {
//     position: 'absolute',
//     top: 20,
//     left: 0,
//     right: 0,
//     zIndex: 1, // Higher z-index to place it above the map
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   // radiobtn
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   radioButtonLabel: {
//     marginLeft: 10,
//     color: 'black',
//   },
// });

import Mapbox, {
  Camera,
  LineLayer,
  MapView,
  MarkerView,
  ShapeSource,
  // MapboxGL
} from "@rnmapbox/maps";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

Mapbox.setAccessToken(
  "pk.eyJ1IjoiYmhhdmktazkiLCJhIjoiY2xrdDg5MjJiMDE1NzNkbzloYWJoYTd0MyJ9.OBRDXcu-2A_GdNsk5UJf6g"
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
  lineColor: "#fff",
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

const HomeScreen = () => {
  const [coordinates, setCoordinates] = useState<Position[]>([]);
  const [lastCoordinate, setLastCoordinate] = useState<Position>([0, 0]);
  const [started, setStarted] = useState(false);
  const [crosshairPos, setCrosshairPos] = useState([0, 0]);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const userData = firebase.auth().currentUser;

  const coordinatesWithLast = useMemo(() => {
    return [...coordinates, lastCoordinate];
  }, [coordinates, lastCoordinate]);

  const map = useRef<MapView>(null);


  const onPress = () => {
    if(coordinatesWithLast.length < 3) return
    firestore()
      .collection("Users")
      .doc(userData?.uid)
      .update({
        latLong: Object.assign({}, coordinatesWithLast ),
      })
      .then(async (res) => {
        // setCoordinates([]),
        // setLastCoordinate([0, 0])
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Mapbox.MapView
          styleURL="mapbox://styles/mapbox/satellite-v9"
          ref={map}
          style={styles.map}
          onPress={async () => {
            setStarted(true);
            setCoordinates([...coordinates, lastCoordinate]);
          }}
          onLongPress={() => {
            setStarted(false);
          }}
          onCameraChanged={async (e) => {
            const crosshairCoords = await map.current?.getCoordinateFromView(
              crosshairPos
            );
            setLastCoordinate(crosshairCoords as Position);
            if (crosshairCoords && started) {
              setLastCoordinate(crosshairCoords as Position);
            }
          }}
        >
          <Mapbox.Camera
            defaultSettings={{
              centerCoordinate: [-84.270172, 38.206348],
              zoomLevel: 12,
            }}
          />
          {started && <Polygon coordinates={coordinatesWithLast} />}
          <MarkerView coordinate={[-84.270172, 38.206348]}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: "#fff",
                borderRadius: 12 / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 5 / 2,
                  backgroundColor: "#000",
                }}
              />
            </View>
          </MarkerView>
        </Mapbox.MapView>
        <CrosshairOverlay onCenter={(c) => setCrosshairPos(c)} />

        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: "#000",
            width: 100,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            position:'absolute',
            bottom:10,
            right:10,
            borderRadius:8
          }}
        >
          <Text style={{ color: "#fff" }}>Save</Text>
        </TouchableOpacity>

        {/* <MapView
          ref={map}
          style={{ flex: 1 }}
          onPress={async()=>{
            setStarted(true);
            setCoordinates([...coordinates, lastCoordinate])
          }}
          onCameraChanged={async (e) => {
            const crosshairCoords = await map.current?.getCoordinateFromView(
              crosshairPos,
            );
            setLastCoordinate(crosshairCoords as Position);
            if (crosshairCoords && started) {
              setLastCoordinate(crosshairCoords as Position);
            }
          }}
        >
         {started&&  <Polygon coordinates={coordinatesWithLast} />}
          <Camera
            defaultSettings={{
              centerCoordinate: [-73.970895, 40.723279],
              zoomLevel: 12,
            }}
          />
        </MapView> */}
      </View>
    </View>
  );
};

HomeScreen.title = "Draw Polyline";
HomeScreen.tags = [
  "LineLayer",
  "ShapeSource",
  "onCameraChanged",
  "getCoordinateFromView",
  "Overlay",
];
HomeScreen.docs = `
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
});

export default HomeScreen;
