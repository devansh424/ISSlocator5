import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

export default class ISSlocatorScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      location: {},
    };
  }

  getISSLocation = async () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        this.setState({
          location: response.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.getISSLocation();
  }

  render() {
    console.log(this.state.location);
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidsafearea} />
          <ImageBackground
            source={require("../assets/iss_bg.jpg")}
            style={styles.background}
          >
            <Text style={styles.text}>ISSlocatorScreen</Text>
            <Text style={styles.text}>Loading...</Text>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidsafearea} />
          <ImageBackground
            source={require("../assets/iss_bg.jpg")}
            style={styles.background}
          >
            <Text style={styles.text}>ISSlocatorScreen</Text>
            <View style={styles.mapcontainer}>
              <MapView
                style={styles.mapview}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  longitudeDelta: 90,
                  latitudeDelta: 90,
                }}
              >
                <Marker
                  coordinate={{
                    longitude: this.state.location.longitude,
                    latitude: this.state.location.latitude,
                  }}
                >
                  <Image
                    source={require("../assets/iss_icon.png")}
                    style={styles.iss}
                  />
                </Marker>
              </MapView>
            </View>
            <View style={styles.viewcontainer}>
              <Text>Longitude : {this.state.location.longitude}</Text>
              <Text>Latitude : {this.state.location.latitude}</Text>
              <Text>Altitude : {this.state.location.altitude}</Text>
              <Text>Velocity : {this.state.location.velocity}</Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  routetext: {
    fontSize: 30,
    marginLeft: 30,
    marginTop: 40,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  androidsafearea: {
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  routebutton: {
    flex: 0.25,
    backgroundColor: "white",
    marginTop: 50,
    marginHorizontal: 50,
    borderRadius: 50,
  },
  image: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    position: "absolute",
    right: 10,
    top: -50,
  },
  routeknowmore: {
    marginLeft: 30,
    fontSize: 15,
    color: "red",
  },
  numberstyle: {
    fontSize: 70,
    color: "lightgray",
    position: "absolute",
    right: 10,
    top: 70,
  },
  mapview: {
    width: "100%",
    height: "100%",
  },
  iss: {
    width: 40,
    height: 30,
  },
  mapcontainer: {
    flex: 0.7,
  },
  viewcontainer: {
    flex: 0.2,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    alignItems: "center",
  },
});
