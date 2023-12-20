import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
} from "react-native";
import Icon from "react-native-ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState, useEffect } from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
// import ExploreHeader from "@/components/ExploreHeader";

const Page = () => {
  const [category, setCategory] = useState("American");
  const onDataChanged = (category: string) => {
    console.log("CHANGED_ ", category);
    setCategory(category);
  };
  const [recipesData, setRecipesData] = useState([]);
  const actions = [
    { description: "Create new meals", iconName: "create-outline" },
    {
      description: "Pick your weekly menu",
      iconName: "ios-checkmark",
    },
    { description: "Shop", iconName: "ios-cart" },
  ];

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Ionicons
        name="restaurant-outline"
        size={40}
        color={Colors.primary}
        style={{ alignSelf: "center", margin: 10 }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "meal-match",
            fontSize: 60,
            margin: 20,
            color: Colors.primary,
          }}
        >
          Meal Match
        </Text>
        <FlatList
          data={actions}
          keyExtractor={(item) => item.description}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Ionicons name={item.iconName} size={20} color={Colors.primary} />
              <Text
                style={{ fontSize: 20, marginLeft: 10, fontFamily: "sat-b" }}
              >
                {item.description}
              </Text>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          const url = "https://www.allrecipes.com/";
          Linking.canOpenURL(url)
            .then((supported) => {
              if (!supported) {
                console.log("Can't handle url: " + url);
              } else {
                return Linking.openURL(url);
              }
            })
            .catch((err) => console.error("An error occurred", err));
        }}
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 0,
          marginBottom: 15,
          marginHorizontal: 6,
          paddingBottom: 8,
        }}
      >
        <View style={{ alignItems: "center", margin: 10 }}>
          <Image
            source={require("@/assets/images/recipes.jpg")}
            style={{
              width: 400,
              height: 125,
              borderRadius: 20,
            }}
          />
          <Text
            style={{
              marginTop: 20,
              fontFamily: "sat",
              color: Colors.dark,
              fontSize: 16,
            }}
          >
            Explore new recipes
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL("http://maps.apple.com/?q=grocery%20stores")
        }
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 0,
          marginBottom: 15,
          marginHorizontal: 6,
          paddingBottom: 8,
        }}
      >
        <View style={{ alignItems: "center", margin: 10 }}>
          <Image
            source={require("@/assets/images/grocerystore.jpg")}
            style={{ width: 400, height: 125, borderRadius: 20 }}
          />
          <Text
            style={{
              marginTop: 20,
              fontFamily: "sat",
              color: Colors.dark,
              fontSize: 16,
            }}
          >
            Find a store near you
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Page;
