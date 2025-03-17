import ToastTypeEnum from "./ToastTypeEnum";

export default interface ToastPropsInterface {
  id: string;
  message: string;
  type: ToastTypeEnum;
}