import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

export const Tooltip = ({
  children,
  content,
  position = "top",
  delay = 300,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();

  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Check if it's a touch device
    const touchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchDevice);

    // Cleanup timeouts on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const positions = {
      top: {
        x: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
        y: triggerRect.top - tooltipRect.height - 10,
      },
      right: {
        x: triggerRect.right + 10,
        y: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
      },
      bottom: {
        x: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
        y: triggerRect.bottom + 10,
      },
      left: {
        x: triggerRect.left - tooltipRect.width - 10,
        y: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
      },
    };

    // Ensure tooltip stays within viewport
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let pos = positions[position];

    // Adjust horizontal position if needed
    if (pos.x < 10) pos.x = 10;
    if (pos.x + tooltipRect.width > viewport.width - 10) {
      pos.x = viewport.width - tooltipRect.width - 10;
    }

    // Adjust vertical position if needed
    if (pos.y < 10) pos.y = 10;
    if (pos.y + tooltipRect.height > viewport.height - 10) {
      pos.y = viewport.height - tooltipRect.height - 10;
    }

    setTooltipPosition(pos);
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;

    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => calculatePosition(), 0);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  };

  const handleTouchStart = (e) => {
    if (!isTouchDevice) return;

    e.preventDefault();
    setIsVisible(true);
    setTimeout(() => calculatePosition(), 0);
  };

  const baseClasses = `absolute z-50 px-3 py-1.5 text-sm rounded shadow-lg whitespace-nowrap transition-opacity duration-200 ${
    isDarkMode
      ? "bg-gray-800 text-gray-100"
      : "bg-white text-gray-800 border border-gray-200"
  } ${className}`;

  return (
    <div className="relative inline-flex" onMouseLeave={handleMouseLeave}>
      <div
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
        aria-describedby={isVisible ? "tooltip" : undefined}
      >
        {children}
      </div>

      {isVisible && (
        <div
          id="tooltip"
          role="tooltip"
          ref={tooltipRef}
          className={`${baseClasses} ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            position: "fixed",
          }}
        >
          {content}
          <div
            className={`absolute w-2 h-2 rotate-45 ${
              isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"
            } ${
              position === "top"
                ? "bottom-[-5px] left-1/2 ml-[-4px] border-t-0 border-l-0"
                : position === "right"
                ? "left-[-5px] top-1/2 mt-[-4px] border-r-0 border-t-0"
                : position === "bottom"
                ? "top-[-5px] left-1/2 ml-[-4px] border-b-0 border-r-0"
                : "right-[-5px] top-1/2 mt-[-4px] border-l-0 border-b-0"
            }`}
          />
        </div>
      )}
    </div>
  );
};
