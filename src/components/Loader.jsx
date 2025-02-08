import loader from "../assets/bouncing-circles.svg"

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <img src={loader} alt="loading" className="h-40 w-40" />
    </div>
  );
};

export default Loader;