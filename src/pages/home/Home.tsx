import { useEffect, useState } from "react";
import { getProducts, getCategories, getByCategory } from "../../services/Service";
import type { Product } from "../../models/Product";
import type { Category } from "../../models/Category";
import ProductCard from "../../components/product/cardproduct/ProductCard";
import FilterSidebar from "../../components/filters/FilterSidebar";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
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
                setLoadingProducts(false);
                setLoadingCategories(false);
            }
        }
        fetchData();
    }, []);

    async function handleFilter(category: string) {
        setSelectedCategory(category);
        setLoadingProducts(true);
        try {
            if (category === "") {
                setProducts(allProducts);
            } else {
                const data = await getByCategory(category);
                setProducts(data);
            }
        } finally {
            setLoadingProducts(false);
        }
    }

    function handleSearch(term: string) {
        const filtered = allProducts.filter((p) =>
            p.title.toLowerCase().includes(term.toLowerCase())
        );
        setProducts(filtered);
    }

    if (error) return <p className="text-center mt-10">Erro ao carregar</p>;

    return (
        <div className="flex flex-row min-h-screen">
            <aside className="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto bg-white shadow-md">
                {loadingCategories ? (
                    <p className="p-4 text-sm text-gray-400">Carregando filtros...</p>
                ) : (
                    <FilterSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onFilter={handleFilter}
                        onSearch={handleSearch}
                    />
                )}
            </aside>

            <main className="flex-1 p-6">
                {loadingProducts ? (
                    <p className="text-center mt-10">Carregando produtos...</p>
                ) : (
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}