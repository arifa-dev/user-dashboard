"use client";
import React from "react";

interface ChartTabProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function ChartTab({ options, selected, onChange }: ChartTabProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      {options.map((option) => {
        const isActive = selected === option;
        return (
          <button
            key={option}
            className={`px-4 py-1 rounded-lg font-medium text-sm transition-all
              ${isActive ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
                         : "text-gray-500 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-white/5"}`}
            onClick={() => onChange(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        );
      })}
    </div>
  );
}
