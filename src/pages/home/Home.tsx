import { useEffect, useState } from "react";
import {
    getProducts,
    getCategories,
    getByCategory,
} from "../../services/Service";
import type { Product } from "../../models/Product";
import ProductCard from "../../components/product/cardproduct/ProductCard";
import FilterSidebar from "../../components/filters/FilterSidebar";
import type { Category } from "../../models/Category";

const [categories, setCategories] = useState<Category[]>([]);

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);

                setProducts(productsData);
                setAllProducts(productsData);
                setCategories(categoriesData);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    async function handleFilter(category: string) {
        setSelectedCategory(category);
        setLoading(true);

        try {
            if (category === "") {
                setProducts(allProducts);
            } else {
                const data = await getByCategory(category);
                setProducts(data);
            }
        } finally {
            setLoading(false);
        }
    }

    function handleSearch(term: string) {
        const filtered = allProducts.filter((p) =>
            p.title.toLowerCase().includes(term.toLowerCase())
        );
        setProducts(filtered);
    }

    if (loading) return <p className="text-center mt-10">Carregando...</p>;
    if (error) return <p className="text-center mt-10">Erro ao carregar</p>;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-6">

                <FilterSidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onFilter={handleFilter}
                    onSearch={handleSearch}
                />

                <div className="flex-1 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}