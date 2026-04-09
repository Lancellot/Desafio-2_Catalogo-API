import { useState } from "react";

type Props = {
    categories: { slug: string; name: string }[];
    selectedCategory: string;
    onFilter: (category: string) => void;
    onSearch: (term: string) => void;
};

export default function FilterSidebar({ categories = [], selectedCategory, onFilter, onSearch }: Props) {
    const [search, setSearch] = useState("");

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    }

    return (
        <div className="p-4">
            <h2 className="font-bold mb-4">Filtros</h2>
            <input
                type="text"
                placeholder="Buscar produto..."
                value={search}
                onChange={handleSearch}
                className="w-full mb-4 px-3 py-2 border rounded"
            />
            <div className="flex flex-col gap-2">
                <button
                    onClick={() => onFilter("")}
                    className={`text-left px-3 py-2 rounded ${
                        selectedCategory === "" ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                >
                    Todos
                </button>
                {categories.map((cat: { slug: string; name: string }) => (
                    <button
                        key={cat.slug}
                        onClick={() => onFilter(cat.slug)}
                        className={`text-left px-3 py-2 rounded ${
                            selectedCategory === cat.slug ? "bg-blue-500 text-white" : "bg-gray-100"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}