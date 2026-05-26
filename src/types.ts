export interface Product {
  id: string;
  name: string;
  category: 'pokemon-english' | 'pokemon-japanese' | 'onepiece-english' | 'onepiece-japanese' | 'action-fig';
  anime?: string; // for figures
  price: number;
  image: string;
  description: string;
  cardsPerPack?: number;
  releaseYear: string;
  stock: number;
  rating: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express';
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentId: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
}
