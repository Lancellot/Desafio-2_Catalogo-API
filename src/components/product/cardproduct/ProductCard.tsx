import type { Product } from "../../../models/Product";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 object-contain"
            />

            <h2 className="mt-4 font-semibold text-sm line-clamp-2">
                {product.title}
            </h2>

            <span className="mt-2 text-lg font-bold text-green-600">
                ${product.price}
            </span>
        </div>
    );
}