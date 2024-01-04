import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      toastOptions={{
        className: "",
        style: {
          border: "1px solid #3B82F6",
          padding: "10px 16px",
          color: "white",
          backgroundColor:"black",
        },
        iconTheme: {
            primary: '#3B82F6',
            secondary: 'white',
          },
      }}
    />
  );
};

export default Toast;
