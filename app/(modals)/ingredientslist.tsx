import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import DBingredients from "@/assets/data/ingredients.json";
import Ingredient from "../ingredient/ingredient";
import { defaultStyles } from "@/constants/Styles";

const ingredientslist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const ingredients = DBingredients.ingredients;
  const [ingredientList, setIngredientList] = useState([]);
  function handleAdd(newIngredient) {
    setIngredientList([...ingredientList, newIngredient]);
  }

  function handleRemove(removeIngredient) {
    const filteredIngredients = ingredientList.filter((ingredient) => {
      return ingredient.id !== removeIngredient.id;
    });
    setIngredientList(filteredIngredients);
  }

  const searchIngredients = ingredients.filter((ingredient) => {
    return ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={setSearchQuery}
          style={defaultStyles.inputField}
          placeholder="Search"
          placeholderTextColor={Colors.grey}
        />
      </View>

      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 40 }}>
          {searchIngredients.length > 0
            ? searchIngredients.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  ingredient={ingredient}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              ))
            : ingredients.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  ingredient={ingredient}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  searchContainer: {
    padding: 26,
    backgroundColor: Colors.primary,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.dark,
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

export default ingredientslist;
