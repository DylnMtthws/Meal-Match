import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Swipeable,
  LongPressGestureHandler,
} from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import useUniversalRefresh from "../store/refresh";

const Recipe = ({ recipe, handleAdd, handleRemove, handleDelete }) => {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const { changeState, state } = useUniversalRefresh();

  const [name, setName] = useState(recipe.name);
  const handleChange = (text) => {
    setName(text);
  };

  useEffect(() => {
    setAdd(false);
  }, [state]);

  const handleSubmit = () => {
    const newName = { name: name };
    fetch(`http://localhost:5555/recipes/${recipe.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newName),
    })
      .then((response) => {
        if (response.headers.get("content-type") === "application/json") {
          return response.json();
        } else {
          throw new Error("Received non-JSON response");
        }
      })
      .then((r) => {
        // Handle JSON data
      })
      .catch((error) => {
        // Handle error
      });

    setName(name);
    setEdit(!edit);
  };

  function onAdd() {
    setAdd(!add);
    handleAdd(recipe);
  }

  function onRemove() {
    setAdd(!add);
    handleRemove(recipe);
  }

  function handleEdit() {
    setEdit(true);
  }

  function displayDeleteConfirmation() {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleDelete(recipe) },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {add ? (
        <TouchableOpacity
          style={[
            defaultStyles.btn,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
              width: 275,
            },
          ]}
          onPress={() => onRemove()}
        >
          {edit ? (
            <TextInput
              style={[defaultStyles.btnText, { marginLeft: 10 }]}
              placeholder={name}
              onChangeText={handleChange}
            />
          ) : (
            <Text style={[defaultStyles.btnText, { marginLeft: 10 }]}>
              {name.length > 25 ? `${name.substring(0, 25)}...` : name}
            </Text>
          )}

          <Ionicons
            name="checkmark-outline"
            style={[defaultStyles.btnIcon, { marginLeft: 225 }]}
            color="#fff"
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
          {edit ? (
            <TextInput
              style={styles.btnOutlineText}
              placeholder={name}
              onChangeText={handleChange}
            />
          ) : (
            <Text style={styles.btnOutlineText}>
              {name.length > 25 ? `${name.substring(0, 25)}...` : name}
            </Text>
          )}

          <Ionicons name="add-outline" size={24} color={Colors.grey} />
        </TouchableOpacity>
      )}
      {edit ? (
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons
            name="checkmark-outline"
            size={24}
            color={Colors.primary}
            style={{ marginTop: 11 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleEdit}>
          <Ionicons
            name="create-outline"
            size={24}
            color={Colors.primary}
            style={{ marginTop: 11 }}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => displayDeleteConfirmation()}>
        <Ionicons
          name="trash-outline"
          size={24}
          color={Colors.red}
          style={{ marginTop: 11 }}
        />
      </TouchableOpacity>
    </View>
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
    width: 275,
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
