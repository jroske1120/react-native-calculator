import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputNumberButton from "./InputNumberButton";

const buttons = [
  ["CLR", "DEL"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

export default class App extends Component {
  state = {
    displayValue: 0,
  };
  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return (
          <InputNumberButton
            value={buttonItems}
            handleOnPress={this.handleInput}
            key={"btn-" + buttonIndex}
          />
        );
      });

      return (
        <View style={styles.inputRow} key={"row-" + index}>
          {rowItem}
        </View>
      );
    });
    return layouts;
  }

  handleInput = (input) => {
    const { displayValue } = this.state;

    // switch (key) {
    //   case value:
    //     break;

    //   default:
    //     break;
    // }
    this.setState({
      displayValue: displayValue === "0" ? input : displayValue + input,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {this.state.displayValue}
          </Text>
        </View>
        <View style={styles.inputContainer}>{this.renderButtons()}</View>
        <View>History</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#3a2e63",
  },
  inputContainer: {
    flex: 8,
    backgroundColor: "#ee2e23",
  },
  resultText: {
    color: "white",
    fontSize: 80,
    fontWeight: "bold",
    padding: 20,
    textAlign: "right",
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
  },
});
