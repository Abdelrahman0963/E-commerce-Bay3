"use client";
import { useProducts } from '@/app/hooks/UseProducts';
import Link from 'next/link';
import React from 'react'
import { BsCart3 } from "react-icons/bs";

type Product = {
    id: string;
    title: string;
    description?: string;
    price?: number;
    category?: string;
    location?: string;
    phone?: string;
    images?: { url: string }[];
    slug: string;
};

const WishList = () => {
    const { products: data } = useProducts();
    const [wishlist, setWishlist] = React.useState<string[]>([]);
    const [active, setActive] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const wishlistCount = wishlist.length;
    React.useEffect(() => {
        const loadWishlist = () => {
            const stored = localStorage.getItem("activeProductId");
            if (stored) {
                setWishlist(JSON.parse(stored));
            }
        };

        loadWishlist();

        window.addEventListener("wishlistUpdated", loadWishlist);
        return () => window.removeEventListener("wishlistUpdated", loadWishlist);
    }, []);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);
    return (
        <div ref={dropdownRef} className="relative">
            <nav onClick={() => setActive(!active)} className="flex items-center gap-4 relative cursor-pointer">
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative text-sm flex items-center justify-center">{wishlistCount}</span>
                </span>
                <BsCart3 className="text-2xl cursor-pointer" />
            </nav>
            {active && (
                <div className="absolute h-72 overflow-auto top-10  w-64 bg-white shadow-lg !p-4">
                    <ul className="flex flex-col gap-2">
                        {data?.data.map((product: Product) => {
                            if (wishlist.includes(product.id)) {
                                return (
                                    <li onClick={() => setActive(false)} key={product.id} className="!py-2 flex items-center justify-between border-b border-gray-400">
                                        <Link href={`/product/${product.slug}`}>
                                            <div className="flex items-center cursor-pointer gap-2">
                                                <img
                                                    src={product.images?.[0]?.url ? `http://localhost:1337${product.images[0].url}` : "/fallback.png"}
                                                    alt={product.title}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h2 className="text-sm font-bold">{product.title}</h2>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>

            )}
        </div>
    )
}

export default WishList;
