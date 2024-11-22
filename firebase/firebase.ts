import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  Auth,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import { Category, FavoriteProduct, Product } from "types/types";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);

export const signUp = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      createdAt: new Date(),
    });
    console.log("User created and saved to FireStore!");

    return user;
  } catch (error) {
    console.error("Error signing up or saving user to firestore:", error);
    return null;
  }
};

export const signIn = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export const onAuthStateChangeListener = (
  callback: (user: User | null) => void,
) => {
  return onAuthStateChanged(auth, callback);
};

export async function fetchProducts(): Promise<Product[]> {
  const productsCollection = collection(db, "products");
  const productsQuery = query(productsCollection);
  const querySnapshot = await getDocs(productsQuery);

  const products: Product[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];

  return products;
}

export async function fetchProductsById(productId: string) {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() };
  } else {
    console.log("No such product");
    return null;
  }
}

export const handleCreatePost = async (
  title: string,
  description: string,
  price: string,
  category: string,
  condition: string,
  imageUrl: string | null,
): Promise<string | null> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User is not authenticated");
  }

  const productData: Omit<Product, "id"> = {
    userId: currentUser.uid, // Include the userId
    title,
    description,
    price,
    category,
    condition,
    createdAt: Timestamp.now(),
    imageUrl,
  };

  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Product created successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

export async function fetchCategories(): Promise<Category[]> {
  const categoriesCollection = collection(db, "categories");
  const categoriesQuery = query(categoriesCollection);
  const querySnapshot = await getDocs(categoriesQuery);

  const categories: Category[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];
  return categories;
}

// export async function fetchProductByCategory(
//   category: string,
// ): Promise<Product[]> {
//   const productRef = collection(db, "products");
//   const q = query(productRef, where("category", "==", category));
//   const querySnapshot = await getDocs(q);
//
//   const products = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as Product[];
//   return products;
// }

export async function fetchProductByCategory(
  category: string,
): Promise<Product[]> {
  const productRef = collection(db, "products");
  const q = query(productRef, where("category", "==", category));
  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? (data.createdAt as Timestamp).toDate() : null,
    };
  }) as Product[];

  return products;
}
export async function fetchCategoriesFromProducts(): Promise<string[]> {
  const productsCollection = collection(db, "products");
  const querySnapshot = await getDocs(productsCollection);

  const categoriesSet = new Set<string>();

  querySnapshot.forEach((doc) => {
    const product = doc.data() as Product;
    if (product.category) {
      categoriesSet.add(product.category);
    }
  });
  return Array.from(categoriesSet);
}

export const uploadImageToFirebase = async (uri: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const imageRef = ref(storage, `images/${uuid.v4()}`);

  await uploadBytes(imageRef, blob);
  const downloadUrl = await getDownloadURL(imageRef);

  return downloadUrl;
};

export const fetchPostsByUser = async (userId: string): Promise<Product[]> => {
  const postsRef = collection(db, "products");
  const q = query(postsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const posts: Product[] = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() } as Product);
  });

  return posts;
};

export const fetchFavorites = async (): Promise<Product[]> => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("No user is signed in.");

  const favoritesQuery = query(
    collection(db, "favorites"),
    where("userId", "==", currentUser.uid),
  );

  const favoritesSnapshot = await getDocs(favoritesQuery);

  const products: Product[] = [];

  for (const favoriteDoc of favoritesSnapshot.docs) {
    const favoriteData = favoriteDoc.data() as FavoriteProduct;

    const productDoc = await getDoc(
      doc(db, "products", favoriteData.productId),
    );

    if (productDoc.exists()) {
      const productData = productDoc.data() as Product;
      products.push({
        ...productData,
        id: productDoc.id,
      });
    }
  }

  return products;
};

export const toggleFavoriteProduct = async (productId: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in to favorite a product");
  }

  const userId = currentUser.uid;
  const favoriteId = `${userId}_${productId}`;
  const favoritesRef = doc(db, "favorites", favoriteId);

  const favoriteDoc = await getDoc(favoritesRef);

  if (favoriteDoc.exists()) {
    await deleteDoc(favoritesRef);
    console.log("Removed from favorites!");
    return false;
  } else {
    await setDoc(favoritesRef, {
      favoriteId: favoriteId,
      userId,
      productId,
    });
    console.log("Added to favorites");
    return true;
  }
};

export const checkIfFavorited = async (productId: string): Promise<boolean> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in to check favorite status");
  }

  const userId = currentUser.uid;
  const favoriteId = `${userId}_${productId}`;
  const favoritesRef = doc(db, "favorites", favoriteId);

  const favoriteDoc = await getDoc(favoritesRef);
  return favoriteDoc.exists();
};

export const reauthenticateUser = async (currentPassword: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser || !currentPassword) {
    throw new Error("Please provide current passowrd for authentication");
  }

  const credential = EmailAuthProvider.credential(
    currentUser.email!,
    currentPassword,
  );
  await reauthenticateWithCredential(currentUser, credential);
};

export const updateUserPassword = async (newPassword: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  await updatePassword(currentUser, newPassword);
};
export { db };
