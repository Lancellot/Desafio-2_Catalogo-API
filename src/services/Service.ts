import axios from "axios";
import type { Product } from "../models/Product";
import type { Category } from "../models/Category";

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

export async function getCategories(): Promise<Pick<Category, "slug" | "name">[]> {
    const { data } = await api.get<Category[]>("/products/categories");
    return data.map(({ slug, name }) => ({ slug, name }));
}

export async function getByCategory(category: string): Promise<Product[]> {
    const { data } = await api.get<ProductsResponse>(
        `/products/category/${category}`
    );
    return data.products;
}