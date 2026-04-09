import axios from "axios";
import type { Product } from "../models/Product";

const api = axios.create({
    baseURL: "https://dummyjson.com",
});

type ProductsResponse = {
    products: Product[];
};

type CategoryAPI = {
    slug: string;
    name: string;
    url: string;
};

export type Category = {
    slug: string;
    name: string;
};

export async function getProducts(): Promise<Product[]> {
    const { data } = await api.get<ProductsResponse>("/products");
    return data.products;
}

export async function getCategories(): Promise<Category[]> {
    const { data } = await api.get<CategoryAPI[]>("/products/categories");
    return data.map(({ slug, name }) => ({ slug, name }));
}

export async function getByCategory(category: string): Promise<Product[]> {
    const { data } = await api.get<ProductsResponse>(
        `/products/category/${category}`
    );
    return data.products;
}