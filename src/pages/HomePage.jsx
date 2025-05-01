import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  XMarkIcon,
  ChevronUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // Scroll animation refs
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const scrollIndicatorWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  // Animation for counting up numbers
  const [countedUp, setCountedUp] = useState(false);

  // Animation for fading in sections when they become visible
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    });

    const sections = document.querySelectorAll(".observe-section");
    sections.forEach((section) => observer.observe(section));

    // Scroll event for showing scroll-to-top button
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Update active section for navigation
      const sectionIds = [
        "stats-section",
        "how-it-works",
        "features-section",
        "testimonials-section",
        "cta-section",
      ];
      const current = sectionIds.find((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation for stats counter when visible
  useEffect(() => {
    if (isVisible["stats-section"] && !countedUp) {
      setCountedUp(true);
    }
  }, [isVisible, countedUp]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Custom gradient styles for different sections
  const heroGradient = isDarkMode
    ? "from-gray-900 via-gray-800 to-gray-900"
    : "from-indigo-50 via-blue-50 to-indigo-50";

  const ctaGradient = isDarkMode
    ? "from-indigo-900 via-indigo-800 to-indigo-900"
    : "from-indigo-600 to-indigo-700";

  return (
    <div
      ref={scrollRef}
      className={`overflow-hidden ${isDarkMode ? "text-gray-100" : ""}`}
    >
      {/* Sticky navigation */}
      <motion.div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg backdrop-blur-md ${
            isDarkMode ? "bg-gray-800/80" : "bg-white/80"
          }`}
        >
          {[
            "stats-section",
            "how-it-works",
            "features-section",
            "testimonials-section",
          ].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section
                  ? `w-6 ${isDarkMode ? "bg-indigo-400" : "bg-indigo-600"}`
                  : `${
                      isDarkMode ? "bg-gray-600" : "bg-gray-300"
                    } hover:bg-indigo-400`
              }`}
              aria-label={`Scroll to ${section.replace("-", " ")}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Scroll progress indicator */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50`}
        style={{ scaleX: scrollIndicatorWidth, transformOrigin: "0%" }}
      />

      {/* Scroll to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed right-6 bottom-6 p-3 rounded-full shadow-lg z-50 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } ${showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Scroll to top"
      >
        <ChevronUpIcon className="w-5 h-5" />
      </motion.button>

      {/* Hero Section with enhanced design */}
      <section
        className={`relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-br ${heroGradient}`}
      >
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating shapes for visual appeal */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                isDarkMode ? "bg-indigo-900/20" : "bg-indigo-500/10"
              }`}
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
                scale: [1, Math.random() * 0.3 + 0.8, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-800/10 dark:to-indigo-900/20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <motion.div
                className="flex justify-center mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span
                  className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 font-medium text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="inline-block mr-2"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    ✨
                  </motion.span>
                  AI-Powered Visibility for Your Products
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
            >
              <motion.span
                className="relative inline-block"
                animate={{
                  textShadow: isDarkMode
                    ? [
                        "0 0 0px rgba(99, 102, 241, 0)",
                        "0 0 15px rgba(99, 102, 241, 0.5)",
                        "0 0 0px rgba(99, 102, 241, 0)",
                      ]
                    : [
                        "0 0 0px rgba(99, 102, 241, 0)",
                        "0 0 10px rgba(99, 102, 241, 0.3)",
                        "0 0 0px rgba(99, 102, 241, 0)",
                      ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Optimize
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-indigo-500"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.span>{" "}
              Your Product Visibility for
              <motion.span
                className="gradient-text block mt-2"
                animate={{
                  color: isDarkMode
                    ? ["#818cf8", "#a78bfa", "#818cf8"]
                    : ["#4f46e5", "#6366f1", "#4f46e5"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                AI Search
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              AIVO helps businesses adapt their content to be more visible in AI
              search results, ensuring your products get recommended in the new
              era of search.
            </motion.p>

            {/* Enhanced Call-to-Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="shadow-xl"
              >
                <Link
                  to="/register"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition duration-300 flex items-center justify-center group relative overflow-hidden border-2 border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                >
                  <span className="relative z-10 text-white tracking-wide text-shadow-sm">
                    Get Started
                  </span>
                  <motion.div
                    className="ml-2 relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.div>
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="shadow-lg"
              >
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className={`btn border-2 ${
                    isDarkMode
                      ? "border-indigo-400 bg-indigo-900/40 text-indigo-100 hover:bg-indigo-800/60 shadow-[0_0_15px_rgba(129,140,248,0.3)]"
                      : "border-indigo-600 text-indigo-600 hover:bg-indigo-50 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                  } px-8 py-4 text-lg font-medium rounded-lg transition duration-300 relative`}
                >
                  <span className="relative z-10">How It Works</span>
                  {isDarkMode && (
                    <motion.div
                      className="absolute inset-0 bg-indigo-500/10 rounded-lg"
                      animate={{ opacity: [0.1, 0.2, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced hero image or illustration */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div
              className={`relative rounded-xl overflow-hidden shadow-2xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="aspect-video w-full overflow-hidden">
                <div
                  className={`p-8 flex flex-col items-center justify-center ${
                    isDarkMode ? "bg-gray-800/50" : "bg-gray-50/50"
                  } backdrop-blur-sm`}
                >
                  <div className="w-full max-w-3xl">
                    {/* Animated dashboard preview */}
                    <div
                      className={`h-12 w-full ${
                        isDarkMode ? "bg-indigo-900/30" : "bg-indigo-100"
                      } rounded-lg mb-6 flex items-center px-4`}
                    >
                      <motion.div
                        className="h-4 w-20 bg-indigo-400 rounded"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      ></motion.div>
                      <div className="flex-grow"></div>
                      <motion.div
                        className={`h-6 w-6 rounded-full ${
                          isDarkMode ? "bg-indigo-400" : "bg-indigo-500"
                        }`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div
                        className={`h-32 ${
                          isDarkMode ? "bg-indigo-800/40" : "bg-indigo-200/50"
                        } rounded-lg`}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 12px 24px -8px rgba(99, 102, 241, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="h-full w-full flex flex-col justify-center items-center">
                          <motion.div
                            className={`w-10 h-10 mb-2 rounded-full ${
                              isDarkMode ? "bg-indigo-700" : "bg-indigo-300"
                            } flex items-center justify-center`}
                            animate={{
                              boxShadow: [
                                "0 0 0 rgba(79, 70, 229, 0)",
                                "0 0 15px rgba(79, 70, 229, 0.5)",
                                "0 0 0 rgba(79, 70, 229, 0)",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div
                              className={`w-6 h-6 ${
                                isDarkMode ? "bg-indigo-500" : "bg-indigo-500"
                              } rounded-full`}
                            ></div>
                          </motion.div>
                          <div
                            className={`w-16 h-2 ${
                              isDarkMode ? "bg-indigo-700" : "bg-indigo-300"
                            } rounded-full`}
                          ></div>
                        </div>
                      </motion.div>
                      <motion.div
                        className={`h-32 ${
                          isDarkMode ? "bg-blue-800/40" : "bg-blue-200/50"
                        } rounded-lg`}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 12px 24px -8px rgba(59, 130, 246, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="h-full w-full flex flex-col justify-center items-center p-4">
                          <motion.div
                            className="w-full h-2/3"
                            animate={{ height: ["60%", "80%", "60%"] }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          >
                            <div className="h-full w-full flex items-end">
                              <div className="flex-1 mx-0.5">
                                <motion.div
                                  className={`w-full ${
                                    isDarkMode ? "bg-blue-600" : "bg-blue-400"
                                  } rounded-sm`}
                                  animate={{ height: ["30%", "70%", "30%"] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: 0.5,
                                  }}
                                ></motion.div>
                              </div>
                              <div className="flex-1 mx-0.5">
                                <motion.div
                                  className={`w-full ${
                                    isDarkMode ? "bg-blue-600" : "bg-blue-400"
                                  } rounded-sm`}
                                  animate={{ height: ["60%", "40%", "60%"] }}
                                  transition={{
                                    duration: 2.3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                ></motion.div>
                              </div>
                              <div className="flex-1 mx-0.5">
                                <motion.div
                                  className={`w-full ${
                                    isDarkMode ? "bg-blue-600" : "bg-blue-400"
                                  } rounded-sm`}
                                  animate={{ height: ["45%", "85%", "45%"] }}
                                  transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: 0.2,
                                  }}
                                ></motion.div>
                              </div>
                            </div>
                          </motion.div>
                          <div
                            className={`w-16 h-2 mt-2 ${
                              isDarkMode ? "bg-blue-700" : "bg-blue-300"
                            } rounded-full`}
                          ></div>
                        </div>
                      </motion.div>
                      <motion.div
                        className={`h-32 ${
                          isDarkMode ? "bg-purple-800/40" : "bg-purple-200/50"
                        } rounded-lg`}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 12px 24px -8px rgba(126, 34, 206, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="h-full w-full flex flex-col justify-center items-center p-4">
                          <motion.div
                            className={`w-14 h-14 rounded-full ${
                              isDarkMode
                                ? "bg-purple-700/50"
                                : "bg-purple-300/50"
                            } flex items-center justify-center`}
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 10,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <div
                              className={`w-10 h-10 rounded-full ${
                                isDarkMode
                                  ? "bg-purple-600/70"
                                  : "bg-purple-400/70"
                              } flex items-center justify-center`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full ${
                                  isDarkMode ? "bg-purple-500" : "bg-purple-500"
                                }`}
                              ></div>
                            </div>
                          </motion.div>
                          <div
                            className={`w-16 h-2 mt-4 ${
                              isDarkMode ? "bg-purple-700" : "bg-purple-300"
                            } rounded-full`}
                          ></div>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      className={`h-10 w-3/4 mt-6 ${
                        isDarkMode ? "bg-green-800/40" : "bg-green-200/50"
                      } rounded-lg`}
                      animate={{
                        width: ["70%", "85%", "70%"],
                        backgroundColor: isDarkMode
                          ? [
                              "rgba(22, 101, 52, 0.4)",
                              "rgba(21, 128, 61, 0.4)",
                              "rgba(22, 101, 52, 0.4)",
                            ]
                          : [
                              "rgba(134, 239, 172, 0.5)",
                              "rgba(187, 247, 208, 0.5)",
                              "rgba(134, 239, 172, 0.5)",
                            ],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    ></motion.div>
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 0px rgba(99, 102, 241, 0)",
                    "0 0 10px rgba(99, 102, 241, 0.5)",
                    "0 0 0px rgba(99, 102, 241, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AI-Powered Dashboard
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced decorative shapes */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-3/4 h-12 bg-indigo-500/30 blur-3xl rounded-full"
          animate={{
            width: ["70%", "80%", "70%"],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
      </section>

      {/* Stats Section with animated counters */}
      <section
        className={`py-20 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } observe-section`}
        id="stats-section"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible["stats-section"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  isDarkMode
                    ? "bg-gray-800 text-indigo-300"
                    : "bg-indigo-100 text-indigo-800"
                }`}
              >
                Proven Results
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real Impact on Your Business
              </h2>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                See the difference AIVO makes for businesses just like yours
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              <motion.div
                className={`stat-card text-center px-6 py-10 rounded-2xl shadow-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white border border-gray-100"
                } relative overflow-hidden group`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["stats-section"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: isDarkMode
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4 mx-auto flex justify-center relative">
                  <ArrowTrendingUpIcon className="w-10 h-10 text-indigo-500" />
                </div>
                <div className="text-5xl font-bold text-primary mb-2 relative">
                  <motion.span
                    animate={
                      countedUp
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    initial={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    +
                  </motion.span>
                  <motion.span
                    animate={
                      countedUp
                        ? {
                            opacity: 1,
                            scale: [0.5, 1.2, 1],
                            transition: {
                              opacity: { duration: 0.3 },
                              scale: { duration: 0.8, times: [0, 0.6, 1] },
                            },
                          }
                        : {
                            opacity: 0,
                            scale: 0.5,
                          }
                    }
                    initial={{ opacity: 0, scale: 0.5 }}
                  >
                    43%
                  </motion.span>
                </div>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Average increase in AI search visibility
                </p>
                <motion.div
                  className="w-12 h-1 bg-indigo-500 mx-auto mt-6"
                  initial={{ width: 0 }}
                  animate={
                    isVisible["stats-section"] ? { width: 48 } : { width: 0 }
                  }
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.div>

              <motion.div
                className={`stat-card text-center px-6 py-10 rounded-2xl shadow-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white border border-gray-100"
                } relative overflow-hidden group`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["stats-section"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{
                  y: -10,
                  boxShadow: isDarkMode
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4 mx-auto flex justify-center">
                  <CheckCircleIcon className="w-10 h-10 text-green-500" />
                </div>
                <div className="text-5xl font-bold text-green-500 mb-2">
                  <motion.span
                    animate={
                      countedUp
                        ? {
                            opacity: 1,
                            scale: [0.5, 1.2, 1],
                            transition: {
                              opacity: { duration: 0.3 },
                              scale: { duration: 0.8, times: [0, 0.6, 1] },
                            },
                          }
                        : {
                            opacity: 0,
                            scale: 0.5,
                          }
                    }
                    initial={{ opacity: 0, scale: 0.5 }}
                  >
                    85%
                  </motion.span>
                </div>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  of users report higher product visibility
                </p>
                <motion.div
                  className="w-12 h-1 bg-green-500 mx-auto mt-6"
                  initial={{ width: 0 }}
                  animate={
                    isVisible["stats-section"] ? { width: 48 } : { width: 0 }
                  }
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.div>

              <motion.div
                className={`stat-card text-center px-6 py-10 rounded-2xl shadow-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white border border-gray-100"
                } relative overflow-hidden group`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["stats-section"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow: isDarkMode
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4 mx-auto flex justify-center">
                  <SparklesIcon className="w-10 h-10 text-amber-500" />
                </div>
                <div className="text-5xl font-bold text-amber-500 mb-2">
                  <motion.span
                    animate={
                      countedUp
                        ? {
                            opacity: 1,
                            scale: [0.5, 1.2, 1],
                            transition: {
                              opacity: { duration: 0.3 },
                              scale: { duration: 0.8, times: [0, 0.6, 1] },
                            },
                          }
                        : {
                            opacity: 0,
                            scale: 0.5,
                          }
                    }
                    initial={{ opacity: 0, scale: 0.5 }}
                  >
                    3
                  </motion.span>{" "}
                  <motion.span
                    animate={
                      countedUp
                        ? {
                            opacity: 1,
                            y: [20, 0],
                            transition: { delay: 0.4, duration: 0.5 },
                          }
                        : {
                            opacity: 0,
                            y: 20,
                          }
                    }
                    initial={{ opacity: 0, y: 20 }}
                  >
                    weeks
                  </motion.span>
                </div>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Average time to see significant improvements
                </p>
                <motion.div
                  className="w-12 h-1 bg-amber-500 mx-auto mt-6"
                  initial={{ width: 0 }}
                  animate={
                    isVisible["stats-section"] ? { width: 48 } : { width: 0 }
                  }
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - with interactive elements */}
      <section
        className={`py-24 observe-section ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
        id="how-it-works"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={
              isVisible["how-it-works"] ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                isDarkMode
                  ? "bg-gray-700 text-indigo-300"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AIVO Works
            </h2>
            <p
              className={`text-xl md:text-2xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our platform analyzes your products through the lens of AI search
              engines, providing actionable insights to improve visibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line with animated progress */}
            <motion.div
              className={`hidden md:block absolute top-1/2 left-0 right-0 h-1 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
              style={{ transform: "translateY(-50%)" }}
            />

            <motion.div
              className={`hidden md:block absolute top-1/2 left-0 h-1 bg-indigo-500`}
              initial={{ width: "0%" }}
              animate={{
                width: isVisible["how-it-works"] ? "100%" : "0%",
              }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
              style={{ transform: "translateY(-50%)" }}
            />

            {/* Step 1 */}
            <motion.div
              className={`relative z-10 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible["how-it-works"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              whileHover={{
                y: -10,
                boxShadow: isDarkMode
                  ? "0 25px 50px -12px rgba(79, 70, 229, 0.35)"
                  : "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className={`w-16 h-16 ${
                  isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                } rounded-2xl flex items-center justify-center mb-6 mx-auto relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-indigo-500 opacity-0"
                  whileHover={{ opacity: 0.2 }}
                />
                <span className="text-primary text-2xl font-bold relative z-10">
                  1
                </span>
              </motion.div>

              <h3 className="text-xl font-bold mb-4 text-center">
                Analyze Content
              </h3>

              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } text-center mb-6`}
              >
                Submit your product pages for analysis. Our system evaluates
                them through simulated AI search queries.
              </p>

              <div className="flex justify-center mb-6 h-24">
                <motion.div
                  className={`w-full max-w-xs p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-4 w-3/4 bg-indigo-200 rounded mb-2"></div>
                  <div className="h-4 w-full bg-indigo-200 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-indigo-200 rounded"></div>
                </motion.div>
              </div>

              <motion.div
                className="mt-6 flex justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to="/analyze"
                  className={`inline-flex items-center text-sm font-medium text-primary group px-4 py-2 rounded-full ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-indigo-50 hover:bg-indigo-100"
                  } transition-colors`}
                >
                  Learn more
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className={`relative z-10 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible["how-it-works"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              whileHover={{
                y: -10,
                boxShadow: isDarkMode
                  ? "0 25px 50px -12px rgba(79, 70, 229, 0.35)"
                  : "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
              }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className={`w-16 h-16 ${
                  isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                } rounded-2xl flex items-center justify-center mb-6 mx-auto relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-indigo-500 opacity-0"
                  whileHover={{ opacity: 0.2 }}
                />
                <span className="text-primary text-2xl font-bold relative z-10">
                  2
                </span>
              </motion.div>

              <h3 className="text-xl font-bold mb-4 text-center">
                Get Insights
              </h3>

              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } text-center mb-6`}
              >
                Receive detailed analysis with specific recommendations on how
                to improve your product's AI visibility.
              </p>

              <div className="flex justify-center mb-6 h-24">
                <motion.div
                  className={`w-full max-w-xs rounded-lg overflow-hidden ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`h-6 ${
                      isDarkMode ? "bg-indigo-900" : "bg-indigo-500"
                    } w-full flex items-center px-2`}
                  >
                    <div className="h-3 w-20 bg-white rounded opacity-70"></div>
                  </div>
                  <div className="p-3">
                    <div className="h-3 w-full bg-indigo-300 rounded mb-2"></div>
                    <div className="h-3 w-5/6 bg-indigo-200 rounded mb-2"></div>
                    <div className="h-3 w-4/6 bg-green-200 rounded"></div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-6 flex justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to="/insights"
                  className={`inline-flex items-center text-sm font-medium text-primary group px-4 py-2 rounded-full ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-indigo-50 hover:bg-indigo-100"
                  } transition-colors`}
                >
                  Learn more
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className={`relative z-10 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible["how-it-works"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              whileHover={{
                y: -10,
                boxShadow: isDarkMode
                  ? "0 25px 50px -12px rgba(79, 70, 229, 0.35)"
                  : "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className={`w-16 h-16 ${
                  isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                } rounded-2xl flex items-center justify-center mb-6 mx-auto relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-indigo-500 opacity-0"
                  whileHover={{ opacity: 0.2 }}
                />
                <span className="text-primary text-2xl font-bold relative z-10">
                  3
                </span>
              </motion.div>

              <h3 className="text-xl font-bold mb-4 text-center">
                Optimize & Track
              </h3>

              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } text-center mb-6`}
              >
                Implement suggestions and track improvements in your product's
                visibility in AI search results over time.
              </p>

              <div className="flex justify-center mb-6 h-24">
                <motion.div
                  className={`w-full max-w-xs ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  } rounded-lg overflow-hidden p-3`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-end h-full gap-2 justify-center">
                    <motion.div
                      className="w-8 bg-indigo-300 rounded-t"
                      initial={{ height: "30%" }}
                      whileHover={{ height: "60%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="w-8 bg-indigo-400 rounded-t"
                      initial={{ height: "50%" }}
                      whileHover={{ height: "80%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="w-8 bg-indigo-500 rounded-t"
                      initial={{ height: "70%" }}
                      whileHover={{ height: "90%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="w-8 bg-indigo-600 rounded-t"
                      initial={{ height: "90%" }}
                      whileHover={{ height: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-6 flex justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center text-sm font-medium text-primary group px-4 py-2 rounded-full ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-indigo-50 hover:bg-indigo-100"
                  } transition-colors`}
                >
                  Learn more
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Interactive grid */}
      <section
        className={`py-24 observe-section ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
        id="features-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            animate={
              isVisible["features-section"] ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                isDarkMode
                  ? "bg-gray-800 text-indigo-300"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Optimize your products for AI search visibility with our
              comprehensive set of tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[
              {
                icon: <ChartBarIcon className="w-8 h-8" />,
                color: "blue",
                title: "AI Visibility Score",
                description:
                  "Get a comprehensive score that shows how well your products perform in AI search engines, with detailed breakdowns.",
              },
              {
                icon: <LightBulbIcon className="w-8 h-8" />,
                color: "green",
                title: "Optimization Suggestions",
                description:
                  "Receive specific, actionable recommendations to improve your product descriptions, features, and structure.",
              },
              {
                icon: <MagnifyingGlassIcon className="w-8 h-8" />,
                color: "yellow",
                title: "Competitor Analysis",
                description:
                  "See how your products compare to competitors in AI search visibility and identify opportunities to outrank them.",
              },
              {
                icon: <SparklesIcon className="w-8 h-8" />,
                color: "purple",
                title: "AI Search Trends",
                description:
                  "Weekly reports on changing AI search patterns and behaviors to help you stay ahead of the curve.",
              },
              {
                icon: <ArrowTrendingUpIcon className="w-8 h-8" />,
                color: "red",
                title: "CMS Integrations",
                description:
                  "Connect directly with popular content management systems like WordPress, Shopify, and WooCommerce.",
              },
              {
                icon: <CheckCircleIcon className="w-8 h-8" />,
                color: "indigo",
                title: "Mobile Optimization",
                description:
                  "Specific suggestions for mobile-friendly content that AI search engines prefer for mobile users.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                } p-6 rounded-xl transition-colors duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["features-section"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`w-16 h-16 mb-5 rounded-2xl flex items-center justify-center bg-${
                    feature.color
                  }-100 text-${feature.color}-600 ${
                    isDarkMode ? `bg-${feature.color}-900 bg-opacity-30` : ""
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>

                <div className="mt-auto pt-6">
                  <Link
                    to="/features"
                    className={`inline-flex items-center text-sm font-medium text-primary group`}
                  >
                    Explore feature
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - with card hover effects */}
      <section
        className={`py-24 observe-section ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
        id="testimonials-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            animate={
              isVisible["testimonials-section"]
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                isDarkMode
                  ? "bg-gray-700 text-indigo-300"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join hundreds of businesses improving their AI search visibility
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                stars: 5,
                content:
                  "AIVO has transformed how we approach product content. Our headphones are now consistently showing up in AI recommendations, and sales have increased by 32% in just two months.",
                author: "Sarah Johnson",
                position: "Marketing Director, AudioTech",
                delay: 0.1,
                image: "https://i.pravatar.cc/150?img=32",
              },
              {
                stars: 5,
                content:
                  "The competitor analysis feature is incredible. We completely reworked our product descriptions based on AIVO's suggestions and now we're outranking our main competitors in AI responses.",
                author: "Michael Chen",
                position: "E-commerce Manager, TechGadgets",
                delay: 0.3,
                image: "https://i.pravatar.cc/150?img=68",
              },
              {
                stars: 5,
                content:
                  "The weekly AI trend reports have been eye-opening. We've been able to stay ahead of changes in AI search behavior and adjust our content strategy accordingly.",
                author: "Emily Rodriguez",
                position: "Content Strategist, FitGear",
                delay: 0.5,
                image: "https://i.pravatar.cc/150?img=47",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className={`${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } p-8 rounded-2xl shadow-lg transform transition duration-300 hover:shadow-2xl relative`}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isVisible["testimonials-section"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: testimonial.delay }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    isVisible["testimonials-section"]
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.8, opacity: 0 }
                  }
                  transition={{ delay: testimonial.delay + 0.4 }}
                >
                  Verified
                </motion.div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={
                        isVisible["testimonials-section"]
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.5 }
                      }
                      transition={{ delay: testimonial.delay + i * 0.1 }}
                    >
                      <StarIcon className="text-yellow-400 w-5 h-5" />
                    </motion.div>
                  ))}
                </div>
                <div
                  className={`mb-8 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <svg
                    className="h-8 w-8 text-indigo-400 mb-4 opacity-60"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-lg">{testimonial.content}</p>
                </div>
                <div className="flex items-center">
                  <motion.div
                    className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                  <div className="ml-4">
                    <p className="font-bold">{testimonial.author}</p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {testimonial.position}
                    </p>
                  </div>
                </div>

                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-indigo-500`}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isVisible["testimonials-section"]
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/testimonials"
              className={`inline-flex items-center font-medium ${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-800"
              } group px-6 py-3 rounded-full ${
                isDarkMode
                  ? "bg-gray-900 hover:bg-gray-800"
                  : "bg-white hover:bg-gray-50"
              } shadow-md hover:shadow-lg transition-all`}
            >
              View all customer stories
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with animated background */}
      <section
        className={`py-24 observe-section relative overflow-hidden bg-gradient-to-br ${ctaGradient}`}
        id="cta-section"
      >
        {/* Enhanced background animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated blob */}
          <div className="absolute inset-0 opacity-20">
            <svg
              className="absolute right-0 top-0 h-full"
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradient1" gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient1)"
                d="M400,200L400,200C511,200,600,289,600,400L600,400C600,511,511,600,400,600L400,600C289,600,200,511,200,400L200,400C200,289,289,200,400,200Z"
                transform="rotate(0, 400, 400)"
                opacity="0.4"
              >
                <animate
                  attributeName="d"
                  dur="15s"
                  repeatCount="indefinite"
                  values="M400,200L400,200C511,200,600,289,600,400L600,400C600,511,511,600,400,600L400,600C289,600,200,511,200,400L200,400C200,289,289,200,400,200Z;
                          M350,173.2L396.9,171.8C443.7,170.3,537.3,196.7,593.2,243.3L649,290C704.8,336.7,722.7,403.3,690,470L657.3,536.7C624.7,603.3,541.3,670,458,678.2L374.7,686.3C291.3,694.7,208,644.7,166.2,584L124.3,523.3C82.5,462.7,82.3,391.3,121.8,335L161.3,278.7C200.8,222.3,280,181,320,170.5L360,160Z;
                          M400,200L400,200C511,200,600,289,600,400L600,400C600,511,511,600,400,600L400,600C289,600,200,511,200,400L200,400C200,289,289,200,400,200Z"
                />
              </path>
            </svg>
          </div>

          {/* Floating particles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 8 + 2,
                height: Math.random() * 8 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                y: [0, -(Math.random() * 150 + 50)],
                opacity: [Math.random() * 0.5 + 0.1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isVisible["cta-section"]
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isVisible["cta-section"]
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Get Started Today
            </motion.span>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible["cta-section"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Ready to Optimize Your Products for{" "}
              <span className="relative inline-block">
                AI Search
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-white"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={
                    isVisible["cta-section"] ? { scaleX: 1 } : { scaleX: 0 }
                  }
                  transition={{ delay: 0.9, duration: 0.8 }}
                />
              </span>
              ?
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl mb-10 text-indigo-100"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible["cta-section"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Join hundreds of businesses already improving their visibility in
              AI search results.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible["cta-section"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/register"
                  className="btn bg-white text-indigo-600 hover:bg-gray-100 btn-lg transition duration-300 hover:shadow-glow-white flex items-center justify-center"
                >
                  <span>Start Free 14-Day Trial</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/demo"
                  className="btn border-2 border-white text-white hover:bg-white/10 btn-lg transition duration-300"
                >
                  Request Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-8"
              initial={{ opacity: 0 }}
              animate={
                isVisible["cta-section"] ? { opacity: 1 } : { opacity: 0 }
              }
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="flex items-center">
                <p className="text-indigo-100 text-sm mr-2">
                  No credit card required
                </p>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center">
                <p className="text-indigo-100 text-sm mr-2">Cancel anytime</p>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center">
                <p className="text-indigo-100 text-sm mr-2">
                  Full feature access
                </p>
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
