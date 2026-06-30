export interface Product {
  id: string;
  name: string;
  category: 'anime-figures' | 'trading-cards' | 'comic-books' | 'manga' | 'accessories';
  subCategory?: string; // 'pokemon', 'onepiece', 'mtg', 'weiss-schwarz', 'lorcana', 'digimon', 'rift-bound', 'yugioh', 'banpresto', 'kotobukiya', 'bandai', 'good-smile', 'funko', 'plushies'
  productLine?: string; // e.g. 'Ichibansho', 'Grandline Series', 'Vibration Stars', 'Nendoroid', 'figma', 'POP UP PARADE', 'Funko Pop!', 'S.H.Figuarts', 'Figuarts ZERO', 'ARTFX J', 'Bishoujo Statue'
  language?: 'EN' | 'JP' | 'CN' | 'KR' | 'Other'; // for TCG
  anime?: string; // For figures & plushies
  character?: string; // For search indexing
  franchise?: string; // For search indexing
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
  shippingMethod: 'standard' | 'express' | 'free';
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
