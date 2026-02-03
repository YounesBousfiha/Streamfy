import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-12 py-4 ${
                isScrolled ? 'bg-[#141414] shadow-xl' : 'bg-gradient-to-b from-black/90 to-transparent'
            }`}
        >
            <div className="flex items-center justify-between h-full">

                {/* Left Side: Logo + Links */}
                <div className="flex items-center gap-10">
                    <Link to="/" className="text-[#e50914] text-4xl font-bold uppercase tracking-tighter cursor-pointer hover:scale-105 transition-transform">
                        StreamX
                    </Link>

                    <div className="flex gap-6 text-sm font-medium text-gray-300">
                        <Link to="/" className="hover:text-white transition-colors font-bold">Home</Link>
                        <Link to="/series" className="hover:text-white transition-colors">TV Shows</Link>
                        <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
                        <Link to="/latest" className="hover:text-white transition-colors">New & Popular</Link>
                        <Link to="/my-list" className="hover:text-white transition-colors">My List</Link>
                    </div>
                </div>

                {/* Right Side: Icons & Profile */}
                <div className="flex items-center gap-6 text-white">
                    <Search className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors" />
                    <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors" />

                    {/* Profile Dropdown */}
                    <div className="group relative flex items-center gap-2 cursor-pointer ml-2">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt="Avatar"
                            className="w-8 h-8 rounded-sm"
                        />
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />

                        {/* The Dropdown Menu */}
                        <div className="absolute top-full right-0 mt-4 w-48 bg-black/95 border border-white/10 rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            {/* Arrow up pointing to avatar */}
                            <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white/10"></div>

                            <div className="p-3 border-b border-white/10">
                                <p className="text-xs text-gray-400">Hello,</p>
                                <p className="font-bold truncate text-sm capitalize">{user?.username}</p>
                            </div>

                            <ul className="py-2">
                                <li className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:underline">
                                    Account
                                </li>
                                <li className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:underline">
                                    Help Center
                                </li>
                            </ul>

                            <div className="border-t border-white/10">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 p-4 text-sm font-bold text-white hover:underline"
                                >
                                    Sign out of StreamX
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};