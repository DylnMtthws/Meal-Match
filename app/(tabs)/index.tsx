import { View, Text, SafeAreaView } from "react-native";
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

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Ionicons
        name="restaurant-outline"
        size={40}
        color={Colors.primary}
        style={{ alignSelf: "center", margin: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;
