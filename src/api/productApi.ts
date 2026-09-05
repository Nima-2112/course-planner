// ---------- API ----------

import api from "./axios";
import type { Product } from "../interfaces/Product";

// ---------- IMPORTS ----------

import type { CreateProductInput } from "../interfaces/Product";

// ---------- GET PRODUCTS ----------

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>("/products");

  return response.data;
}

// ---------- GET PRODUCT BY ID ----------

export async function getProductById(id: number): Promise<Product> {
  try {
    const response = await api.get<Product>(`/products/${id}`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);

    throw new Error("Unable to load product");
  }
}

// ---------- CREATE PRODUCT ----------

export async function createProduct(
  product: CreateProductInput,
): Promise<Product> {
  const response = await api.post<Product>("/products", product);

  return response.data;
}

// ---------- DELETE PRODUCT ----------

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};

// ---------- FAVORITE API ----------

export const addFavorite = async (productId: number) => {
  const response = await api.post(`/favorites`, {
    productId,
  });

  return response.data;
};

export const removeFavorite = async (productId: number) => {
  const response = await api.delete(`/favorites/${productId}`);

  return response.data;
};
