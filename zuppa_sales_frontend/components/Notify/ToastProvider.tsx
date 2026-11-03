import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ToastProvider() {
  return (
    <div data-testid="ToastContainer">
      <ToastContainer />
    </div>
  );
}
