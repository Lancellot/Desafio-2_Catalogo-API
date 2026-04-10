import { useState } from "react";

type Props = {
    categories: { slug: string; name: string }[];
    selectedCategory: string;
    onFilter: (category: string) => void;
    onSearch: (term: string) => void;
};

export default function FilterSidebar({
    categories = [],
    selectedCategory,
    onFilter,
    onSearch,
}: Props) {
    const [search, setSearch] = useState("");

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    }

    return (
        <div className="h-full flex flex-col p-4 ">
            <h2 className="font-semibold text-lg mb-4">Filtros</h2>

            <input
                type="text"
                placeholder="Buscar produto..."
                value={search}
                onChange={handleSearch}
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => onFilter("")}
                        className={`text-left px-3 py-2 rounded-lg transition ${selectedCategory === ""
                                ? "bg-black text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        Todos
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => onFilter(cat.slug)}
                            className={`text-left px-3 py-2 rounded-lg transition ${selectedCategory === cat.slug
                                    ? "bg-black text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}