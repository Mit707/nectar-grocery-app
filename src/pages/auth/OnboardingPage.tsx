import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/ui/Button";

export function OnboardingPage() {
  const navigate = useNavigate();
  const setOnboarded = useAuthStore((s) => s.setOnboarded);

  const handleGetStarted = () => {
    setOnboarded();
    navigate("/auth/signin");
  };

  return (
    <div className="page-container min-h-screen relative overflow-hidden bg-black">
      {/* Full-screen delivery person photo */}
      <img
        src="/images/on_boarding.png"
        alt="Delivery person with groceries"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Gradient overlay — starts from the lower half */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 via-black/50 to-transparent" />

      {/* White carrot icon — chest level, just above the text block */}
      <div className="absolute bottom-[255px] left-1/2 -translate-x-1/2 w-12 h-14">
        <img src="/icons/white_carrot.svg" alt="" className="w-full h-full" />
      </div>

      {/* Bottom content overlay */}
      <div className="flex flex-col justify-center items-center absolute inset-x-0 bottom-0 px-6 pb-12">
        <h1 className="text-[32px] font-bold text-white mb-2 leading-tight">
          Welcome
          <br />
          to our store
        </h1>
        <p className="text-white/60 text-sm mb-7">
          Ger your groceries in as fast as one hour
        </p>
        <Button
          onClick={handleGetStarted}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
