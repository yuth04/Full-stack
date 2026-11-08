
import { toast } from "sonner";

export const showToast = {
  // Default
  default: (message: string) => {
    toast(message);
  },

  // Success
  success: (message: string, description?: string) => {
    toast.success(message, { description });
  },

  // Error
  error: (message: string, description?: string) => {
    toast.error(message, { description });
  },

  // Info
  info: (message: string, description?: string) => {
    toast.info(message, { description });
  },

  // Warning
  warning: (message: string, description?: string) => {
    toast.warning(message, { description });
  },

  // Promise
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    return toast.promise(promise, messages);
  },
};
