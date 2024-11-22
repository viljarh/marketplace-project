import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { ChevronLeftIcon, CameraIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import {
  BORDER_RADIUS,
  CATEGORIES,
  COLORS,
  FONT_SIZES,
  SPACING,
} from "constants/constants";
import { Product } from "types/types";
import {
  fetchProductById,
  handleUpdatePost,
  uploadImageToFirebase,
} from "firebase/firebase";

export default function EditPostScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [condition, setCondition] = useState("");
  const [openCondition, setOpenCondition] = useState(false);
  const [image, setImage] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProductDetails = async () => {
      if (id && typeof id === "string") {
        try {
          const productData = await fetchProductById(id);
          if (productData) {
            setTitle(productData.title);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category);
            setCondition(productData.condition);
            setImage(productData.imageUrl ? [productData.imageUrl] : []);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
          Alert.alert(
            "Error",
            "Failed to load product details. Please try again.",
          );
        }
      } else {
        console.error("Invalid product ID");
      }
    };
    loadProductDetails();
  }, [id]);

  const categoryItems = CATEGORIES.map((category) => ({
    label: `${category.icon} ${category.name}`,
    value: category.id,
  }));

  const conditions = [
    { label: "New", value: "New" },
    { label: "Used - Good Condition", value: "Used - Good Condition" },
    { label: "Used - Poor Condition", value: "Used - Poor Condition" },
  ];

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProduct = async () => {
    setErrorMessage("");

    if (!title || !description || !price || !category || !condition) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    let imageUrls: string[] = [];
    for (const img of image) {
      if (img.startsWith("http")) {
        imageUrls.push(img);
      } else {
        const url = await uploadImageToFirebase(img);
        imageUrls.push(url);
      }
    }

    if (id && typeof id === "string") {
      try {
        await handleUpdatePost(id, {
          title,
          description,
          price,
          category,
          condition,
          imageUrl: imageUrls[0],
        });
        Alert.alert("Success", "Product updated successfully!");
        router.replace("/");
      } catch (error) {
        console.error("Failed to update product", error);
        setErrorMessage("Failed to update product. Please try again.");
        Alert.alert("Error", "Failed to update product. Please try again.");
      }
    } else {
      console.error("Invalid product ID");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color={COLORS.textSecondary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Post</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (errorMessage) setErrorMessage("");
          }}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (errorMessage) setErrorMessage("");
          }}
          multiline
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          keyboardType="numeric"
          value={price}
          onChangeText={(text) => {
            setPrice(text);
            if (errorMessage) setErrorMessage("");
          }}
        />

        <Text style={styles.label}>Select Category</Text>
        <DropDownPicker
          open={openCategory}
          value={category}
          items={categoryItems}
          setOpen={setOpenCategory}
          setValue={setCategory}
          placeholder="Select a Category"
          style={[styles.dropdown, styles.dropdownSpacing]}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholderStyle={styles.dropdownPlaceholder}
          zIndex={5000}
        />

        <Text style={styles.label}>Condition</Text>
        <DropDownPicker
          open={openCondition}
          value={condition}
          items={conditions}
          setOpen={setOpenCondition}
          setValue={setCondition}
          placeholder="Select Condition"
          style={[styles.dropdown, styles.dropdownSpacing]}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholderStyle={styles.dropdownPlaceholder}
          zIndex={4000}
        />

        <Text style={styles.label}>Images</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <CameraIcon size={24} color="gray" />
          <Text style={styles.uploadButtonText}>Upload Images</Text>
        </TouchableOpacity>

        <ScrollView nestedScrollEnabled style={styles.imageContainer}>
          {image.map((imgUri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: imgUri }} style={styles.image} />
              <TouchableOpacity onPress={() => removeImage(index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.createButton} onPress={updateProduct}>
          <Text style={styles.createButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: COLORS.textSecondary,
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 50,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
    marginBottom: SPACING.small,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.small,
    marginBottom: SPACING.medium,
    backgroundColor: COLORS.secondary,
  },
  dropdown: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.secondary,
    height: 45,
  },
  dropdownSpacing: {
    marginTop: SPACING.small,
    marginBottom: SPACING.medium,
  },
  dropdownContainer: {
    borderColor: COLORS.accent,
  },
  dropdownPlaceholder: {
    color: COLORS.textSecondary,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.small,
    marginBottom: SPACING.medium,
    backgroundColor: COLORS.secondary,
  },
  uploadButtonText: {
    marginLeft: SPACING.small,
    color: COLORS.textSecondary,
  },
  imageContainer: {
    maxHeight: 300,
    marginBottom: SPACING.medium,
  },
  imageWrapper: {
    marginBottom: SPACING.small,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: BORDER_RADIUS.medium,
  },
  removeText: {
    color: COLORS.error,
    marginTop: SPACING.small,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: 12,
    alignItems: "center",
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
  errorMessage: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});
