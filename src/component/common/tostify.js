import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SuccessTostify = (msg) => {
  toast.success(msg);
};
export const ErrorTostify = (msg) => {
  toast.error(msg);
};
