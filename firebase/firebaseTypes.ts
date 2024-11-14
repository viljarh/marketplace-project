export interface Product {
  id: string;
  category: string;
  condition: string;
  createdAt: Date;
  description: string;
  price: string;
  title: string;
  imageUrl?: string | null;
}

export interface Category {
  id: string;
  name: string;
}
