import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  LightBulbIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ArrowDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const PricingPage = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState({});
  const [annualBilling, setAnnualBilling] = useState(true);
  const [selectedFeatureGroup, setSelectedFeatureGroup] = useState("core");
  const [showTooltip, setShowTooltip] = useState(null);

  // Scroll animation
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

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Close tooltip when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showTooltip !== null &&
        !event.target.closest(".tooltip-trigger") &&
        !event.target.closest(".tooltip")
      ) {
        setShowTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

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

  // Pricing tiers data
  const pricingTiers = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      monthlyPrice: 3999,
      yearlyPrice: 3199,
      features: [
        { name: "AI Visibility Score", included: true },
        { name: "Basic Optimization Suggestions", included: true },
        { name: "Single User Account", included: true },
        { name: "Up to 50 Products/month", included: true },
        { name: "Email Support", included: true },
        { name: "Weekly Reports", included: true },
        { name: "Basic Analytics Dashboard", included: true },
        { name: "Competitor Analysis", included: false },
        { name: "API Access", included: false },
        { name: "AI Content Assistant", included: false },
      ],
      popular: false,
      ctaText: "Start Free Trial",
      ctaLink: "/register?plan=starter#bottom",
    },
    {
      name: "Professional",
      description: "For growing businesses with expanding product catalogs",
      monthlyPrice: 7999,
      yearlyPrice: 6399,
      features: [
        { name: "AI Visibility Score", included: true },
        { name: "Advanced Optimization Suggestions", included: true },
        { name: "Up to 5 User Accounts", included: true },
        { name: "Up to 250 Products/month", included: true },
        { name: "Priority Email Support", included: true },
        { name: "Real-time Reports", included: true },
        { name: "Advanced Analytics Dashboard", included: true },
        { name: "Competitor Analysis", included: true },
        { name: "API Access", included: true },
        { name: "AI Content Assistant (5,000 words/mo)", included: true },
      ],
      popular: true,
      ctaText: "Start Free Trial",
      ctaLink: "/register?plan=professional#bottom",
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      monthlyPrice: 19999,
      yearlyPrice: 15999,
      features: [
        { name: "AI Visibility Score", included: true },
        { name: "Custom Optimization Engine", included: true },
        { name: "Unlimited User Accounts", included: true },
        { name: "Unlimited Products", included: true },
        { name: "24/7 Priority Support", included: true },
        { name: "Custom Reports", included: true },
        { name: "Custom Analytics Dashboard", included: true },
        { name: "Advanced Competitor Analysis", included: true },
        { name: "Advanced API Access", included: true },
        { name: "AI Content Assistant (Unlimited)", included: true },
      ],
      popular: false,
      ctaText: "Contact Sales",
      ctaLink: "/contact#bottom",
    },
  ];

  // Detailed feature comparison data
  const featureGroups = [
    {
      id: "core",
      name: "Core Features",
      features: [
        {
          name: "AI Visibility Score",
          starter: true,
          professional: true,
          enterprise: true,
          tooltip:
            "Our proprietary scoring system that evaluates your product visibility in AI search engines",
        },
        {
          name: "Optimization Suggestions",
          starter: "Basic",
          professional: "Advanced",
          enterprise: "Custom",
          tooltip:
            "Actionable recommendations to improve your product's AI visibility",
        },
        {
          name: "Product Limit",
          starter: "50/month",
          professional: "250/month",
          enterprise: "Unlimited",
          tooltip: "The number of products you can analyze each month",
        },
        {
          name: "User Accounts",
          starter: "1 user",
          professional: "5 users",
          enterprise: "Unlimited",
          tooltip: "Team members who can access your AIVO account",
        },
        {
          name: "Analytics Dashboard",
          starter: "Basic",
          professional: "Advanced",
          enterprise: "Custom",
          tooltip:
            "Visual dashboard showing your AI visibility metrics and improvement over time",
        },
      ],
    },
    {
      id: "advanced",
      name: "Advanced Features",
      features: [
        {
          name: "Competitor Analysis",
          starter: false,
          professional: true,
          enterprise: "Advanced",
          tooltip:
            "Compare your products against competitors in AI search results",
        },
        {
          name: "AI Content Assistant",
          starter: false,
          professional: "5,000 words/mo",
          enterprise: "Unlimited",
          tooltip:
            "AI tool that helps you create optimized content for AI search engines",
        },
        {
          name: "A/B Testing",
          starter: false,
          professional: true,
          enterprise: true,
          tooltip:
            "Test different product descriptions to see which performs better in AI searches",
        },
        {
          name: "API Access",
          starter: false,
          professional: "Standard",
          enterprise: "Advanced",
          tooltip:
            "Integrate AIVO's features into your own systems and workflows",
        },
        {
          name: "Custom Integrations",
          starter: false,
          professional: false,
          enterprise: true,
          tooltip: "Custom integrations with your existing tech stack",
        },
      ],
    },
    {
      id: "support",
      name: "Support & Success",
      features: [
        {
          name: "Customer Support",
          starter: "Email",
          professional: "Priority Email",
          enterprise: "24/7 Priority",
          tooltip: "Level of customer support available to you",
        },
        {
          name: "Strategy Consulting",
          starter: false,
          professional: "1 session/quarter",
          enterprise: "Monthly",
          tooltip:
            "Strategic consulting to help you maximize your AI visibility",
        },
        {
          name: "Onboarding",
          starter: "Self-serve",
          professional: "Guided",
          enterprise: "White glove",
          tooltip: "Help getting started with AIVO",
        },
        {
          name: "Training Sessions",
          starter: false,
          professional: "1 session",
          enterprise: "Unlimited",
          tooltip: "Training for your team on using AIVO effectively",
        },
        {
          name: "Dedicated Account Manager",
          starter: false,
          professional: false,
          enterprise: true,
          tooltip:
            "A dedicated point of contact who knows your business and goals",
        },
      ],
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "What is included in the free trial?",
      answer:
        "The 14-day free trial includes full access to all features of your selected plan. You can analyze up to 10 products, explore the analytics dashboard, receive optimization suggestions, and test all available features with no restrictions. No credit card is required to start the trial.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to the new features and will be billed the prorated difference. When downgrading, the change will take effect at the start of your next billing cycle.",
    },
    {
      question: "What happens after my free trial ends?",
      answer:
        "After your 14-day trial, you'll be prompted to select a plan and enter payment details to continue using AIVO. If you choose not to subscribe, your account will be limited, but your data will be stored for 30 days, giving you time to decide.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees for any AIVO plans. You only pay the monthly or annual subscription fee for your chosen plan.",
    },
    {
      question:
        "Do you offer any discounts for nonprofits or educational institutions?",
      answer:
        "Yes, we offer special pricing for qualified nonprofit organizations and educational institutions. Please contact our sales team for more information about our discount programs.",
    },
    {
      question: "How does product counting work?",
      answer:
        "A 'product' is any individual item you want to optimize for AI search visibility. Each time you analyze a product, it counts toward your monthly limit. Updates to previously analyzed products within the same month don't count as additional products.",
    },
  ];

  return (
    <div
      ref={scrollRef}
      className={`overflow-hidden ${isDarkMode ? "text-gray-100" : ""}`}
    >
      {/* Scroll progress indicator */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50`}
        style={{ scaleX: scrollIndicatorWidth, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <section
        className={`relative py-20 md:py-28 lg:py-24 overflow-hidden bg-gradient-to-br ${
          isDarkMode
            ? "from-gray-900 via-gray-800 to-gray-900"
            : "from-indigo-50 via-blue-50 to-indigo-50"
        }`}
      >
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
            >
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Choose the perfect plan for your business and start optimizing
              your products for AI search today
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center rounded-full p-1 mb-12 bg-gray-100 dark:bg-gray-800"
            >
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  annualBilling
                    ? isDarkMode
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-600 text-white"
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
                onClick={() => setAnnualBilling(true)}
              >
                Annual Billing
                <span className="ml-1 text-xs font-bold text-green-400">
                  Save 20%
                </span>
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !annualBilling
                    ? isDarkMode
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-600 text-white"
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
                onClick={() => setAnnualBilling(false)}
              >
                Monthly Billing
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </section>

      {/* Pricing Cards Section */}
      <section
        id="pricing-cards"
        className={`py-12 observe-section ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={`rounded-2xl overflow-hidden relative ${
                  tier.popular
                    ? isDarkMode
                      ? "ring-2 ring-indigo-500"
                      : "ring-2 ring-indigo-500"
                    : isDarkMode
                    ? "bg-gray-800"
                    : "bg-white border border-gray-200"
                } ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-xl flex flex-col h-full`}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isVisible["pricing-cards"]
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 + 0.3 },
                      }
                    : { opacity: 0, y: 30 }
                }
              >
                {tier.popular && (
                  <div className="bg-indigo-600 text-white text-sm font-medium py-1 text-center">
                    Most Popular
                  </div>
                )}

                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p
                    className={`mb-6 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ₹{annualBilling ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    <span
                      className={`text-sm ml-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      /mo
                    </span>
                    {annualBilling && (
                      <div className="text-sm text-green-500 font-medium">
                        Billed annually
                      </div>
                    )}
                  </div>

                  <ul className="mb-8 space-y-3">
                    {tier.features.slice(0, 6).map((feature) => (
                      <li
                        key={feature.name}
                        className="flex items-start leading-tight"
                      >
                        {feature.included === true ? (
                          <CheckIcon
                            className={`w-5 h-5 mr-2 mt-0.5 ${
                              isDarkMode ? "text-green-500" : "text-green-600"
                            } flex-shrink-0`}
                          />
                        ) : feature.included === false ? (
                          <XMarkIcon className="w-5 h-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <CheckIcon
                            className={`w-5 h-5 mr-2 mt-0.5 ${
                              isDarkMode ? "text-green-500" : "text-green-600"
                            } flex-shrink-0`}
                          />
                        )}
                        <span>
                          {feature.name}
                          {feature.included !== true &&
                            feature.included !== false && (
                              <span
                                className={`ml-1 ${
                                  isDarkMode
                                    ? "text-indigo-400"
                                    : "text-indigo-600"
                                }`}
                              >
                                ({feature.included})
                              </span>
                            )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {tier.features.length > 6 && (
                    <div className="mb-6 text-center">
                      <Link
                        to="#detailed-comparison"
                        className={`text-sm font-medium ${
                          isDarkMode
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-indigo-600 hover:text-indigo-700"
                        }`}
                        onClick={() => {
                          document
                            .getElementById("detailed-comparison")
                            .scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        View all features
                        <ArrowDownIcon className="inline-block w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-gradient-to-b from-transparent via-transparent to-gray-50 dark:to-gray-800/50">
                  <Link to={tier.ctaLink}>
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                        tier.popular
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      {tier.ctaText}
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={
              isVisible["pricing-cards"] ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ delay: 0.6 }}
          >
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              All plans include a 14-day free trial. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section
        id="feature-highlights"
        className={`py-20 observe-section ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={
              isVisible["feature-highlights"] ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Every Plan Includes
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Core features available across all our plans to enhance your AI
              search visibility
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <ChartBarIcon className="w-6 h-6" />,
                title: "AI Visibility Score",
                description:
                  "Measure how well your products perform in AI search results",
                color: "indigo",
              },
              {
                icon: <LightBulbIcon className="w-6 h-6" />,
                title: "Optimization Suggestions",
                description:
                  "Get actionable recommendations to improve your product visibility",
                color: "green",
              },
              {
                icon: <SparklesIcon className="w-6 h-6" />,
                title: "Weekly Reports",
                description:
                  "Regular updates on your progress and changing AI trends",
                color: "amber",
              },
              {
                icon: <ShieldCheckIcon className="w-6 h-6" />,
                title: "Data Security",
                description:
                  "Enterprise-grade security for all your product data",
                color: "blue",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["feature-highlights"]
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 + 0.3 },
                      }
                    : { opacity: 0, y: 20 }
                }
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${
                    feature.color
                  }-100 text-${feature.color}-600 ${
                    isDarkMode ? `bg-${feature.color}-900/30` : ""
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section
        id="detailed-comparison"
        className={`py-24 observe-section ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={
              isVisible["detailed-comparison"] ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Detailed Feature Comparison
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Compare all features across our different plans
            </p>

            {/* Feature Group Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8">
              {featureGroups.map((group) => (
                <button
                  key={group.id}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                    selectedFeatureGroup === group.id
                      ? isDarkMode
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-600 text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedFeatureGroup(group.id)}
                >
                  {group.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isVisible["detailed-comparison"]
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.4 }}
          >
            <table
              className={`min-w-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-900"
              } rounded-xl overflow-hidden shadow-lg`}
            >
              <thead
                className={`${
                  isDarkMode ? "bg-gray-900" : "bg-gray-50"
                } border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <tr>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } uppercase tracking-wider w-1/3`}
                  >
                    Feature
                  </th>
                  <th
                    className={`px-6 py-4 text-center text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } uppercase tracking-wider`}
                  >
                    Starter
                  </th>
                  <th
                    className={`px-6 py-4 text-center text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/20`}
                  >
                    Professional
                  </th>
                  <th
                    className={`px-6 py-4 text-center text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } uppercase tracking-wider`}
                  >
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureGroups
                  .find((group) => group.id === selectedFeatureGroup)
                  .features.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={`${
                        index % 2 === 0
                          ? isDarkMode
                            ? "bg-gray-800"
                            : "bg-white"
                          : isDarkMode
                          ? "bg-gray-800/80"
                          : "bg-gray-50"
                      } border-b ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      } last:border-0`}
                    >
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap flex items-center">
                        {feature.name}
                        <div className="relative ml-1 tooltip-trigger">
                          <QuestionMarkCircleIcon
                            className={`w-4 h-4 ${
                              isDarkMode
                                ? "text-gray-500 hover:text-gray-300"
                                : "text-gray-400 hover:text-gray-600"
                            } cursor-pointer`}
                            onClick={() =>
                              setShowTooltip(
                                showTooltip === feature.name
                                  ? null
                                  : feature.name
                              )
                            }
                          />
                          {showTooltip === feature.name && (
                            <div
                              className={`absolute z-10 left-0 mt-2 p-3 rounded-lg shadow-lg text-sm max-w-xs tooltip ${
                                isDarkMode
                                  ? "bg-gray-700 text-gray-100"
                                  : "bg-white text-gray-800"
                              } border ${
                                isDarkMode
                                  ? "border-gray-600"
                                  : "border-gray-200"
                              }`}
                            >
                              {feature.tooltip}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                        {feature.starter === true ? (
                          <CheckIcon className="w-5 h-5 mx-auto text-green-500" />
                        ) : feature.starter === false ? (
                          <XMarkIcon className="w-5 h-5 mx-auto text-gray-400" />
                        ) : (
                          <span
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {feature.starter}
                          </span>
                        )}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm text-center whitespace-nowrap bg-indigo-50 dark:bg-indigo-900/20`}
                      >
                        {feature.professional === true ? (
                          <CheckIcon className="w-5 h-5 mx-auto text-green-500" />
                        ) : feature.professional === false ? (
                          <XMarkIcon className="w-5 h-5 mx-auto text-gray-400" />
                        ) : (
                          <span
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {feature.professional}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                        {feature.enterprise === true ? (
                          <CheckIcon className="w-5 h-5 mx-auto text-green-500" />
                        ) : feature.enterprise === false ? (
                          <XMarkIcon className="w-5 h-5 mx-auto text-gray-400" />
                        ) : (
                          <span
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            } ${
                              typeof feature.enterprise === "string" &&
                              feature.enterprise.includes("Advanced")
                                ? "font-medium text-indigo-500"
                                : ""
                            }`}
                          >
                            {feature.enterprise}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq-section"
        className={`py-20 observe-section ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={isVisible["faq-section"] ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Everything you need to know about our pricing and plans
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["faq-section"]
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 + 0.3 },
                      }
                    : { opacity: 0, y: 20 }
                }
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isVisible["faq-section"] ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p
              className={`mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Still have questions?
            </p>
            <Link
              to="/contact"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
              }`}
            >
              Contact Our Team
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="pricing-cta-section"
        className="py-24 observe-section relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900"
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="absolute h-full w-full"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="a" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#a)"
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

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isVisible["pricing-cta-section"]
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your AI Search Visibility?
            </h2>

            <p className="text-xl md:text-2xl mb-10 text-indigo-100">
              Join hundreds of businesses already optimizing their products with
              AIVO
            </p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible["pricing-cta-section"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/register"
                  className="btn bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <span>Start Free Trial</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/demo"
                  className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-lg transition duration-300"
                >
                  Schedule Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-8"
              initial={{ opacity: 0 }}
              animate={
                isVisible["pricing-cta-section"]
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-indigo-100 text-sm">
                  No credit card required
                </p>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-indigo-100 text-sm">14-day free trial</p>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-indigo-100 text-sm">Cancel anytime</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
