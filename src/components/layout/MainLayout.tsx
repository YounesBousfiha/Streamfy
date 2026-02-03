import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Github, Twitter, Instagram } from 'lucide-react';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#141414] text-white selection:bg-[#e50914] selection:text-white">
            <Navbar />

            {/* Main Content */}
            <main className="relative z-0 w-full min-h-screen">
                <Outlet />
            </main>

            {/* Footer Sleek */}
            <footer className="w-full bg-[#141414] py-16 px-32 text-gray-500 text-sm border-t border-white/5">
                <div className="flex gap-6 mb-8 text-white">
                    <Github className="w-6 h-6 cursor-pointer hover:text-[#e50914] transition-colors" />
                    <Instagram className="w-6 h-6 cursor-pointer hover:text-[#e50914] transition-colors" />
                    <Twitter className="w-6 h-6 cursor-pointer hover:text-[#e50914] transition-colors" />
                </div>

                <div className="grid grid-cols-4 gap-4 text-[13px]">
                    <div className="space-y-3">
                        <p className="hover:underline cursor-pointer">Audio Description</p>
                        <p className="hover:underline cursor-pointer">Investor Relations</p>
                        <p className="hover:underline cursor-pointer">Privacy</p>
                    </div>
                    <div className="space-y-3">
                        <p className="hover:underline cursor-pointer">Help Center</p>
                        <p className="hover:underline cursor-pointer">Jobs</p>
                        <p className="hover:underline cursor-pointer">Legal Notices</p>
                    </div>
                    <div className="space-y-3">
                        <p className="hover:underline cursor-pointer">Gift Cards</p>
                        <p className="hover:underline cursor-pointer">Terms of Use</p>
                        <p className="hover:underline cursor-pointer">Cookie Preferences</p>
                    </div>
                    <div className="space-y-3">
                        <p className="hover:underline cursor-pointer">Media Center</p>
                        <p className="hover:underline cursor-pointer">Contact Us</p>
                    </div>
                </div>

                <button className="border border-gray-500 px-4 py-2 mt-8 hover:text-white hover:border-white text-xs uppercase">
                    Service Code
                </button>

                <p className="mt-4 text-[11px]">© 2026 StreamX, Inc.</p>
            </footer>
        </div>
    );
};