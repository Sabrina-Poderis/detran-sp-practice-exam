import ToastTypeEnum from "@/components/Toast/ToastTypeEnum";

export default interface ToastContextInterface {
    showToast: (type: ToastTypeEnum, message: string) => void;
}