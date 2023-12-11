import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import DBIngredients from "@/assets/data/ingredients.json";
import { Link } from "expo-router";

const CreateNewRecipe = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState(DBIngredients);

  // useEffect(() => {
  //   //NEED TO CONNECT TO BACKEND
  //   fetch("/ingredients")
  //     .then((response) => response.json())
  //     .then((data) => setIngredients(data))
  //     .catch((error) => console.error(error));
  // }, []);

  const handleAddIngredient = () => {
    setSelectedIngredients([
      ...selectedIngredients,
      { id: null, selected: false },
    ]);
  };

  const handleSelectIngredient = (index) => {
    setSelectedIngredients((prevState) => {
      const newSelectedIngredients = [...prevState];
      newSelectedIngredients[index].selected =
        !newSelectedIngredients[index].selected;
      return newSelectedIngredients;
    });
  };

  // const handleSubmit = () => {
  //   const recipeName = /* get the recipe name from the state */;
  //   const recipeDescription = /* get the recipe description from the state */;

  //   // create the new recipe
  //   fetch('http://localhost:5000/recipes', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ name: recipeName, description: recipeDescription }),
  //   })
  //     .then(response => response.json())
  //     .then(recipe => {
  //       // add the ingredients to the recipe
  //       selectedIngredients
  //         .filter(ingredient => ingredient.selected)
  //         .forEach(ingredient => {
  //           fetch('http://localhost:5000/recipeingredients', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ recipe_id: recipe.id, ingredient_id: ingredient.id }),
  //           });
  //         });
  //     })
  //     .catch(error => console.error(error));
  //  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        placeholder="Recipe Name"
        placeholderTextColor="#000"
      />
      <TextInput
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        placeholder="Recipe Description"
        placeholderTextColor="#000"
      />

      {selectedIngredients.map((ingredient, index) => (
        <View key={index}>
          <Text>{ingredient.name}</Text>
          <Ionicons
            name={ingredient.selected ? "checkmark-circle" : "add-circle"}
            size={24}
            onPress={() => handleSelectIngredient(index)}
          />
        </View>
      ))}
      <Link
        href={"/(modals)/ingredientslist"}
        asChild
        style={[styles.btnOutline, { marginBottom: 30 }]}
      >
        <TouchableOpacity>
          <Ionicons
            name="add-circle-outline"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Add Ingredients</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.btnOutline}>
        <Ionicons name="cart-outline" size={24} style={defaultStyles.btnIcon} />
        <Text style={styles.btnOutlineText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
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

export default CreateNewRecipe;
