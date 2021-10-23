import { AiOutlineLoading } from "react-icons/ai";
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <AiOutlineLoading className="text-6xl animate-spin text-purple-800 text-center" />
    </div>
  );
};

export default Loading;
