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
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState(false);
    const [visibleCount, setVisibleCount] = useState(24);

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

    // Bloqueia scroll do body quando o bottom sheet está aberto
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    function handleFilter(category: string) {
        setSelectedCategory(category);
        setSidebarOpen(false);
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
        <div className="flex min-h-screen">

            <aside className="hidden md:block w-64 shrink-0 sticky top-0 h-screen overflow-y-auto">
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

            <main className="flex-1 p-4 md:p-6 pt-6 md:pt-6">

                {loadingProducts ? (
                    <p className="text-center mt-10">Carregando produtos...</p>
                ) : filteredProducts.length === 0 ? (
                    <p className="text-center mt-10 text-gray-500">
                        Nenhum produto encontrado
                    </p>
                ) : (
                    <>
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {visibleProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                        {visibleCount < filteredProducts.length && (
                            <div className="flex justify-center mt-6 mb-24 md:mb-6">
                                <button
                                    onClick={() =>
                                        setVisibleCount((prev) => prev + 24)
                                    }
                                    className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
                                >
                                    Carregar mais
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full shadow-xl text-sm font-medium active:scale-95 transition-transform"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4h18M7 12h10M11 20h2"
                    />
                </svg>
                Filtros
                {selectedCategory && (
                    <span className="bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold leading-none">
                        1
                    </span>
                )}
            </button>

            <div
                className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                    sidebarOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setSidebarOpen(false)}
            />

            <div
                className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
                    sidebarOpen ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-gray-300" />
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-b sticky top-0 bg-white z-10">
                    <h2 className="font-semibold text-base">Filtros</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-400 hover:text-black transition p-1 rounded-full hover:bg-gray-100"
                        aria-label="Fechar filtros"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="p-5 pb-10">
                    {loadingCategories ? (
                        <div className="flex flex-col gap-3">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-9 bg-gray-100 rounded-xl animate-pulse"
                                />
                            ))}
                        </div>
                    ) : (
                        <FilterSidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onFilter={handleFilter}
                            onSearch={handleSearch}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}