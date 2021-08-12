import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  FlatList,
  Dimensions
} from "react-native";
import axios from "axios";
import { beginAsyncEvent } from "react-native/Libraries/Performance/Systrace";

export default class MeteorScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      newdata: {},
    };
  }

  getMeteors = async () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-08-16&end_date=2021-08-20&api_key=fpetquWQljnA7ZX9CbDSmO0EU1RfjzkaYG9UmUhy"
      )
      .then((resopnse) => {
        this.setState({
          newdata: resopnse.data.near_earth_objects,
        });
      })
      .catch(() => {
        Alert.alert(error.message);
      });
  };

  renderItem = ({item})=>{
    var bg_img, speedImg, size

    if(item.threatScore<=30){
      bg_img=require("../assets/meteor_bg1.png");
      speedImg=require("../assets/meteor_speed1.gif");
      size=100;
    }else if(item.threatScore<75){
      bg_img=require("../assets/meteor_bg2.png");
      speedImg=require("../assets/meteor_speed2.gif");
      size=200;
    }else{
      bg_img=require("../assets/meteor_bg3.png");
      speedImg=require("../assets/meteor_speed2.gif");
      size=300;
    }

    return(
      <View>
        <ImageBackground source={bg_img} style={styles.background}>
          <Image source={speedImg} style={{width:size,height:size,alignSelf:"center"}}/>
            <View>
              <Text style={styles.cardtext}>
                {item.name}
              </Text>
              <Text style={styles.cardtext}>
                Closest to earth : {item.close_approach_data[0].close_approach_date_full}
              </Text>
              <Text style={styles.cardtext}>
                Estimated minimum diameter (kilometers) : {item.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
              <Text style={styles.cardtext}>
                Estimated maximum diameter (kilometers) : {item.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
              <Text style={styles.cardtext}>
                Missing earth by (kilometers) : {item.close_approach_data[0].miss_distance.kilometers}
              </Text>
              <Text style={styles.cardtext}>
                Relative velocity (km/h) : {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
              </Text>
            </View>
        </ImageBackground>
      </View>
    );
  }

  componentDidMount() {
    this.getMeteors();
  }

  render() {
    if (Object.keys(this.state.newdata).length === 0) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidsafearea} />
          <ImageBackground
            source={require("../assets/meteor_bg.jpg")}
            style={styles.background}
          >
            <Text style={styles.text}>Loading...</Text>
          </ImageBackground>
        </View>
      );
    } else {
      var meteorArray = Object.keys(this.state.newdata).map((date) => {
        return this.state.newdata[date];
      });

      var meteors = [].concat.apply([], meteorArray);
      meteors.forEach((element) => {
        var diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        var threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.threatScore = threatScore;
      });

      meteors.sort(function (a, b) {
        return b.threatScore - a.threatScore;
      });

      meteors = meteors.slice(0, 5);
      console.log(meteors);

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.androidsafearea} />
          <ImageBackground
            source={require("../assets/meteor_bg.jpg")}
            style={styles.background}
          >
            <Text style={styles.text}>MeteorScreen</Text>
            <FlatList
              data={meteors}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
              horizontal={true}
            />
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
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height
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
  cardtext:{
    fontSize:16,
    fontWeight:"bold",
    color:"white",
    marginTop:10,
    marginLeft:10,
    padding:10,
  }
});
