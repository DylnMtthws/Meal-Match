import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Recipe from "../recipe/recipe";
import useUniversalRefresh from "@/app/store/refresh";

const Page = () => {
  const { state } = useUniversalRefresh();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleAdd(newRecipe) {
    setSelectedRecipes([...selectedRecipes, newRecipe]);
  }

  function handleRemove(removeRecipe) {
    const filteredRecipes = selectedRecipes.filter((recipe) => {
      return recipe.id !== removeRecipe.id;
    });
    setSelectedRecipes(filteredRecipes);
  }

  function addSelected() {
    setRecipeList(selectedRecipes);
  }

  useEffect(() => {
    fetch("http://localhost:5555/recipes")
      .then((r) => r.json())
      .then((data) => setRecipes(data));
  }, [state]);

  const searchRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <View style={styles.searchContainer}>
        <View
          style={[
            defaultStyles.inputField,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <TextInput
            onChangeText={setSearchQuery}
            placeholder="Search"
            placeholderTextColor={Colors.grey}
          />
          <Ionicons name="ios-search-outline" size={24} color={Colors.grey} />
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View style={selectedRecipes.length > 0 ? { marginBottom: 100 } : null}>
          {searchRecipes.length > 0
            ? searchRecipes.map((recipe) => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              ))
            : recipes.map((recipe) => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              ))}
        </View>
      </ScrollView>
      {selectedRecipes.length > 0 ? (
        <View style={styles.absoluteView}>
          <TouchableOpacity style={styles.btn} onPress={addSelected}>
            <Text style={{ fontFamily: "sat-sb", color: "#fff" }}>
              Generate Grocery List
            </Text>
            <Ionicons
              name="cart-outline"
              size={24}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      ) : null}
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
  absoluteView: {
    position: "absolute",
    bottom: 25,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
});

export default Page;
