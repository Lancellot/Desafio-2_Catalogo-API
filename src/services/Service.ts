import axios from "axios";
import type { Product } from "../models/Product";

const api = axios.create({
    baseURL: "https://dummyjson.com",
});

type ProductsResponse = {
    products: Product[];
};

export async function getProducts(): Promise<Product[]> {
    const { data } = await api.get<ProductsResponse>("/products");
    return data.products;
}

export async function getCategories(): Promise<string[]> {
    const { data } = await api.get<string[]>("/products/categories");
    return data;
}

export async function getByCategory(category: string): Promise<Product[]> {
    const { data } = await api.get<ProductsResponse>(
        `/products/category/${category}`
    );
    return data.products;
}