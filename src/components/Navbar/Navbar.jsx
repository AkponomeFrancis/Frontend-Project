import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-blue-700 text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    <Link to="/">🎬 Movie App</Link>
                </h2>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-yellow-300">Home</Link>
                    <Link to="/favorites" className="hover:text-yellow-300">Favorites</Link>
                    <Link to="/watchlist" className="hover:text-yellow-300">Watchlist</Link>
                    <Link to="/reviews" className="hover:text-yellow-300">Reviews</Link>
                    <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
                    <Link to="/logout" className="hover:text-yellow-300">Logout</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-600 fixed top-[64px] left-0 w-full z-40" >
                    <Link to="/" className="block hover:text-yellow-300" onClick={toggleMenu}>Home</Link>
                    <Link to="/favorites" className="block hover:text-yellow-300" onClick={toggleMenu}>Favorites</Link>
                    <Link to="/watchlist" className="block hover:text-yellow-300" onClick={toggleMenu}>Watchlist</Link>
                    <Link to="/reviews" className="block hover:text-yellow-300" onClick={toggleMenu}>Reviews</Link>
                    <Link to="/profile" className="block hover:text-yellow-300" onClick={toggleMenu}>Profile</Link>
                    <Link to="/logout" className="block hover:text-yellow-300" onClick={toggleMenu}>Logout</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
