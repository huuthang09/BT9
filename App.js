import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Image, Text, Alert } from "react-native";
import * as Location from "expo-location";
import { AppLoading } from 'expo';

export default function App() {
  const [newMarker, setMarker] = useState({
    marker: [
      {
        title: "Ba Na Hills",
        coordinates: {
          latitude: 15.997952,
          longitude: 107.98812,
        },
      },
      {
        title: "Ngu Hanh Son Mountain",
        coordinates: {
          latitude: 16.006341,
          longitude: 108.263171,
        },
      },

      {
        title: "Dragon Bridge",
        coordinates: {
          latitude: 16.061313,
          longitude: 108.227422,
        },
      },
    ],
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  if(location!=null){
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.7,
            longitudeDelta: 0.7,
          }}
          followsUserLocation={true}
          showsUserLocation={true}
        >
          {newMarker.marker.map((marker, index) => (
            <Marker key={index} coordinate={marker.coordinates}>
              <View style={styles.markerContainer}>
                <Text style={styles.txt}>{marker.title}</Text>
                <Image
                  source={{
                    uri:
                      "https://cdn2.iconfinder.com/data/icons/seo-flat-6/128/15_Place_Optimization-512.png",
                  }}
                  style={{ height: 35, width: 35 }}
                />
              </View>
            </Marker>
          ))}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <View style={styles.markerContainer}>
              <Text style={styles.txt}>Current Location</Text>
              <Image
                source={{
                  uri:
                    "https://cdn2.iconfinder.com/data/icons/donkey/800/8-512.png",
                }}
                style={{ height: 25, width: 25 }}
              />
            </View>
          </Marker>
  
          <Polyline
            coordinates={[
              { latitude: 15.997952, longitude: 107.98812 },
              { latitude: 16.003214, longitude: 108.264467 },
              { latitude: 16.061313, longitude: 108.227422 },
            ]}
            strokeColor="#000"
            strokeWidth={3}
          />
        </MapView>
      </View>
    );
  }else{
    return <AppLoading />;
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  txt: {
    backgroundColor:'#FFF',
    padding:2,
    fontSize: 10,
    color: "#F00",
    fontWeight: "bold",
  },

  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
