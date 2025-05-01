import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef();

  // Generate 3D-like particles for background
  useEffect(() => {
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 6 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          depth: Math.random() * 5,
          opacity: Math.random() * 0.5 + 0.1,
          color: isDarkMode
            ? `rgba(${99 + Math.random() * 50}, ${102 + Math.random() * 50}, ${
                241 + Math.random() * 14
              }, ${Math.random() * 0.5 + 0.1})`
            : `rgba(${79 + Math.random() * 40}, ${70 + Math.random() * 40}, ${
                229 + Math.random() * 26
              }, ${Math.random() * 0.3 + 0.05})`,
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((p) => {
          // 3D perspective effect
          const scale = 1 / (p.depth * 0.1 + 1);

          // Mouse interaction
          if (mousePosition.x && mousePosition.y) {
            const dx = p.x - mousePosition.x;
            const dy = p.y - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const angle = Math.atan2(dy, dx);
              const force = (150 - distance) / 15;
              p.x += Math.cos(angle) * force * (isHovering ? 0.5 : 0.1);
              p.y += Math.sin(angle) * force * (isHovering ? 0.5 : 0.1);
            }
          }

          p.x += p.speedX * scale;
          p.y += p.speedY * scale;

          // Wrap around edges
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * scale * 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * scale * 3, 0, Math.PI * 2);
          ctx.fill();
        });

        requestRef.current = requestAnimationFrame(animate);
      };

      requestRef.current = requestAnimationFrame(animate);

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesRef.current = createParticles();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(requestRef.current);
      };
    }
  }, [isDarkMode, mousePosition, isHovering]);

  // Mouse move handler for interactive particles
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.6 },
    },
  };

  const glitchAnimation = {
    animate: {
      x: [0, -5, 5, -5, 5, 0],
      opacity: [1, 0.8, 0.9, 0.7, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror",
        repeatDelay: 3,
      },
    },
  };

  const digit1Variants = {
    initial: { rotateY: 0 },
    animate: {
      rotateY: [0, 90, 180, 270, 360],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
  };

  const digit2Variants = {
    initial: { rotateY: 0 },
    animate: {
      rotateY: [0, 90, 180, 270, 360],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
        delay: 0.2,
      },
    },
  };

  const digit3Variants = {
    initial: { rotateY: 0 },
    animate: {
      rotateY: [0, 90, 180, 270, 360],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
        delay: 0.4,
      },
    },
  };

  const digit4Variants = {
    initial: { rotateY: 0 },
    animate: {
      rotateY: [0, 90, 180, 270, 360],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
        delay: 0.6,
      },
    },
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <canvas
        id="particles-canvas"
        className="absolute inset-0 w-full h-full"
      />

      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isDarkMode
            ? "from-gray-900/50 via-transparent to-indigo-900/20"
            : "from-white/50 via-transparent to-indigo-100/30"
        }`}
      />

      <AnimatePresence>
        <motion.div
          className="relative z-10 max-w-4xl w-full px-4 text-center"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="flex items-center justify-center">
                <motion.div
                  variants={digit1Variants}
                  className={`text-8xl md:text-9xl font-bold transform-gpu ${
                    isDarkMode ? "text-indigo-500" : "text-indigo-600"
                  }`}
                  style={{
                    textShadow: isDarkMode
                      ? "0 0 15px rgba(99, 102, 241, 0.5)"
                      : "0 0 10px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  4
                </motion.div>

                <motion.div
                  variants={digit2Variants}
                  className={`text-8xl md:text-9xl font-bold transform-gpu ${
                    isDarkMode ? "text-indigo-500" : "text-indigo-600"
                  }`}
                  style={{
                    textShadow: isDarkMode
                      ? "0 0 15px rgba(99, 102, 241, 0.5)"
                      : "0 0 10px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  0
                </motion.div>

                <motion.div
                  variants={digit3Variants}
                  className={`text-8xl md:text-9xl font-bold transform-gpu ${
                    isDarkMode ? "text-indigo-500" : "text-indigo-600"
                  }`}
                  style={{
                    textShadow: isDarkMode
                      ? "0 0 15px rgba(99, 102, 241, 0.5)"
                      : "0 0 10px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  4
                </motion.div>
              </div>

              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-1 bg-indigo-500"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            <motion.span variants={glitchAnimation} animate="animate">
              Page Not Found
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Link
                to="/"
                className={`btn ${
                  isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white px-6 py-3 text-lg font-medium rounded-lg transition duration-300 flex items-center justify-center relative overflow-hidden border-2 border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.5)]`}
              >
                <span className="relative z-10 text-white tracking-wide flex items-center">
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Return Home
                </span>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 opacity-100"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => navigate(-1)}
                className={`btn ${
                  isDarkMode
                    ? "border-indigo-400 bg-indigo-900/40 text-indigo-100 hover:bg-indigo-800/60"
                    : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                } px-6 py-3 text-lg font-medium rounded-lg transition duration-300 border-2 flex items-center justify-center`}
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Auto-redirecting to home in {countdown} seconds...
          </motion.div>

          <motion.div
            className={`mt-4 h-1 bg-gray-200 dark:bg-gray-700 max-w-xs mx-auto rounded-full overflow-hidden`}
            variants={itemVariants}
          >
            <motion.div
              className="h-full bg-indigo-500"
              initial={{ width: "100%" }}
              animate={{ width: `${countdown * 10}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NotFoundPage;
