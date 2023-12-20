import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import SelectDropdown from "react-native-select-dropdown";

const NewItem = ({ handleAdd }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["7.5%", "35%"], []);
  const [categorySubmit, setCategorySubmit] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });

  function onAdd() {
    data = { ...form, category: category };
    handleAdd(data);
  }

  const handleChange = (text) => {
    setForm({
      ...form,
      name: text,
    });
  };

  const handleCategoryChange = (selectedItem, index) => {
    setCategory(selectedItem);
    setCategorySubmit(true);
  };

  const [category, setCategory] = useState("");

  const CATEGORIES = [
    "Household",
    "Beverages",
    "Personal Care",
    "Produce",
    "Meat & Seafood",
    "Pantry",
    "Frozen",
    "Snacks & Sweets",
    "Dairy & Eggs",
    "Miscellaneous",
  ];

  // const handleSubmit = () => {
  //   const data = { ...form, category: category };
  //   fetch("http://localhost:5555/grocery_items", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((r) => r.json())
  //     .then((data) => console.log(data))
  //     .then(() => {
  //       showIngredients();
  //       setForm({ name: "" });
  //       setCategory("");
  //       setCategorySubmit(false);
  //     });
  // };

  const showIngredients = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <Text style={[styles.bottomHeader, { marginBottom: 15 }]}>
        Forget something? Add it to the list!
      </Text>
      <View style={styles.contentContainer}>
        <TextInput
          placeholder="Create a new item"
          placeholderTextColor={Colors.grey}
          style={[defaultStyles.inputField, { marginBottom: 20 }]}
          value={form.name}
          onChangeText={handleChange}
        />
        <SelectDropdown
          buttonStyle={[styles.btnOutline, { width: 378 }]}
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
            if (categorySubmit) {
              return selectedItem;
            } else return "Select an option";
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText="Select an option"
        />
        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={() => handleAdd()} style={styles.btn}>
            <Text style={{ fontFamily: "sat-sb", color: "#fff" }}>Create</Text>
            <Ionicons
              name="paper-plane-outline"
              size={20}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 26,
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
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "sat-b",
    color: Colors.dark,
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
});

export default NewItem;
