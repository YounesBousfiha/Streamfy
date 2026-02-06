import {useAuthStore} from "../store/authStore.ts";
import {useWatchlistStore} from "../store/watchListStore.ts";
import {useNavigate} from "react-router-dom";
import {BarChart3, CreditCard, LogOut, User} from "lucide-react";

export const ProfilePage = () => {
    const { user, logout } = useAuthStore();
    const { watchlist } = useWatchlistStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const joinDate = "Octobre 2025";
    const nextBilling = "25 Février 2026";

    return (
        <div className="min-h-screen bg-[#141414] text-white pt-32 px-4 md:px-20 pb-20">

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 border-b border-gray-700 pb-4">Compte</h1>

                {/* SECTION 1: DETAILS DU COMPTE */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

                    <div className="md:col-span-1 flex flex-col items-center text-center p-6 bg-[#181818] rounded-lg border border-white/10">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt="Profile"
                            className="w-32 h-32 rounded mb-4"
                        />
                        <h2 className="text-2xl font-bold">{user?.username || "Utilisateur"}</h2>
                        <p className="text-gray-400 text-sm mb-6">{user?.email || "email@exemple.com"}</p>

                        <button
                            onClick={handleLogout}
                            className="w-full py-2 border border-gray-600 hover:border-white hover:bg-white/10 transition text-white font-medium rounded flex items-center justify-center gap-2"
                        >
                            <LogOut className="w-4 h-4" /> Déconnexion
                        </button>
                    </div>

                    {/* Account Stats & Plan */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Plan Info */}
                        <div className="bg-gradient-to-r from-red-900/20 to-[#181818] p-6 rounded-lg border border-red-500/30 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">Votre Plan</p>
                                <h3 className="text-2xl font-black flex items-center gap-2">
                                    PREMIUM 4K <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded uppercase">Actif</span>
                                </h3>
                            </div>
                            <CreditCard className="w-10 h-10 text-gray-400" />
                        </div>

                        {/* Grid Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#181818] p-5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3 mb-2 text-gray-400">
                                    <BarChart3 className="w-5 h-5 text-[#46d369]" />
                                    <span className="text-sm font-medium">Ma Liste</span>
                                </div>
                                <p className="text-3xl font-bold">{watchlist.length}</p>
                                <p className="text-xs text-gray-500 mt-1">Titres sauvegardés</p>
                            </div>

                            <div className="bg-[#181818] p-5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3 mb-2 text-gray-400">
                                    <User className="w-5 h-5 text-blue-400" />
                                    <span className="text-sm font-medium">Membre depuis</span>
                                </div>
                                <p className="text-xl font-bold">{joinDate}</p>
                                <p className="text-xs text-gray-500 mt-1">Prochaine facture: {nextBilling}</p>
                            </div>
                        </div>

                        {/* Settings Links (Dummy) */}
                        <div className="bg-[#181818] p-6 rounded-lg border border-white/5 space-y-4 text-gray-300">
                            <div className="flex justify-between cursor-pointer hover:text-white transition">
                                <span>Changer l'adresse e-mail</span>
                                <span className="text-blue-500 text-sm">Modifier</span>
                            </div>
                            <div className="w-full h-[1px] bg-gray-700"></div>
                            <div className="flex justify-between cursor-pointer hover:text-white transition">
                                <span>Changer le mot de passe</span>
                                <span className="text-blue-500 text-sm">Modifier</span>
                            </div>
                            <div className="w-full h-[1px] bg-gray-700"></div>
                            <div className="flex justify-between cursor-pointer hover:text-white transition">
                                <span>Paramètres de lecture</span>
                                <span className="text-blue-500 text-sm">Modifier</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}