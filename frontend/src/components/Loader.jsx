import Spinner from "./Spinner";

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center dark:bg-background">
      <Spinner />
    </div>
  );
};

export default Loader;
