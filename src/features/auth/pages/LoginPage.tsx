import {z} from "zod";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../../store/authStore.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {findUserByEmail} from "../../../lib/storage.ts";
import {Button} from "../../../components/ui/Button.tsx";
import {Input} from "../../../components/ui/Input.tsx";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required")
});

type LoginForm = z.infer<typeof loginSchema>;


export const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const { register, handleSubmit, formState: { errors, isSubmitting}, setError} = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const user = findUserByEmail(data.email);

            if(!user || user.password !== data.password) {
                throw new Error("Invalid email or password");
            }

            login(user);

            navigate('/');
        } catch (err: any) {
            setError('root', { message: err.message});
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative">
            <div
                className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center opacity-50"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="relative w-full max-w-md bg-black/75 p-12 rounded-lg border border-white/10 shadow-2xl backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-8">Sign In</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Email"
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

                    {errors.root && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
                            {errors.root.message}
                        </div>
                    )}

                    <Button type="submit" isLoading={isSubmitting} className="mt-4 w-full">
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-gray-400 text-sm">
                    <p>
                        New to StreamX? <Link to="/register" className="text-white hover:underline font-medium">Sign up now</Link>.
                    </p>
                    <p className="mt-4 text-xs text-gray-500">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                    </p>
                </div>
            </div>
        </div>
    );
}