import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import useUniversalRefresh from "@/app/store/refresh";
import GroceryItem from "../groceryitem/groceryitem";
import { ScrollView } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import NewItem from "../groceryitem/newitem";

const GroceryList = () => {
  const [selectionData, setSelectionData] = useState([]);
  const state = useUniversalRefresh((state) => state);
  const [refresh, setRefresh] = useState<number>(0);

  function handleAdd() {
    null;
  }

  useEffect(() => {
    fetch("http://localhost:5555/selections")
      .then((r) => r.json())
      .then((data) => setSelectionData(data));
  }, [state]);

  const handleDeleteAll = () => {
    const deletePromises = selectionData.map((item) =>
      fetch(`http://localhost:5555/selections/${item.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Server error: [${response.status}] [${response.statusText}]`
            );
          }
          return response;
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    );

    Promise.all(deletePromises).then(() => {
      setSelectionData([]);
    });
  };

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

  const groceryList = unique(
    selectionData
      .flatMap((data) => data.recipe.recipe_ingredients)
      .map((item) => item.ingredient),
    (a, b) => a.name.toLowerCase() === b.name.toLowerCase()
  );

  function sectionComponent(category) {
    const list = categorizedItems[category].map((item) => (
      <GroceryItem key={item.id} item={item} />
    ));
    return list.length > 0 ? (
      <>
        {categoryHeader(category)}
        {list}
      </>
    ) : null;
  }

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
    Produce: groceryList.filter((item) => item.category === "Produce"),
    "Meat & Seafood": groceryList.filter(
      (item) => item.category === "Meat & Seafood"
    ),
    Pantry: groceryList.filter((item) => item.category === "Pantry"),
    Frozen: groceryList.filter((item) => item.category === "Frozen"),
    "Snacks & Sweets": groceryList.filter(
      (item) => item.category === "Snacks & Sweets"
    ),
    "Dairy & Eggs": groceryList.filter(
      (item) => item.category === "Dairy & Eggs"
    ),
    Miscellaneous: groceryList.filter(
      (item) => item.category === "Miscellaneous"
    ),
  };

  const CATEGORIES = [
    "Produce",
    "Meat & Seafood",
    "Pantry",
    "Frozen",
    "Snacks & Sweets",
    "Dairy & Eggs",
    "Miscellaneous",
  ];

  // const ogMap = groceryList.map((item) => (
  //   <GroceryItem key={item.id} item={item} />
  // ));

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Ionicons
        name="restaurant-outline"
        size={40}
        color={Colors.primary}
        style={{ alignSelf: "center", margin: 10 }}
        onPress={() => {
          fetch("http://localhost:5555/selections")
            .then((r) => r.json())
            .then((data) => setSelectionData(data));
        }}
      />

      <ScrollView style={styles.container}>
        {CATEGORIES.map((category) => (
          <React.Fragment key={category}>
            {sectionComponent(category)}
          </React.Fragment>
        ))}

        {groceryList.length < 1 ? (
          <View>
            <TouchableOpacity
              style={[
                styles.deleteButton,
                { alignSelf: "center", marginTop: 250, marginLeft: 50 },
              ]}
            >
              <Text style={styles.deleteButtonText}>
                Good luck shopping an empty list!
              </Text>
              <Ionicons
                name="cart-outline"
                color={Colors.primary}
                size={24}
                style={{ marginRight: 50, marginLeft: 25 }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View
              style={{
                flex: 1,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <TouchableOpacity
              style={[
                styles.deleteButton,
                { marginBottom: 50, marginTop: 25, marginLeft: 25 },
              ]}
              onPress={handleDeleteAll}
            >
              <Text style={styles.deleteButtonText}>
                Finished shopping? Click to clear
              </Text>
              <Ionicons
                name="trash-outline"
                color={Colors.red}
                size={32}
                style={{ marginRight: 50 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <NewItem
        refresh={refresh}
        setRefresh={setRefresh}
        handleAdd={handleAdd}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
    marginBottom: 65,
  },
  deleteButton: {
    marginBottom: 20,
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

export default GroceryList;
