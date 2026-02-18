import { useState, type JSX } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin, useGoogleSignIn } from '../../hooks/queries';
import { Button, Input } from '../../components';
import { ROUTES } from '../../constants';
import { loginSchema, type LoginFormData } from '../../utils/validation';
import { useTranslation } from '../../i18n';

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const loginMutation = useLogin();
  const googleSignInMutation = useGoogleSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: 'johndoe@email.com',
    },
  });

  const onSubmit = (data: LoginFormData): void => {
    loginMutation.mutate(data);
  };

  const handleGoogleSignIn = (): void => {
    googleSignInMutation.mutate();
  };

  return (
    <div className='relative min-h-screen overflow-hidden bg-white'>
      {/* Header */}
      <header className='absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 lg:px-12'>
        {/* Logo */}
        <div>
          <h1 className='text-3xl font-bold lg:text-4xl' style={{ color: '#FDAD3E' }}>
            MIDEAST
          </h1>
          <p className='text-sm font-semibold uppercase tracking-wide text-gray-600 lg:text-base'>
            EQUIPMENT SUPPLY
          </p>
        </div>

        {/* Contact Us Button */}
        <Link to={ROUTES.CONTACT_US}>
          <Button
            variant='primary'
            size='sm'
            className='rounded-lg font-semibold text-white'
            style={{ backgroundColor: '#000000' }}
          >
            {t('nav.contactUs')}
          </Button>
        </Link>
      </header>

      {/* Background */}
      <div className='absolute inset-0'>
        {/* Upper Background - Industrial Image */}
        <div
          className='absolute left-0 right-0 top-0 h-2/3 bg-cover bg-center'
          style={{
            backgroundImage: `url('images/login-banner.png')`,
            filter: 'sepia(20%) saturate(80%) brightness(90%)',
          }}
        />

        {/* Lower Background - White with Pattern */}
        <div
          className='absolute bottom-0 left-0 right-0 h-2/3 bg-white'
          style={{
            clipPath: 'ellipse(150% 100% at 50% 100%)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className='relative z-10 flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8'>
        {/* Login Card */}
        <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl lg:p-10'>
          {/* Title */}
          <h2 className='mb-8 text-2xl font-bold text-black lg:text-3xl'>
            {t('auth.login.title')}
          </h2>

          {/* Social Login Buttons */}
          <div className='mb-6 space-y-3'>
            <button
              type='button'
              onClick={handleGoogleSignIn}
              disabled={googleSignInMutation.isPending || loginMutation.isPending}
              className='flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-black transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <svg className='h-5 w-5' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='currentColor'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='currentColor'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='currentColor'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              {googleSignInMutation.isPending ? t('common.loading') : t('auth.login.googleSignIn')}
            </button>
          </div>

          {/* Form */}
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                {t('auth.login.email')}
              </label>
              <Input
                type='email'
                {...register('email')}
                error={errors.email?.message}
                autoComplete='email'
                placeholder='johndoe@email.com'
                className='border-gray-300 bg-white text-gray-900'
              />
            </div>

            {/* Password Field */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                {t('auth.login.password')}
              </label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  error={errors.password?.message}
                  autoComplete='current-password'
                  placeholder='**********'
                  className='border-gray-300 bg-white pr-10 text-gray-900'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between'>
              <label className='flex cursor-pointer items-center gap-2'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='h-4 w-4 rounded border-gray-300'
                  style={{ accentColor: '#FDAD3E' }}
                />
                <span className='text-sm text-gray-700'>{t('auth.login.rememberMe')}</span>
              </label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className='text-sm font-medium'
                style={{ color: '#FDAD3E' }}
              >
                {t('auth.login.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full rounded-lg py-3 font-bold text-white'
              isLoading={loginMutation.isPending}
              style={{
                background: 'linear-gradient(to bottom, #FDAD3E, #e89c2a)',
              }}
            >
              {t('auth.login.signIn')}
            </Button>

            {/* Sign Up Link */}
            <p className='text-center text-sm text-gray-600'>
              {t('auth.login.noAccount')}{' '}
              <Link to={ROUTES.REGISTER} className='font-medium' style={{ color: '#FDAD3E' }}>
                {t('auth.login.signUp')}
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className='absolute bottom-0 left-0 right-0 z-20 py-6 text-center'>
        <p className='text-sm text-gray-400'>
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
