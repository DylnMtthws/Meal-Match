import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Recipe = ({ recipe, handleAdd, handleRemove }) => {
  const [add, setAdd] = useState(false);
  function onAdd() {
    setAdd(!add);
    handleAdd(recipe);
  }

  function onRemove() {
    setAdd(!add);
    handleRemove(recipe);
  }
  return add ? (
    <TouchableOpacity
      style={[
        defaultStyles.btn,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        },
      ]}
      onPress={() => onRemove()}
    >
      <Text style={[defaultStyles.btnText, { marginLeft: 10 }]}>
        {recipe.name}
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
      onPress={() => onAdd()}
    >
      <Text style={styles.btnOutlineText}>{recipe.name}</Text>

      <Ionicons name="add-outline" size={24} color={Colors.grey} />
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

export default Recipe;
