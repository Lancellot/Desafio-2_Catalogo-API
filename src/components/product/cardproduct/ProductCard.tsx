import type { Product } from "../../../models/Product";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-sm ${
                        star <= Math.round(rating)
                            ? "text-amber-400"
                            : "text-gray-300"
                    }`}
                >
                    ★
                </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
        </div>
    );
}

export default function ProductCard({ product }: { product: Product }) {
    const discountPercent = 8;
    const oldPrice = (product.price / (1 - discountPercent / 100)).toFixed(2);

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md hover:border-black transition-shadow">
            <div className="bg-gray-50 flex items-center justify-center h-44 p-3">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full object-contain"
                />
            </div>
            <div className="p-3 flex flex-col gap-2 flex-1">
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full w-fit capitalize">
                    {product.category}
                </span>
                <h2 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                    {product.title}
                </h2>
                <StarRating rating={product.rating} />
                <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-lg font-medium text-green-600">
                        ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                        ${oldPrice}
                    </span>
                    <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                        -{discountPercent}%
                    </span>
                </div>
                <button className="mt-2 w-full py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    );
}