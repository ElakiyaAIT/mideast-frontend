import { useEffect, useState, type JSX } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useResetPassword } from '../../hooks/queries';
import { Button, Input } from '../../components';
import { ROUTES } from '../../constants';
import { resetPasswordSchema, type ResetPasswordFormData } from '../../utils/validation';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from '../../i18n';

const ResetPasswordPage = (): JSX.Element | null => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (token) {
      setValue('token', token);
    } else {
      // Redirect to login if no token
      void navigate(ROUTES.LOGIN);
    }
  }, [token, setValue, navigate]);

  const onSubmit = (data: ResetPasswordFormData): void => {
    resetPasswordMutation.mutate(data);
  };

  if (!token) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-500/10 blur-[100px]" />
      </div>
      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="glass-frost rounded-3xl border border-white/40 p-8 shadow-frost-lg dark:border-white/15">
          <div>
            <h2 className="text-gradient-brand mt-6 text-center text-3xl font-extrabold">
              {t('auth.resetPassword.resetYourPassword')}
            </h2>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {t('auth.resetPassword.description')}
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <input type="hidden" {...register('token')} />
              <div>
                <div className="relative">
                  <Input
                    label={t('auth.resetPassword.newPassword')}
                    type={showPassword ? 'text' : 'password'}
                    {...register('newPassword')}
                    error={errors.newPassword?.message}
                    autoComplete="new-password"
                    placeholder={t('auth.resetPassword.passwordPlaceholder')}
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
                {t('auth.resetPassword.passwordRequirements')}
              </p>
            </div>

            <div>
              <Button type="submit" className="w-full" isLoading={resetPasswordMutation.isPending}>
                {t('auth.resetPassword.reset')}
              </Button>
            </div>

            <div className="text-center">
              <Link
                to={ROUTES.LOGIN}
                className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400"
              >
                {t('auth.forgotPassword.backToLogin')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
