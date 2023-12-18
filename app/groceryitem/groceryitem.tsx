import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

const GroceryItem = ({ item }) => {
  const [complete, setComplete] = useState(false);
  function select() {
    setComplete(!complete);
  }

  return complete ? (
    <TouchableOpacity
      style={[
        defaultStyles.btn,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        },
      ]}
      onPress={() => select()}
    >
      <Text style={[defaultStyles.btnText, { marginLeft: 10 }]}>
        {item.name}
      </Text>

      <Ionicons
        name="checkmark-outline"
        style={[defaultStyles.btnIcon, { marginLeft: 328 }]}
        color="white"
        size={24}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.btnOutline,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        },
      ]}
      onPress={() => select()}
    >
      <Text style={styles.btnOutlineText}>{item.name}</Text>

      <Ionicons name="ellipse-outline" size={24} color={Colors.grey} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "sat-sb",
  },
});
export default GroceryItem;
