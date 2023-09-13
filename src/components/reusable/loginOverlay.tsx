import { useAuth } from "@/authContext";
import { LoginForm } from "@/pages/login/loginForm";
import React from "react";

const LoginOverlay: React.FC = () => {
  const { isLoggedOut } = useAuth();

  if (!isLoggedOut) {
    return null;
  }

  return (
    <div className="login-overlay">
      <LoginForm />
    </div>
  );
};

export default LoginOverlay;
