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
} from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Category, Product } from "./firebaseTypes";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

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
): Promise<string | null> => {
  const productData: Omit<Product, "id"> = {
    title,
    description,
    price,
    category,
    condition,
    createdAt: Timestamp.now().toDate(),
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

export async function fetchProductsByCategory(
  categoryId: string,
): Promise<Product[]> {
  const productRef = collection(db, "products");
  const q = query(productRef, where("category", "==", categoryId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

export { db };
