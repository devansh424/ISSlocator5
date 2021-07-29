import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>

                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text:{
        fontSize:16,
    },
    container:{
        flex:1,
    },
});