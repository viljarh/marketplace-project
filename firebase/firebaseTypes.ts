import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  category: string;
  condition: string;
  createdAt?: Timestamp | Date;
  description: string;
  price: string;
  title: string;
  imageUrl?: string | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface FavoriteProduct {
  id: string;
  userId: string;
  productId: string;
  title: string;
  imageUrl: string;
  price: string;
}
