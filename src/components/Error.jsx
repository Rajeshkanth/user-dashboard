import Lottie from "lottie-react";
import ErrorLottie from "../assets/networkError.json";

const Error = ({retry}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-white">
        <Lottie className="w-1/2" animationData={ErrorLottie} loop={true} autoplay={true}/>
        <button className="text-white hover:text-gray-800 hover:bg-white hover:border-red-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center bg-primary focus:ring-red-500 outline" onClick={retry}>Retry</button>
    </div>
  );
};

export default Error;
