import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";

const Button = ({ onPress, ...props }) =>
  <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
    <Text
      {...props}
      style={{
        marginTop: 10,
        padding: 10,
        backgroundColor: "lightblue"
      }}
    />
  </TouchableOpacity>;

export default Button;
