export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}
export const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 1200,
    image: "https://picsum.photos/300?1",
    description: "Powerful gaming laptop",
  },
  {
    id: 2,
    name: "Mouse",
    category: "Accessories",
    price: 40,
    image: "https://picsum.photos/300?2",
    description: "Wireless Mouse",
  },
];
