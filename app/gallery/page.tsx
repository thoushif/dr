import Link from "next/link";

const WorkInProgress = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl mb-4">Work in Progress</h1>
        <div className="text-3xl mb-6">
          <span role="img" aria-label="Hammer and Wrench">
            🖼️🛠️🔧
          </span>
        </div>
        <p className="text-xl mb-4">
          We're working on it! Please check back later.
        </p>
        <p className="text-lg">
          In the meantime, you can <Link href="/">go to the home page</Link>.
        </p>
      </div>
    </div>
  );
};

export default WorkInProgress;
