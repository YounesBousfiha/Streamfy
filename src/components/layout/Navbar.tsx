import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value);
        if (value.length > 1) {
            navigate(`/search?q=${value}`);
        } else if (value.length === 0) {
            navigate('/');
        }
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-12 py-4 ${
                isScrolled ? 'bg-[#141414] shadow-xl' : 'bg-gradient-to-b from-black/90 to-transparent'
            }`}
        >
            <div className="flex items-center justify-between h-full">

                <div className="flex items-center gap-10">
                    <Link to="/" className="text-[#e50914] text-4xl font-bold uppercase tracking-tighter cursor-pointer hover:scale-105 transition-transform">
                        StreamX
                    </Link>
                    <div className="flex gap-6 text-sm font-medium text-gray-300">
                        <Link to="/" className="hover:text-white transition-colors font-bold">Home</Link>
                        <Link to="/my-list" className="hover:text-white transition-colors">My List</Link>
                        <Link to="/series" className="hover:text-white transition-colors">TV Shows</Link>
                        <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
                        <Link to="/latest" className="hover:text-white transition-colors">New & Popular</Link>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-white">

                    <div className={`flex items-center border border-white/0 transition-all duration-300 ${showSearch ? 'border-white bg-black/80 px-2 py-1' : ''}`}>
                        <Search
                            className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors"
                            onClick={() => {
                                setShowSearch(!showSearch);
                                if (!showSearch) setTimeout(() => inputRef.current?.focus(), 100);
                            }}
                        />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Titres, personnes, genres"
                            className={`bg-transparent border-none text-white text-sm outline-none transition-all duration-300 ease-in-out ${
                                showSearch ? 'w-60 ml-2 opacity-100' : 'w-0 opacity-0'
                            }`}
                            value={searchInput}
                            onChange={handleSearchChange}
                            onBlur={() => !searchInput && setShowSearch(false)}
                        />
                        {searchInput && (
                            <X
                                className="w-4 h-4 cursor-pointer ml-1 text-gray-400 hover:text-white"
                                onClick={() => {
                                    setSearchInput("");
                                    navigate('/');
                                }}
                            />
                        )}
                    </div>
                    {/* ------------------------- */}

                    <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors" />

                    {/* Profile Dropdown */}
                    <div className="group relative flex items-center gap-2 cursor-pointer ml-2">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt="Avatar"
                            className="w-8 h-8 rounded-sm"
                        />
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />

                        <div className="absolute top-full right-0 mt-4 w-48 bg-black/95 border border-white/10 rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white/10"></div>
                            <div className="p-3 border-b border-white/10">
                                <p className="text-xs text-gray-400">Hello,</p>
                                <p className="font-bold truncate text-sm capitalize">{user?.username}</p>
                            </div>
                            <div className="border-t border-white/10">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 p-4 text-sm font-bold text-white hover:underline"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};