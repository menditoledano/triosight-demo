import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Apple, Heart } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { signInSchema, SignInFormData } from '@/validations/auth.validation';

export default function SignIn() {
    const { signIn, error: authError, clearError } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const rememberMe = watch('rememberMe');

    const onSubmit = async (data: SignInFormData) => {
        setIsSubmitting(true);
        clearError();

        try {
            await signIn(data);
        } catch (err: unknown) {
            const errorMessage = err && typeof err === 'object' && 'message' in err
                ? String((err as { message: unknown }).message)
                : 'An error occurred during sign in';
            setError('root', { message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[50%] z-10 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("/signup-background.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-mint-500/75 backdrop-blur-[2px]"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-white z-0"></div>

            <div className="absolute top-12 left-12 z-30">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                    Triosight
                </h1>
            </div>

            <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 z-20">
                {/* Welcome Text - Centered Above Form */}
                <div className="text-center mb-8 z-30">
                    <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Welcome!
                    </h2>
                    <p className="text-lg text-white font-medium tracking-normal">
                        Empowering Hearts using ML.
                    </p>
                </div>

                <div className="w-full max-w-[452px] bg-white rounded-[15px] shadow-2xl p-8">
                    <h3 className="text-center text-base font-bold text-[#2D3748] mb-6">
                        Sign in with
                    </h3>

                    <div className="flex justify-center gap-4 mb-6">
                        <button 
                            type="button"
                            className="w-[75px] h-[75px] flex items-center justify-center border border-[#E2E8F0] rounded-[15px] hover:bg-gray-50 transition-colors"
                        >
                            <Mail className="w-8 h-8 text-[#2D3748]" />
                        </button>
                        <button 
                            type="button"
                            className="w-[75px] h-[75px] flex items-center justify-center border border-[#E2E8F0] rounded-[15px] hover:bg-gray-50 transition-colors"
                        >
                            <Apple className="w-8 h-8 text-[#2D3748]" />
                        </button>
                        <button 
                            type="button"
                            className="w-[75px] h-[75px] flex items-center justify-center border border-[#E2E8F0] rounded-[15px] hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24">
                                <path
                                    fill="#2D3748"
                                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="relative text-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#E2E8F0]"></div>
                        </div>
                        <span className="relative bg-white px-4 text-sm text-[#A0AEC0]">
                            or
                        </span>
                    </div>

                    {(errors.root || authError) && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {errors.root?.message || authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[#2D3748] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="Your email address"
                                className={`w-full h-[50px] px-4 border rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent ${
                                    errors.email ? 'border-red-500 bg-red-50' : 'border-[#E2E8F0]'
                                }`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2D3748] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                {...register('password')}
                                placeholder="Your password"
                                className={`w-full h-[50px] px-4 border-2 border-dashed rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-solid focus:border-mint-500 ${
                                    errors.password ? 'border-red-500 bg-red-50' : 'border-mint-500'
                                }`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register('rememberMe')}
                                    className="sr-only"
                                />
                                <div className={`w-10 h-6 rounded-full transition-colors ${
                                    rememberMe ? 'bg-mint-500' : 'bg-gray-300'
                                }`}>
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                                        rememberMe ? 'translate-x-4' : 'translate-x-0.5'
                                    } mt-0.5`}></div>
                                </div>
                                <span className="text-sm text-[#2D3748]">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-[45px] bg-[#354251] text-white text-[10px] font-bold rounded-[12px] hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                        >
                            {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[#A0AEC0]">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-mint-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <footer className="absolute bottom-6 left-0 right-0 z-30">
                <div className="flex items-center justify-center gap-1 mb-3">
                    <span className="text-xs text-gray-500">© 2024, Made with</span>
                    <Heart className="w-3 h-3 text-red-500 fill-current" />
                    <span className="text-xs text-gray-500">by</span>
                    <span className="text-xs text-gray-600 font-medium lowercase">triosight</span>
                </div>
                <div className="flex justify-center gap-6">
                    <Link to="/help" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                        Help
                    </Link>
                    <Link to="/blog" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                        Blog
                    </Link>
                    <Link to="/license" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                        License
                    </Link>
                </div>
            </footer>
        </div>
    );
}