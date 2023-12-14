import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

const NewIngredient = ({ setRefresh, refresh }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "30%"], []);
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (text) => {
    setForm({
      ...form,
      name: text,
    });
  };

  const handleSubmit = () => {
    fetch("http://localhost:5555/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then(showIngredients)
      .then(() => setForm({ name: "" }));
  };

  const showIngredients = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <Text style={[styles.bottomHeader, { marginBottom: 15 }]}>
        Don't see what you're looking for?
      </Text>
      <View style={styles.contentContainer}>
        <TextInput
          placeholder="Create a new ingredient"
          placeholderTextColor={Colors.grey}
          style={defaultStyles.inputField}
          value={form.name}
          onChangeText={handleChange}
        />
        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
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
});

export default NewIngredient;
