"use client";

export const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          🚧 Coming Soon
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
          We're working hard to bring this feature to life.  
          Stay tuned , exciting updates are on the way!
        </p>

        <div className="animate-pulse">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-primary-600 animate-spin"></div>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Thanks for your patience ❤️
        </p>
      </div>
    </div>
  );
};
