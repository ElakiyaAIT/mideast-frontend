import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRegister } from '../../hooks/queries';
import { Button, Input } from '../../components';
import { ROUTES } from '../../constants';
import { registerSchema, type RegisterFormData } from '../../utils/validation';
import { useState, type JSX } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from '../../i18n';

const RegisterPage = (): JSX.Element => {
  const { t } = useTranslation();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterFormData): void => {
    registerMutation.mutate(data);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="glass-frost rounded-3xl border border-white/40 p-8 shadow-frost-lg dark:border-white/15">
          <div>
            <h2 className="text-gradient-brand mt-6 text-center text-3xl font-extrabold">
              {t('auth.register.createYourAccount')}
            </h2>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {t('common.or')}{' '}
              <Link
                to={ROUTES.LOGIN}
                className="font-medium text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400"
              >
                {t('auth.register.signInExisting')}
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t('auth.register.firstName')}
                  type="text"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                  autoComplete="given-name"
                  placeholder={t('auth.register.firstName')}
                />
                <Input
                  label={t('auth.register.lastName')}
                  type="text"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                  autoComplete="family-name"
                  placeholder={t('auth.register.lastName')}
                />
              </div>
              <div>
                <Input
                  label={t('auth.register.email')}
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  autoComplete="email"
                  placeholder={t('auth.register.emailPlaceholder')}
                />
              </div>
              <div>
                <div className="relative">
                  <Input
                    label={t('auth.register.password')}
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={errors.password?.message}
                    autoComplete="new-password"
                    placeholder={t('auth.register.passwordPlaceholder')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('auth.register.passwordRequirements')}
              </p>
            </div>

            <div>
              <Button type="submit" className="w-full" isLoading={registerMutation.isPending}>
                {t('auth.register.createAccount')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
