import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';

type Props = {
  open: boolean;
};

const LoginRequiredModal = ({ open }: Props) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[400px] rounded-2xl bg-white p-6 text-center shadow-xl">
        <h2 className="mb-3 text-xl font-bold">Login Required</h2>

        <p className="mb-6 text-gray-600">Kindly login with your login credentials</p>

        <button
          onClick={() => navigate(ROUTES.LOGIN)}
          className="w-full rounded-full bg-primary py-3 font-bold text-white hover:bg-orange-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
