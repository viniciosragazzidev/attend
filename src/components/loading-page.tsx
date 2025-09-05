import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <Loader className="w-14 h-14 text-primary animate-spin" />
    </div>
  );
};

export default LoadingPage;
