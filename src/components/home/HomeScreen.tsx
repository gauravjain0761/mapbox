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
//           //   <MapLibreGL.Marker
//           //   coordinate={[
//           //     initialPosition.longitude,
//           //     initialPosition.latitude,
//           //   ]}
//           // ></MapLibreGL.Marker>
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

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Mapbox from '@rnmapbox/maps';
Mapbox.setAccessToken('pk.eyJ1IjoiYmhhdmktazkiLCJhIjoiY2xrdDg5MjJiMDE1NzNkbzloYWJoYTd0MyJ9.OBRDXcu-2A_GdNsk5UJf6g')
Mapbox.setTelemetryEnabled(false)

export default function HomeScreen() {
  [[]]
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL='mapbox://styles/mapbox/satellite-v9'

          style={styles.map} >
          <Mapbox.Camera
            zoomLevel={8}

          />
        </Mapbox.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1
  }
});