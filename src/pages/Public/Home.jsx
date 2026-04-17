import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">

      <h1 className="text-5xl md:text-6xl font-bold leading-tight">
        Play. Win. <span className="text-primary">Give Back.</span>
      </h1>

      <p className="mt-6 text-gray-400 max-w-xl">
        Track your golf performance, win monthly rewards,
        and support meaningful charities.
      </p>

      <div className="mt-8 flex gap-4">
        <Button onClick={() => navigate("/auth")}>
          Get Started
        </Button>

        <Button onClick={() => navigate("/charities")}>
          View Charities
        </Button>
      </div>

    </div>
  );
}