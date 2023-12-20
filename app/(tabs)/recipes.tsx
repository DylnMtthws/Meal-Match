import { View, Text, StyleSheet, SafeAreaView } from "react-native";
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
  const { state, changeState } = useUniversalRefresh();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedRecipes([]);
  }, [state]);

  function handleAdd(newRecipe) {
    setSelectedRecipes([...selectedRecipes, newRecipe]);
  }

  function handleDelete(deletedRecipe) {
    fetch(`http://localhost:5555/recipes/${deletedRecipe.id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        console.log("Recipe deleted successfully");
      } else {
        throw new Error("Error deleting recipe");
      }
    });
    onDelete(deletedRecipe);
  }

  function onDelete(deletedRecipe) {
    const filteredRecipes = recipes.filter((recipe) => {
      return recipe.id !== deletedRecipe.id;
    });
    setRecipes(filteredRecipes);
  }

  function handleRemove(removeRecipe) {
    const filteredRecipes = selectedRecipes.filter((recipe) => {
      return recipe.id !== removeRecipe.id;
    });
    setSelectedRecipes(filteredRecipes);
  }

  function addSelected() {
    selectedRecipes.forEach((recipe) => {
      const recipe_id = recipe.id;
      fetch("http://localhost:5555/selections", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe_id }),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log(
              `Successfully added recipe with id ${recipe_id} to selections.`
            );
            changeState();
          } else {
            console.log(
              `Failed to add recipe with id ${recipe_id} to selections.`
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  useEffect(() => {
    fetch("http://localhost:5555/recipes")
      .then((r) => r.json())
      .then((data) => setRecipes(data));
  }, [state]);

  const searchRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const CATEGORIES = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
    "Beverage",
  ];

  const categoryHeader = (category) => (
    <View style={styles.seperatorView}>
      <View
        style={{
          flex: 1,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text style={styles.seperator}>{category}</Text>
      <View
        style={{
          flex: 1,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );

  const categorizedItems = {
    Breakfast: recipes.filter((item) => item.category === "Breakfast"),
    Lunch: recipes.filter((item) => item.category === "Lunch"),
    Dinner: recipes.filter((item) => item.category === "Dinner"),
    Snack: recipes.filter((item) => item.category === "Snack"),
    Dessert: recipes.filter((item) => item.category === "Dessert"),
    Beverage: recipes.filter((item) => item.category === "Beverage"),
  };

  function sectionComponent(category) {
    const list = categorizedItems[category].map((recipe) => (
      <Recipe
        key={recipe.id}
        recipe={recipe}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleDelete={handleDelete}
      />
    ));
    return list.length > 0 ? (
      <>
        {categoryHeader(category)}
        {list}
      </>
    ) : null;
  }

  // const ogMap =
  //   searchRecipes.length > 0
  //     ? searchRecipes.map((recipe) => (
  //         <Recipe
  //           key={recipe.id}
  //           recipe={recipe}
  //           handleAdd={handleAdd}
  //           handleRemove={handleRemove}
  //           handleDelete={handleDelete}
  //         />
  //       ))
  //     : recipes.map((recipe) => (
  //         <Recipe
  //           key={recipe.id}
  //           recipe={recipe}
  //           handleAdd={handleAdd}
  //           handleRemove={handleRemove}
  //           handleDelete={handleDelete}
  //         />
  //       ));

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Ionicons
        name="restaurant-outline"
        size={40}
        color={Colors.primary}
        style={{ alignSelf: "center", margin: 10 }}
        onPress={() => {
          fetch("http://localhost:5555/recipes")
            .then((r) => r.json())
            .then((data) => setRecipes(data));
        }}
      />
      {/* <View style={styles.searchContainer}>
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
          <Ionicons
            name="ios-search-outline"
            size={24}
            color={Colors.primary}
          />
        </View>
      </View> */}

      <ScrollView style={styles.container}>
        <View
          style={
            selectedRecipes.length > 0
              ? { marginBottom: 100 }
              : { marginBottom: 25 }
          }
        >
          {CATEGORIES.map((category) => (
            <React.Fragment key={category}>
              {sectionComponent(category)}
            </React.Fragment>
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
    </SafeAreaView>
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
    // backgroundColor: Colors.primary,
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
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "sat-li",
    color: Colors.grey,
    fontSize: 16,
  },
});

export default Page;
