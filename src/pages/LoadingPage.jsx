import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const LoadingPage = ({ message = "Loading..." }) => {
  const { isDarkMode } = useTheme();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [showText, setShowText] = useState(false);
  const canvasRef = useRef(null);
  const requestRef = useRef();

  // Simulate loading phases
  useEffect(() => {
    let interval;

    if (loadingProgress < 100) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          // Simulate different loading speeds in different phases
          const increment =
            Math.random() *
            (loadingPhase === 0 ? 2 : loadingPhase === 1 ? 1 : 0.5);
          const nextProgress = Math.min(prev + increment, 100);

          // Update phase based on progress
          if (nextProgress > 70 && loadingPhase < 2) {
            setLoadingPhase(2);
          } else if (nextProgress > 30 && loadingPhase < 1) {
            setLoadingPhase(1);
          }

          return nextProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [loadingProgress, loadingPhase]);

  // Show text after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: isDarkMode
          ? `rgba(${99 + Math.random() * 50}, ${102 + Math.random() * 50}, ${
              241 + Math.random() * 14
            }, ${Math.random() * 0.3 + 0.1})`
          : `rgba(${79 + Math.random() * 40}, ${70 + Math.random() * 40}, ${
              229 + Math.random() * 26
            }, ${Math.random() * 0.2 + 0.05})`,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        sinOffset: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Add sine wave movement
        p.y += Math.sin(Date.now() * 0.001 + p.sinOffset) * 0.3;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode]);

  // Loading text phrases that change as loading progresses
  const getLoadingText = () => {
    if (loadingProgress < 30) {
      return "Initializing...";
    } else if (loadingProgress < 60) {
      return "Processing data...";
    } else if (loadingProgress < 85) {
      return "Preparing interface...";
    } else {
      return "Almost there...";
    }
  };

  // SVG animation properties for the AI brain logo
  const brainPathVariants = {
    initial: {
      pathLength: 0,
      pathOffset: 1,
      opacity: 0,
    },
    animate: {
      pathLength: 1,
      pathOffset: 0,
      opacity: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0.5,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [0.95, 1.05, 0.95],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const logoContainerVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 60,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const bubbleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i) => ({
      opacity: [0, 0.8, 0],
      scale: [0, 1, 1.5],
      y: -60 * i,
      transition: {
        duration: 2,
        delay: i * 0.6,
        repeat: Infinity,
        repeatDelay: 3 - i * 0.6,
      },
    }),
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isDarkMode
            ? "from-gray-900/70 via-gray-800/50 to-indigo-900/20"
            : "from-white/80 via-gray-100/50 to-indigo-100/20"
        }`}
      />

      <div className="relative z-10 w-full max-w-md px-4 text-center">
        {/* Animated AI brain logo */}
        <motion.div
          className="relative flex justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative"
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute -inset-12 rounded-full opacity-20"
              variants={pulseVariants}
              animate="animate"
              style={{
                background: `radial-gradient(circle, ${
                  isDarkMode
                    ? "rgba(99, 102, 241, 0.3)"
                    : "rgba(79, 70, 229, 0.2)"
                } 0%, transparent 70%)`,
              }}
            />

            <div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0"
                variants={logoContainerVariants}
                initial="initial"
                animate="animate"
              >
                <div className="absolute h-2 w-2 rounded-full bg-indigo-400 left-2 top-1/2" />
                <div className="absolute h-2 w-2 rounded-full bg-indigo-300 right-4 top-6" />
                <div className="absolute h-2 w-2 rounded-full bg-indigo-500 right-8 bottom-8" />
              </motion.div>

              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-full h-full ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {/* Brain outline */}
                <motion.path
                  d="M100 20C56.2 20 20 56.2 20 100C20 143.8 56.2 180 100 180C143.8 180 180 143.8 180 100C180 56.2 143.8 20 100 20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={1}
                />
                {/* Brain connections */}
                <motion.path
                  d="M160 100C160 132.5 132.5 160 100 160"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={2}
                />
                <motion.path
                  d="M40 100C40 67.5 67.5 40 100 40"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={3}
                />
                <motion.path
                  d="M100 40V160"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={4}
                />
                <motion.path
                  d="M40 100H160"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={5}
                />
                {/* Neural network nodes */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="5"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                <motion.circle
                  cx="70"
                  cy="70"
                  r="4"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                <motion.circle
                  cx="130"
                  cy="70"
                  r="4"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                <motion.circle
                  cx="70"
                  cy="130"
                  r="4"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                <motion.circle
                  cx="130"
                  cy="130"
                  r="4"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 3,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                {/* Connection lines */}
                <motion.path
                  d="M100 100L70 70"
                  stroke="currentColor"
                  strokeWidth="1"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={6}
                />
                <motion.path
                  d="M100 100L130 70"
                  stroke="currentColor"
                  strokeWidth="1"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={7}
                />
                <motion.path
                  d="M100 100L70 130"
                  stroke="currentColor"
                  strokeWidth="1"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={8}
                />
                <motion.path
                  d="M100 100L130 130"
                  stroke="currentColor"
                  strokeWidth="1"
                  variants={brainPathVariants}
                  initial="initial"
                  animate="animate"
                  custom={9}
                />
              </svg>

              {/* Animated bubbles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                    isDarkMode ? "bg-indigo-400" : "bg-indigo-500"
                  }`}
                  style={{ top: "50%", opacity: 0 }}
                  variants={bubbleVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <AnimatePresence mode="wait">
          {showText && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key={getLoadingText()}
            >
              <motion.h2
                className={`text-xl md:text-2xl font-bold mb-1 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
                animate={{
                  color: isDarkMode
                    ? ["#f9fafb", "#a5b4fc", "#f9fafb"]
                    : ["#1f2937", "#4f46e5", "#1f2937"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {message}
              </motion.h2>
              <motion.p
                className={`text-sm md:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {getLoadingText()}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`w-full h-2 mb-2 rounded-full overflow-hidden ${
            isDarkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <motion.div
            className={`h-full rounded-full ${
              loadingPhase === 0
                ? "bg-indigo-400"
                : loadingPhase === 1
                ? "bg-indigo-500"
                : "bg-indigo-600"
            }`}
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: isDarkMode
                ? "0 0 10px rgba(99, 102, 241, 0.5)"
                : "0 0 10px rgba(79, 70, 229, 0.3)",
            }}
          />
        </motion.div>

        {/* Progress percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`text-sm font-medium ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {Math.round(loadingProgress)}%
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-20"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={isDarkMode ? "fill-gray-800" : "fill-white"}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          ></motion.path>
        </svg>
      </div>
    </div>
  );
};

export default LoadingPage;
