import { AiOutlineLoading } from "react-icons/ai";
export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <AiOutlineLoading className="text-6xl animate-spin text-purple-800 text-center" />
    </div>
  );
};

export const MiniLoading = () => {
  return (
    <div className="flex items-center justify-center w-full px-4 py-7">
      <AiOutlineLoading className="text-3xl animate-spin text-purple-800 text-center" />
    </div>
  );
};
