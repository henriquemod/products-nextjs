import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider: React.FC<ToastContainerProps> = (props) => {
  return <ToastContainer {...props} />;
};

export default ToastProvider;
