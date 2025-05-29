import { tv } from "tailwind-variants";
import { AlertCircle, CheckCircle, X } from "react-feather";
import ToastPropsInterface from "./ToastPropsInterface";
import ToastTypeEnum from "./ToastTypeEnum";

const toastStyles = tv({
  base: "flex items-center max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-md transition-opacity duration-300",
  variants: {
    type: {
      [ToastTypeEnum.SUCCESS]: "border-l-4 border-green-500 text-green-700 bg-green-100",
      [ToastTypeEnum.ERROR]: "border-l-4 border-red-500 text-red-700 bg-red-100",
      [ToastTypeEnum.WARNING]: "border-l-4 border-yellow-500 text-yellow-700 bg-yellow-100",
    },
  },
});

export default function Toast({ message, type, onClose, fading }: ToastPropsInterface & { onClose: () => void; fading?: boolean }) {
  const icons = {
    [ToastTypeEnum.SUCCESS]: <CheckCircle className="w-5 h-5 text-green-500" />,
    [ToastTypeEnum.ERROR]: <X className="w-5 h-5 text-red-500" />,
    [ToastTypeEnum.WARNING]: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  };

  return (
    <div className={`${toastStyles({ type })} ${fading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
      <div className="flex items-center gap-2">
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
