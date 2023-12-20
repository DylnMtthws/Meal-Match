import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableOpacityBase,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import DBIngredients from "@/assets/data/ingredients.json";
import { Link } from "expo-router";
import useIngredientStore from "../store/ingredientstore";
import useUniversalRefresh from "@/app/store/refresh";
import SelectDropdown from "react-native-select-dropdown";

const CreateNewRecipe = () => {
  const { ingredientsList, removeIngredient, clearIngredientsList } =
    useIngredientStore();
  const { changeState, state } = useUniversalRefresh();
  const [name, setName] = useState("");
  const handleChange = (text) => {
    setName({
      ...name,
      name: text,
    });
  };

  const handleCategoryChange = (selectedItem, index) => {
    setCategory(selectedItem);
  };

  const [category, setCategory] = useState("");

  const CATEGORIES = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
    "Beverage",
  ];

  const handleSubmit = () => {
    const data = { ...name, category: category };
    fetch("http://localhost:5555/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((recipe) => {
        const recipe_id = recipe.id;

        ingredientsList.forEach((ingredient) => {
          const data = {
            recipe_id,
            ingredient_id: ingredient.id,
          };
          console.log(data);

          fetch("http://localhost:5555/recipe_ingredients", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((r) => r.json());
        });
      })
      .then(() => {
        setName({ name: "" });
        setCategory("");
        clearIngredientsList();
        changeState();
      });
  };

  function handleRemove(ingredient) {
    removeIngredient(ingredient);
  }
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Ionicons
        name="restaurant-outline"
        size={40}
        color={Colors.primary}
        style={{ alignSelf: "center", margin: 10 }}
      />
      <View style={styles.container}>
        <TextInput
          style={[defaultStyles.inputField, { marginBottom: 30 }]}
          placeholder="Enter Meal Name"
          placeholderTextColor="#000"
          onChangeText={handleChange}
          value={name.name}
        />

        <SelectDropdown
          buttonStyle={[styles.btnOutline, { marginBottom: 20, width: 380 }]}
          buttonTextStyle={{
            color: Colors.dark,
            fontFamily: "sat-sb",
            marginLeft: -15,
            fontSize: 16,
          }}
          dropdownStyle={{ borderRadius: 10 }}
          data={CATEGORIES}
          renderDropdownIcon={() => (
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={Colors.dark}
            />
          )}
          onSelect={handleCategoryChange}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />

        <Link
          href={"/ingredient/ingredientslist"}
          asChild
          style={[styles.btnOutline, { marginBottom: 20 }]}
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

        <View style={styles.seperatorView}>
          <View
            style={{
              flex: 1,
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Ionicons style={styles.seperator} name="list-outline" size={40} />
          <View
            style={{
              flex: 1,
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>

        <ScrollView>
          {ingredientsList.length > 0
            ? ingredientsList.map((ingredient) => (
                <View
                  key={ingredient.id}
                  style={[
                    styles.btnOutline,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 35,
                    },
                  ]}
                >
                  <Text style={styles.btnOutlineText}>{ingredient.name}</Text>
                  <Ionicons
                    name="remove-circle-outline"
                    style={[
                      defaultStyles.btnIcon,
                      { marginLeft: 325, color: Colors.red },
                    ]}
                    size={24}
                    onPress={() => handleRemove(ingredient)}
                  />
                </View>
              ))
            : null}
        </ScrollView>

        <View style={styles.absoluteView}>
          {ingredientsList.length > 0 ? (
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={{ fontFamily: "sat-sb", color: "#fff" }}>
                Create
              </Text>
              <Ionicons
                name="paper-plane-outline"
                size={24}
                style={{ marginLeft: 10 }}
                color={"#fff"}
              />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  { alignSelf: "center", marginLeft: 50, marginBottom: 200 },
                ]}
              >
                <Text style={styles.deleteButtonText}>
                  You'll need some ingredients for this meal...
                </Text>
                <Ionicons
                  name="cart-outline"
                  color={Colors.primary}
                  size={24}
                  style={{ marginRight: 50, marginLeft: 15 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
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
    color: Colors.dark,
    fontSize: 16,
    fontFamily: "sat-sb",
  },
  absoluteView: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
    marginLeft: 25,
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
    fontFamily: "mon-sb",
    color: Colors.grey,
    fontSize: 16,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButtonText: {
    color: Colors.dark,
    fontSize: 16,
    fontFamily: "sat-li",
  },
});

export default CreateNewRecipe;
