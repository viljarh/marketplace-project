export interface Product {
  id: string;
  category: string;
  condition: string;
  createdAt: Date;
  description: string;
  price: string;
  title: string;
}

export interface Category {
  id: string;
  categoryName: string;
}
