import React from 'react';
import { useProgress } from '@react-three/drei';

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-minimal z-50">
      <div className="flex flex-col items-center max-w-xs w-full">
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
          <div 
            className="bg-accent-blue h-1.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Setting up your productive workspace... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default Loader;
