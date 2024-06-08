import React, { useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";
const SlideConfirmation= ({
  onConfirm,
}: {
  onConfirm: () => void;
}) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSliderValue(value);
    if (value >= 100) {
      onConfirm();
    }
  };

  return (
    <section className="w-full ">
      <div
        className="confirmation-slider border-t border-gray-300 bg-gray-200 text-center relative p-3"
        style={{ borderRadius: "2rem" }}
      >
        <div className="bg-white border border-gray-300 rounded-full relative flex items-center">
          <input
            type="range"
            value={sliderValue}
            min="0"
            max="100"
            onChange={handleSliderChange}
            className="appearance-none bg-transparent h-14 w-full slider-thumb"
          />
          <div
            className="slider-thumb-text flex items-center ml-2 sm:ml-8"
            style={{
              left: `calc(${sliderValue}% - ${sliderValue / 12.5}rem)`,
              transition: "none",
            }}
          >
            <span className="hidden sm:block mr-1">Slide</span>
            <FaAnglesRight className="text-blue-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlideConfirmation;
