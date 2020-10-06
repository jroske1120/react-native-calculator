import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default class inputNumberButton extends Component {
  render() {
    const {value, handleOnPress} = this.props;
    return <TouchableOpacity 
    onPress={() => handleOnPress(value)}
    style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 26,
  }
});
