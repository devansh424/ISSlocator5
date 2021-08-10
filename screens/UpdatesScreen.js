import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class UpdatesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>UpdatesScreen</Text>
      </View>
    );
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
});
