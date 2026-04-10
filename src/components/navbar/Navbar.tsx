import { Link } from "react-router-dom";
import crown from "../../assets/crown.jpg";

export default function Navbar() {
    return (
        <>
            <nav className="w-full py-4 bg-white text-gray-800 shadow-sm">
                <section className="w-full flex items-center justify-between px-8">
                    <Link to="/home" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                        <img
                            src={crown}
                            alt="Logo Lorem"
                            className="w-16 h-16 object-cover rounded-full"
                        />
                        Lorem Ipsum
                    </Link>

                    <ul className="flex items-center gap-6">
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
        </>
    );
}