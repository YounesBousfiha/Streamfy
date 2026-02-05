import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { MyListPage } from './pages/MyListPage';

import { MainLayout } from './components/layout/MainLayout';
import { VideoModal } from './features/movies/components/VideoModal';

// Guards
const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
    const checkSession = useAuthStore((state) => state.checkSession);

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <BrowserRouter>
            <VideoModal />
            <Routes>

                {/* Public Routes (Login/Register) */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Private Routes (Home/List) */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/my-list" element={<MyListPage />} />

                        {/* Fallbacks */}
                        <Route path="/series" element={<HomePage />} />
                        <Route path="/movies" element={<HomePage />} />
                        <Route path="/latest" element={<HomePage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;