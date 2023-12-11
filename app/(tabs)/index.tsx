import { View, Text } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { Stack } from "expo-router";
// import ExploreHeader from "@/components/ExploreHeader";

const Page = () => {
  const [category, setCategory] = useState("American");
  const onDataChanged = (category: string) => {
    console.log("CHANGED_ ", category);
    setCategory(category);
  };
  const [recipesData, setRecipesData] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <Text>Home</Text>
    </View>
  );
};

export default Page;
