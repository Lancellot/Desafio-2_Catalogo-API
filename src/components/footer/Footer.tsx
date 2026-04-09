import { Link } from "react-router-dom";
import {
    GithubLogoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">

                    <section className="flex flex-col items-center lg:items-start">
                        <header className="flex items-center gap-3 mb-4">
                            <img src="http://localhost:5173/vite.svg" alt="Logo Lorem" className="w-16 h-16 sm:w-20 sm:h-20" />
                            <div>
                                <h2 className="font-extrabold text-2xl sm:text-3xl text-gray-900">LOREM</h2>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium">Lorem ipsum</p>
                            </div>
                        </header>

                        <p className="text-sm text-gray-600 text-center lg:text-left mb-4 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>

                        <nav aria-label="Redes sociais" className="flex space-x-4">
                            <a href="#" className="bg-white hover:bg-blue-100 p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-sm">
                                <InstagramLogoIcon className="w-5 h-5 text-gray-700" />
                            </a>
                            <a href="#" className="bg-white hover:bg-blue-100 p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-sm">
                                <GithubLogoIcon className="w-5 h-5 text-gray-700" />
                            </a>
                            <a href="#" className="bg-white hover:bg-blue-100 p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-sm">
                                <LinkedinLogoIcon className="w-5 h-5 text-gray-700" />
                            </a>
                        </nav>
                    </section>

                    <nav className="flex flex-col items-center lg:items-start" aria-label="Links rápidos">
                        <h2 className="font-bold text-base sm:text-lg mb-4 text-gray-900">Links</h2>
                        <ul className="flex flex-col gap-2.5 text-center lg:text-left">
                            <li><Link to="/" className="text-sm sm:text-base text-gray-600 hover:text-blue-600">Home</Link></li>
                            <li><Link to="/" className="text-sm sm:text-base text-gray-600 hover:text-blue-600">Produtos</Link></li>
                            <li><Link to="/" className="text-sm sm:text-base text-gray-600 hover:text-blue-600">Categorias</Link></li>
                            <li><Link to="/" className="text-sm sm:text-base text-gray-600 hover:text-blue-600">Sobre</Link></li>
                        </ul>
                    </nav>

                    <section className="flex flex-col items-center lg:items-start">
                        <h2 className="font-bold text-base sm:text-lg mb-4 text-gray-900">Contato</h2>

                        <address className="not-italic flex flex-col gap-3 text-center lg:text-left">
                            <a href="mailto:lorem@ipsum.com" className="flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-600">
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                lorem@ipsum.com
                            </a>

                            <a href="tel:0000000000" className="flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-600">
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                (00) 0000-0000
                            </a>

                            <p className="flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base text-gray-600">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                Lorem ipsum
                            </p>
                        </address>
                    </section>

                    <section className="flex flex-col items-center lg:items-start">
                        <h2 className="font-bold text-base sm:text-lg mb-4 text-gray-900">Parceiros</h2>

                        <figure className="bg-white rounded-xl p-4 hover:bg-gray-200 transition-all duration-200 shadow-sm">
                            <img src="http://localhost:5173/vite.svg" alt="Parceiro Lorem" className="h-10 sm:h-12 w-auto object-contain" />
                        </figure>

                        <p className="text-xs sm:text-sm text-gray-500 mt-3 text-center lg:text-left">
                            Lorem ipsum dolor sit amet
                        </p>
                    </section>

                </div>

                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-300">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
                        <p className="text-center sm:text-left">
                            &copy; {new Date().getFullYear()} Lorem ipsum dolor sit amet.
                        </p>

                        <nav aria-label="Legal">
                            <ul className="flex gap-4 sm:gap-6">
                                <li><Link to="/privacidade" className="hover:text-blue-600">Privacidade</Link></li>
                                <li><Link to="/termos" className="hover:text-blue-600">Termos</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>
        </footer>
    );
}