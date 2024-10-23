import React, { useState } from "react";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "react-native-heroicons/outline";

export default function FeedPage() {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row justify-between items-center px-4 mb-4 py-2">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color="gray" />
          <Text className="text-gray-500 ml-1">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleBottomSheet}>
          <FunnelIcon size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <View className="mx-6 mb-4">
        <View className="flex-row items-center bg-gray-100 rounded-lg p-2 border border-gray-300">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            autoCapitalize="none"
            className="ml-2 flex-1"
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <Text className="font-semibold mt-3">Electronics / Computer</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <View key={i} className="w-1/2 p-2">
            <View className="w-full h-40 bg-gray-200 rounded-lg" />
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={isBottomSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleBottomSheet}
      >
        {/* Touchable area outside the bottom sheet to close it */}
        <Pressable style={styles.overlay} onPress={toggleBottomSheet}>
          {/* Empty pressable area to detect touches */}
        </Pressable>
        <View style={styles.bottomSheetView}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalText}>Filters</Text>
            <Button title="Close" onPress={toggleBottomSheet} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  bottomSheetView: {
    justifyContent: "flex-end",  
  },
  bottomSheet: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,      
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: "70%", 
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
