import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import Ingredient from "./ingredient";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import NewIngredient from "./newingredient";
import { useRouter, router } from "expo-router";
import { useStore } from "zustand";
import useIngredientStore from "../store/ingredientstore";

const ingredientslist = () => {
  const { setIngredientsList } = useIngredientStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [ingreData, setIngreData] = useState([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  function addSelected() {
    setIngredientsList(selectedIngredients);
    router.back();
  }

  useEffect(() => {
    fetch("http://localhost:5555/ingredients")
      .then((r) => r.json())
      .then((data) => setIngreData(data));
  }, [refresh]);

  function handleAdd(newIngredient) {
    setSelectedIngredients([...selectedIngredients, newIngredient]);
  }

  function handleRemove(removeIngredient) {
    const filteredIngredients = selectedIngredients.filter((ingredient) => {
      return ingredient.id !== removeIngredient.id;
    });
    setSelectedIngredients(filteredIngredients);
  }

  const searchIngredients = ingreData.filter((ingredient) => {
    return ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  function unique(a, fn) {
    if (a.length === 0 || a.length === 1) {
      return a;
    }
    if (!fn) {
      return a;
    }

    for (let i = 0; i < a.length; i++) {
      for (let j = i + 1; j < a.length; j++) {
        if (fn(a[i], a[j])) {
          a.splice(i, 1);
        }
      }
    }
    return a;
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      {/* <Ionicons
        name="restaurant-outline"
        size={32}
        color={Colors.primary}
        style={{ alignSelf: "center", margin: 10 }}
      /> */}
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
          <Ionicons
            name="ios-search-outline"
            size={24}
            color={Colors.primary}
          />
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 175 }}>
          {searchIngredients.length > 0
            ? unique(
                searchIngredients
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((ingredient) => (
                    <Ingredient
                      key={ingredient.id}
                      ingredient={ingredient}
                      handleAdd={handleAdd}
                      handleRemove={handleRemove}
                    />
                  )),
                (a, b) => a.props.ingredient.id === b.props.ingredient.id
              )
            : unique(
                ingreData
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((ingredient) => (
                    <Ingredient
                      key={ingredient.id}
                      ingredient={ingredient}
                      handleAdd={handleAdd}
                      handleRemove={handleRemove}
                    />
                  )),
                (a, b) => a.props.ingredient.id === b.props.ingredient.id
              )}
        </View>
      </ScrollView>
      {selectedIngredients.length > 0 ? (
        <View style={styles.absoluteView}>
          <TouchableOpacity style={styles.btn} onPress={addSelected}>
            <Text style={{ fontFamily: "sat-sb", color: "#fff" }}>Add</Text>
            <Ionicons
              name="add-circle-outline"
              size={24}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      <NewIngredient setRefresh={setRefresh} refresh={refresh} />
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
    backgroundColor: "#FDFFFF",
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
  absoluteView: {
    position: "absolute",
    bottom: 100,
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

export default ingredientslist;
