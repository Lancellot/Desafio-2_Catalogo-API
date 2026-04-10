import type { Product } from "../../../models/Product";

function StarRating({ rating }: { rating: number}) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-xs leading-none ${
                        star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"
                    }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default function ProductCard({ product }: { product: Product }) {
    const discountPercent = 8;
    const oldPrice = (product.price / (1 - discountPercent / 100)).toFixed(2);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-300 cursor-pointer">
            
            <div className="bg-gray-50 flex items-center justify-center h-44 p-3 relative">
                <span className="absolute top-2.5 left-2.5 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full capitalize font-medium">
                    {product.category}
                </span>
                <img
                    src={product.thumbnail}
                    alt={`${product.title} — ${product.category}`}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                        e.currentTarget.src = "/fallback-product.png";
                    }}
                />
            </div>

            <div className="p-3 flex flex-col gap-2 flex-1">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                    {product.title}
                </h2>

                <StarRating rating={product.rating}/>

                <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-base font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                        ${oldPrice}
                    </span>
                    <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-md font-medium">
                        -{Math.round(discountPercent)}%
                    </span>
                </div>

                <button
                    className="mt-1 w-full py-2 text-sm font-medium rounded-xl bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.98] transition-all"
                    aria-label={`Adicionar ${product.title} ao carrinho`}
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    );
}