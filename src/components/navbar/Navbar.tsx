import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full flex justify-center py-4 bg-gray-100 text-gray-800 shadow-sm">
            <section className="container flex justify-between text-lg mx-8">
                <Link to="/home" className="text-2xl font-bold text-gray-900">
                    Lorem Ipsum
                </Link>

                <ul className="flex gap-4">
                    <li>
                        <Link to="/lorem" className="hover:text-blue-600 transition-colors">
                            Lorem
                        </Link>
                    </li>

                    <li>
                        <Link to="/ipsum" className="hover:text-blue-600 transition-colors">
                            Ipsum
                        </Link>
                    </li>
                </ul>
            </section>
        </nav>
    );
}