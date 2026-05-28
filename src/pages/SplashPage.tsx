import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function SplashPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isOnboarded } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/home", { replace: true });
      } else if (isOnboarded) {
        navigate("/auth/signin", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, isOnboarded]);

  return (
    <div className="page-container bg-primary flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-3 animate-[fadeSlideIn_0.5s_ease-out]">
        {/* White carrot icon */}
        <img
          src="/icons/white_carrot.svg"
          alt="icon"
          className="w-10 h-12 object-contain"
        />
        {/* Nectar wordmark */}
        <div className="flex flex-col">
          <span className="text-white text-4xl font-semibold tracking-tight leading-none">
            nectar
          </span>
          <span className="text-white text-sm tracking-[0.34em] font-light mt-0.5">
            online groceriet
          </span>
        </div>
      </div>
    </div>
  );
}
