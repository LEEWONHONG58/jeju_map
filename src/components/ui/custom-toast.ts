
import { toast } from 'sonner';

// Simple wrapper to ensure consistent toast usage across the app
export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warning(message)
};

// Export sonner toast for direct usage
export { toast } from 'sonner';
