
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number;
};

const useToast = () => {
  const toast = (props: ToastProps) => {
    sonnerToast(props.title || "", {
      description: props.description,
      action: props.action,
      icon: props.icon,
      duration: props.duration,
    });
  };

  return { toast };
};

// Export the toast function directly for convenience
export const toast = (props: ToastProps) => {
  sonnerToast(props.title || "", {
    description: props.description,
    action: props.action,
    icon: props.icon,
    duration: props.duration,
  });
};

export { useToast };
