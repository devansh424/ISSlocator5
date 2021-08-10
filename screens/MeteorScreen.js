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
} from "react-native";
import axios from "axios";

export default class MeteorScreen extends React.Component {
    constructor(){
        super();
        this.state={
            newdata:{},

        }
    }

    getMeteors = async () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-08-16&end_date=2021-08-20&api_key=fpetquWQljnA7ZX9CbDSmO0EU1RfjzkaYG9UmUhy")
        .then((resopnse)=>{
            this.setState({
                newdata:resopnse.data.near_earth_objects
            });
        })
        .catch(()=>{Alert.alert(error.message)})
    }

    componentDidMount(){
        this.getMeteors();
    }

  render() {
      if(Object.keys(this.state.newdata).length===0){
        return (
            <View style={styles.container}>
              <SafeAreaView style={styles.androidsafearea} />
              <ImageBackground source={}>
                <Text style={styles.text}>Loading...</Text>
              </ImageBackground>
            </View>
          );
      }else{
          var meteorArray = Object.keys(this.state.newdata).map((date)=>{
              return this.state.newdata[date];
          });

          var meteors = [].concat.apply([],meteorArray);
          meteors.forEach((element)=>{
            var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
            var threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
            element.threatScore=threatScore;
          });

        return (
        <View style={styles.container}>
            <SafeAreaView style={styles.androidsafearea} />
            <ImageBackground source={}>
            <Text style={styles.text}>MeteorScreen</Text>
            </ImageBackground>
        </View>
        );
      }
    
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
  },
  androidsafearea: {
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
