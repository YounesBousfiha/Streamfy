import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useAuthStore } from '../../../store/authStore';
import { createUser } from '../../../lib/storage';
import type {UserData} from '../../../types';

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        try {
            const newUser: UserData = {
                id: crypto.randomUUID(),
                username: data.username,
                email: data.email,
                password: data.password,
                createdAt: new Date().toISOString(),
                watchlist: [],
                history: []
            };

            createUser(newUser);

            login(newUser);

            navigate('/');

        } catch (err: any) {
            setError('root', { message: err.message || 'Something went wrong' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative">
            <div
                className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center opacity-50"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="relative w-full max-w-md bg-black/75 p-12 rounded-lg border border-white/10 shadow-2xl backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-8">Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Username"
                        placeholder="Ex: YounesDev"
                        {...register('username')}
                        error={errors.username?.message}
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password')}
                        error={errors.password?.message}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                    />

                    {errors.root && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
                            {errors.root.message}
                        </div>
                    )}

                    <Button type="submit" isLoading={isSubmitting} className="mt-6 w-full">
                        Get Started
                    </Button>
                </form>

                <p className="mt-6 text-gray-400 text-sm text-center">
                    Already have an account? <Link to="/login" className="text-white hover:underline font-medium">Sign in now</Link>.
                </p>
            </div>
        </div>
    );
};