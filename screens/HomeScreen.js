import React from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image  } from 'react-native';

export default class HomeScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.androidsafearea}/>
                <ImageBackground source={require("../assets/bg_image.png")} style={styles.background}>
                    <Text style={styles.text}>
                       ISS Tracker App
                    </Text>

                    <TouchableOpacity  style={styles.routebutton} onPress={()=>{this.props.navigation.navigate("ISSlocator")}}>
                        <Text style={styles.routetext}>ISS location</Text>
                        <Text style={styles.routeknowmore}>Know more</Text>
                        <Text style={styles.numberstyle}>1</Text>
                        <Image source={require("../assets/iss_icon.png")} style={styles.image}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.routebutton} onPress={()=>{this.props.navigation.navigate("Meteor")}}>
                        <Text style={styles.routetext}>Meteor</Text>
                        <Text style={styles.routeknowmore}>Know more</Text>
                        <Text style={styles.numberstyle}>2</Text>
                        <Image source={require("../assets/meteor_icon.png")} style={[styles.image,{width:150,height:150,top:-60,right:5}]}/>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text:{
        fontSize:20,
        color:"white",
        fontWeight:"bold",
        textAlign:"center",
    },
    container:{
        flex:1
    },
    routetext:{
        fontSize:30,
        marginLeft:30,
        marginTop:40,
        fontWeight:"bold",
    },
    background:{
        flex:1,
        resizeMode:"cover",
    },
    androidsafearea:{
        marginTop : Platform.OS=="android" ?(StatusBar.currentHeight):(0),
    },
    routebutton:{
        flex:0.25,
        backgroundColor:"white",
        marginTop:50,
        marginHorizontal:50,
        borderRadius:50,
    },
    image:{
        resizeMode:"contain",
        height:100,
        width:100,
        position:"absolute",
        right:10,
        top:-50,
    },
    routeknowmore:{
        marginLeft:30,
        fontSize:15,
        color:"red",
    },
    numberstyle:{
        fontSize:70,
        color:"lightgray",
        position:"absolute",
        right:10,
        top:70,
    }
});