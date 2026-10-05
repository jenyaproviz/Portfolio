import React from "react";
import { FiRotateCcw, FiShuffle } from "react-icons/fi";

function ToggleBackgroundColor({ backgroundColor, onChangeColor, onResetColor }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-2">
      <button
        type="button"
        onClick={onChangeColor}
        aria-label="Change background to a random color"
        title="Change background to a random color"
        className="w-16 h-10 flex items-center justify-center rounded-full border border-gray-400 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        style={{
          background: "linear-gradient(120deg, #2563eb, #9333ea, #db2777)",
        }}
      >
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
          style={{ backgroundColor }}
        >
          <FiShuffle className="w-4 h-4" aria-hidden="true" />
        </span>
      </button>
      <button
        type="button"
        onClick={onResetColor}
        aria-label="Restore original background color"
        title="Restore original background color"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 bg-gray-800 text-white shadow-lg hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
      >
        <FiRotateCcw className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default ToggleBackgroundColor;
