import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../../services/Service";
import type { Product } from "../../models/Product";
import type { Category } from "../../models/Category";
import ProductCard from "../../components/product/cardproduct/ProductCard";
import FilterSidebar from "../../components/filters/FilterSidebar";

export default function Home() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState(false);

    const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        setVisibleCount(24);
    }, [selectedCategory, searchTerm]);

    useEffect(() => {

        async function fetchData() {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);

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

    function handleFilter(category: string) {
        setSelectedCategory(category);
    }

    function handleSearch(term: string) {
        setSearchTerm(term);
    }

    const filteredProducts = allProducts.filter((product) => {
        const matchCategory = selectedCategory
            ? product.category === selectedCategory
            : true;

        const matchSearch = product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchCategory && matchSearch;
    });

    if (error) {
        return <p className="text-center mt-10">Erro ao carregar</p>;
    }

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    return (

        <div className="flex flex-row min-h-screen">

            <aside className="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto bg-white shadow-md">
                {loadingCategories ? (
                    <p className="p-4 text-sm text-gray-400">
                        Carregando filtros...
                    </p>
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
                    <p className="text-center mt-10">
                        Carregando produtos...
                    </p>
                ) : filteredProducts.length === 0 ? (
                    <p className="text-center mt-10 text-gray-500">
                        Nenhum produto encontrado
                    </p>
                ) : (
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                        {visibleProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
                {visibleCount < filteredProducts.length && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + 24)}
                            className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
                        >
                            Carregar mais
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}