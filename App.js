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
    displayValue: "0",
    operator: null,
    firstVal: "",
    secondVal: "",
    nextVal: false,
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
    const { displayValue, operator, firstVal, secondVal, nextVal } = this.state;

    switch (input) {
      case "0":
      case "1":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.setState({
          displayValue: displayValue === "0" ? input : displayValue + input,
        });
        if (!nextVal) {
          this.setState({
            firstVal: firstVal + input,
          });
        } else {
          this.setState({
            secondVal: secondVal + input,
          });
        }
        break;
      case "+":
      case "-":
      case "x":
      case "/":
        this.setState({
          operator: input,
          nextVal: true,
          displayValue:
            (operator !== null
              ? displayValue.substr(0, displayValue.length - 1)
              : displayValue) + input,
        });
        break;

      case ".":
        let decimal = displayValue.slice(-1); //gets last character
        this.setState({
          displayValue: decimal !== "." ? displayValue + input : displayValue,
        });
        if (!nextVal) {
          this.setState({
            firstVal: firstVal + input,
          });
        } else {
          this.setState({
            secondVal: secondVal + input,
          });
        }
        break;
      case "=":
        let formatOperator =
          operator == "x" ? "*" : operator == "÷" ? "/" : operator;

        let result = eval(firstVal + formatOperator + secondVal);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          firstVal: result % 1 === 0 ? result : result.toFixed(2),
          secondVal: "",
          operator: null,
          nextVal: false,
        });
        break;
      case "CLR":
        this.setState({
          displayValue: "0",
          operator: null,
          firstVal: "",
          secondVal: "",
          nextVal: false,
        });
        break;

      case "DEL":
        let string = displayValue.toString();
        let backspace = string.substr(0, string.length - 1);
        let length = string.length;
        this.setState({
          displayValue: length == 1 ? "0" : backspace,
        });
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{this.state.displayValue}</Text>
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
