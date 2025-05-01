import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  StarIcon,
  ClockIcon,
  BoltIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  BellAlertIcon,
  TagIcon,
  ChartBarIcon,
  ServerIcon,
  PresentationChartLineIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "../components/common/Tooltip";
import { motion, AnimatePresence } from "framer-motion";

const IntegrationsPage = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    integration: "",
  });

  const [notificationQueue, setNotificationQueue] = useState([]);
  const [connectingIntegration, setConnectingIntegration] = useState(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectionStep, setConnectionStep] = useState(1);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [notifyList, setNotifyList] = useState([]);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");

  // Integration icons for each platform
  const integrationIcons = {
    wordpress: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19.5c-5.244 0-9.5-4.256-9.5-9.5S6.756 2.5 12 2.5s9.5 4.256 9.5 9.5-4.256 9.5-9.5 9.5zm-4.452-7.254l4.452 12.194 4.452-12.194c-1.346 0.756-2.853 1.254-4.452 1.254s-3.106-0.498-4.452-1.254zM12 4C8.486 4 5.5 5.648 4.206 8h15.588C18.5 5.648 15.514 4 12 4zm-2.392 12l2.392 6.554L14.392 16H9.608z" />
      </svg>
    ),
    shopify: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.337 3.324c-.038-.272-.191-.482-.414-.568a.842.842 0 0 0-.276-.037c-.486 0-1.011.432-1.4.823-.652.652-1.129 1.783-1.302 2.466-.012.049-.024.098-.033.147l-2.035.037c-.591.014-1.144.026-1.612.042-.122.003-.232.064-.295.162a.34.34 0 0 0-.056.335l2.165 6.277-5.329 3.073c-.158.091-.233.276-.185.453a.375.375 0 0 0 .359.258h2.386c.068 0 .134-.017.191-.048L18.654 8.75c.141-.077.215-.235.185-.395-.029-.159-.153-.283-.312-.312l-3.19-.587c.16-.704.328-1.409.328-1.409.086-.35.168-.709.246-1.058.149-.679-.093-1.321-.574-1.665z" />
      </svg>
    ),
    woocommerce: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 2H5C3.346 2 2 3.346 2 5v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3zm-4.207 13.673l-2.187 2.159c-.81.8-2.114.794-2.915-.013l-2.194-2.199a2.057 2.057 0 0 1 0-2.912l2.194-2.199c.8-.807 2.104-.813 2.915-.013l2.187 2.159c.81.801.81 2.108 0 2.909l.087.022-.087-.013z" />
      </svg>
    ),
    slack: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.527 15.43c0 1.413-1.145 2.56-2.56 2.56a2.56 2.56 0 1 1 0-5.12c1.415 0 2.56 1.146 2.56 2.56m6.536 0c0 1.413-1.145 2.56-2.56 2.56a2.56 2.56 0 1 1 0-5.12c1.415 0 2.56 1.146 2.56 2.56M13.063 6.527c0-1.415 1.145-2.56 2.56-2.56a2.56 2.56 0 1 1 0 5.12c-1.415 0-2.56-1.145-2.56-2.56m-6.536 0c0-1.415 1.145-2.56 2.56-2.56a2.56 2.56 0 1 1 0 5.12c-1.415 0-2.56-1.145-2.56-2.56m6.536 6.537c0-1.416 1.145-2.56 2.56-2.56a2.56 2.56 0 1 1 0 5.12c-1.415 0-2.56-1.145-2.56-2.56M6.527 6.527c0-1.415 1.145-2.56 2.56-2.56a2.56 2.56 0 1 1 0 5.12c-1.415 0-2.56-1.145-2.56-2.56" />
      </svg>
    ),
    zapier: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-16.5L6.666 12 12 16.5V14h3.995a.441.441 0 0 0 .311-.105.414.414 0 0 0 .004-.671l-.127-.089L11.804 9.5h-2.45L12 5.5v2h4.005a.441.441 0 0 0 .311-.105.414.414 0 0 0 .004-.671l-.127-.089L12.811 3.5H12z" />
      </svg>
    ),
    "google-analytics": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.627 12.572a1.745 1.745 0 0 1-1.749-1.739 1.744 1.744 0 0 1 1.749-1.739c.963 0 1.75.781 1.75 1.74 0 .959-.787 1.738-1.75 1.738zm11.807 6.194h-3.499v-6.478c0-.96-.786-1.739-1.749-1.739-.963 0-1.75.78-1.75 1.739v6.478h-3.5V6.873c0-.959-.786-1.739-1.748-1.739-.963 0-1.75.78-1.75 1.739v11.893H0v-11.772C0 3.177 3.186 0 7.002 0c1.842 0 3.537.724 4.79 1.891C13.049.724 14.743 0 16.587 0c3.815 0 7.001 3.177 7.001 6.994v11.772h-6.154z" />
      </svg>
    ),
    api: <CodeBracketIcon className="w-6 h-6" />,
    "microsoft-teams": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.294 5.5h-3.837a3.551 3.551 0 0 1-3.548-3.549A1.95 1.95 0 0 0 9.957 0H4.271a1.95 1.95 0 0 0-1.951 1.952v13.932a1.95 1.95 0 0 0 1.951 1.951h5.688a1.95 1.95 0 0 0 1.949-1.951v-4.624h7.386c1.355 0 2.455-1.101 2.455-2.456V7.956C21.749 6.601 20.648 5.5 19.294 5.5z" />
      </svg>
    ),
    salesforce: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.224 6.493C9.118 3.765 10.812.826 13.794.182c2.98-.644 5.897 1.424 6.463 4.596 1.14-1.295 2.91-1.942 4.52-1.68 1.606.26 2.973 1.374 3.539 2.885.565 1.512.336 3.23-.592 4.526 1.616 1.473 2.029 3.812 1.026 5.69-.997 1.86-3.113 2.894-5.278 2.596.424 1.72-.19 3.555-1.599 4.71-1.402 1.148-3.375 1.34-5 .482-1.625-.855-2.58-2.603-2.44-4.415-1.77.08-3.43-.88-4.146-2.398-.713-1.52-.369-3.338.86-4.523-1.54-1.273-2.034-3.337-1.24-5.116.79-1.76 2.665-2.751 4.636-2.438-.062-.545-.056-1.097.02-1.64" />
      </svg>
    ),
    magento: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7.654v9.682L7.2 22V11.7l2.4 1.4V22L12 19.6l2.4 2.4V13.1l2.4-1.4V22l5.2-4.664V7.654zm-4.8 12.6l-2.4-1.4v-5.6L7.2 9v5.6zm9.6-1.4l-2.4 1.4V9l2.4-1.4v5.6z" />
      </svg>
    ),
    hubspot: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.389 3.06c-1.38 0-2.728.646-3.265 2.073h-1.99c-.873-1.872-2.366-2.483-3.604-2.483-2.068 0-3.893 1.318-4.378 3.251H3.391v3.201h1.761a8.278 8.278 0 010 1.096H3.391v3.201h1.761c.485 1.933 2.31 3.251 4.378 3.251 1.238 0 2.731-.611 3.604-2.483h1.99c.537 1.428 1.885 2.073 3.265 2.073 2.401 0 4.219-2.334 4.219-4.847v-5.486c0-2.513-1.818-4.847-4.219-4.847zm0 7.181c0 1.096-.41 2.26-1.417 2.26-.544 0-.958-.426-.958-1.164 0-1.427.485-2.073 1.417-2.073h.958v.977zm-6.264-5.888l-.776 3.676h1.553l-.777-3.676z" />
      </svg>
    ),
    bigcommerce: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.495 1a10.495 10.495 0 1 0 0 20.99 10.495 10.495 0 0 0 0-20.99zm-1.191 15.042H8.76l-.342-1.865h-2.27l-.342 1.865H2.261l2.383-10.094h5.276l2.384 10.094zm6.698-.331c-.56.467-1.298.7-2.216.7-.918 0-1.655-.233-2.214-.7-.558-.466-.838-1.093-.838-1.877 0-.474.083-.87.248-1.187.166-.317.399-.567.7-.75.302-.182.63-.335.986-.457.357-.123.751-.218 1.184-.285a59.398 59.398 0 0 0 1.118-.196v-.242c0-.364-.096-.616-.289-.755-.192-.138-.429-.208-.709-.208-.328 0-.589.079-.781.236-.192.158-.304.367-.335.626l-2.22-.066c.063-.766.411-1.385 1.043-1.857.632-.472 1.502-.708 2.608-.708.55 0 1.041.065 1.472.194.431.13.771.306 1.02.53.248.222.436.497.562.825.127.329.19.687.19 1.078v4.36h-2.142l-.095-.763c-.182.315-.457.559-.825.731zm-6.264-5.888l-.776 3.676h1.553l-.777-3.676z" />
      </svg>
    ),
    default: <QuestionMarkCircleIcon className="w-6 h-6" />,
  };

  // Integration status indicators mapping
  const statusIcons = {
    connected: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    pending: <ClockIcon className="h-5 w-5 text-orange-500" />,
    error: <BellAlertIcon className="h-5 w-5 text-red-500" />,
    comingSoon: <LightBulbIcon className="h-5 w-5 text-purple-500" />,
    new: <TagIcon className="h-5 w-5 text-blue-500" />,
  };

  // Integration statuses with descriptions for tooltips
  const statusDescriptions = {
    connected: "Successfully connected and syncing data",
    pending: "Connection in progress, waiting for authorization",
    error: "Connection error, please check your settings",
    comingSoon: "This integration will be available soon",
    new: "New integration, just released!",
  };

  // Integration data
  const integrationCategories = [
    { id: "all", name: "All Integrations" },
    { id: "cms", name: "CMS & E-commerce" },
    { id: "analytics", name: "Analytics" },
    { id: "marketing", name: "Marketing" },
    { id: "communication", name: "Communication" },
    { id: "custom", name: "Custom & API" },
  ];

  const integrations = [
    {
      id: "wordpress",
      name: "WordPress",
      description:
        "Connect your WordPress site to analyze and optimize your product pages for AI search visibility.",
      logo: integrationIcons.wordpress || "WP",
      category: "cms",
      popular: true,
      connected: true,
      status: "connected",
      isNew: false,
      featured: true,
      features: [
        "Auto-sync product pages and posts",
        "Optimize content directly from WordPress admin",
        "Schedule regular analyses",
        "View AI visibility score in WordPress dashboard",
        "Apply suggestions with one click",
      ],
      setupSteps: [
        "Install the AIVO WordPress plugin",
        "Connect your AIVO account with your API key",
        "Select which post types to analyze (Products, Posts, Pages)",
        "Configure sync frequency settings",
        "Start your first analysis",
      ],
      documentation: "/docs/wordpress-integration",
    },
    {
      id: "shopify",
      name: "Shopify",
      description:
        "Connect your Shopify store to automatically analyze and optimize your product listings for AI search.",
      logo: integrationIcons.shopify || "SH",
      category: "cms",
      popular: true,
      connected: false,
      status: "pending",
      isNew: false,
      featured: true,
      features: [
        "Auto-sync product listings",
        "AI-optimized product descriptions",
        "Visibility score for each product",
        "Bulk optimization for multiple products",
        "Integrated with Shopify admin",
      ],
      setupSteps: [
        "Install AIVO app from Shopify App Store",
        "Authorize access to your store data",
        "Select products to analyze",
        "Configure optimization preferences",
        "Review initial analysis results",
      ],
      documentation: "/docs/shopify-integration",
    },
    {
      id: "woocommerce",
      name: "WooCommerce",
      description:
        "Optimize your WooCommerce product listings for AI search systems with automatic sync and optimization.",
      logo: integrationIcons.woocommerce || "WC",
      category: "cms",
      popular: false,
      connected: false,
      status: null,
      isNew: false,
      features: [
        "Seamless WordPress integration",
        "Product category optimization",
        "Custom attribute analysis",
        "SEO and AI visibility combined approach",
        "Bulk product import",
      ],
      setupSteps: [
        "Install the AIVO for WooCommerce plugin",
        "Connect with your AIVO API credentials",
        "Configure product sync settings",
        "Select optimization preferences",
        "Review suggestions dashboard",
      ],
      documentation: "/docs/woocommerce-integration",
    },
    {
      id: "magento",
      name: "Magento",
      description:
        "Integrate AIVO with Adobe Commerce/Magento to enhance product visibility in AI-powered search engines.",
      logo: integrationIcons.magento || "MG",
      category: "cms",
      popular: false,
      connected: false,
      status: null,
      isNew: false,
      comingSoon: true,
      features: [
        "Product catalog synchronization",
        "Advanced attribute optimization",
        "Schedule automated analyses",
        "Customized AI visibility strategies",
        "Multi-store support",
      ],
      setupSteps: [
        "Install AIVO extension from Magento Marketplace",
        "Enter your AIVO API credentials",
        "Configure sync settings for products",
        "Set up automated optimization schedule",
        "Review initial product analyses",
      ],
      documentation: "/docs/magento-integration",
    },
    {
      id: "bigcommerce",
      name: "BigCommerce",
      description:
        "Enhance your BigCommerce store with AI search visibility optimization and analytics.",
      logo: integrationIcons.bigcommerce || "BC",
      category: "cms",
      popular: false,
      connected: false,
      status: null,
      isNew: false,
      comingSoon: true,
      features: [
        "Automated product syncing",
        "AI visibility scoring for products",
        "Content enhancement suggestions",
        "Competitor analysis",
        "Scheduled optimization",
      ],
      setupSteps: [
        "Install AIVO app from BigCommerce App Marketplace",
        "Connect your AIVO account",
        "Configure sync preferences",
        "Select products for analysis",
        "Implement suggested optimizations",
      ],
      documentation: "/docs/bigcommerce-integration",
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      description:
        "Connect Google Analytics to correlate AI visibility improvements with actual site performance metrics.",
      logo: integrationIcons["google-analytics"] || "GA",
      category: "analytics",
      popular: true,
      connected: false,
      status: "error",
      isNew: false,
      featured: true,
      features: [
        "Integration with GA4 or Universal Analytics",
        "Correlation of visibility scores with traffic",
        "Conversion tracking for optimized products",
        "Custom dimensions for AI visibility metrics",
        "Automated performance reporting",
      ],
      setupSteps: [
        "Navigate to Integrations section in AIVO dashboard",
        "Select Google Analytics integration",
        "Authorize AIVO to access your Google Analytics account",
        "Select your GA property and view",
        "Configure custom dimensions and metrics",
      ],
      documentation: "/docs/google-analytics-integration",
    },
    {
      id: "slack",
      name: "Slack",
      description:
        "Get real-time notifications and reports directly in your team's Slack workspace.",
      logo: integrationIcons.slack || "SL",
      category: "communication",
      popular: true,
      connected: false,
      status: null,
      isNew: true,
      features: [
        "Real-time optimization alerts",
        "Weekly report summaries",
        "AI trend notifications",
        "Interactive commands for quick insights",
        "Team collaboration on optimization tasks",
      ],
      setupSteps: [
        "Go to Notification settings in AIVO",
        "Select Slack integration",
        "Authorize AIVO for your Slack workspace",
        "Choose which channels to send notifications to",
        "Configure notification preferences",
      ],
      documentation: "/docs/slack-integration",
    },
    {
      id: "zapier",
      name: "Zapier",
      description:
        "Connect AIVO to 3,000+ apps and automate your AI optimization workflows.",
      logo: integrationIcons.zapier || "ZP",
      category: "custom",
      popular: true,
      connected: false,
      status: null,
      isNew: false,
      featured: true,
      features: [
        "Connect with thousands of applications",
        "Create custom automation workflows",
        "Trigger actions based on AI visibility changes",
        "Automate reporting and notifications",
        "No-code integration solutions",
      ],
      setupSteps: [
        "Create a Zapier account if you don't have one",
        "Generate an AIVO API key in your account settings",
        "Create a new Zap using AIVO as a trigger or action",
        "Configure your workflow automation",
        "Test your Zap and activate it",
      ],
      documentation: "/docs/zapier-integration",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description:
        "Integrate AI visibility data with your Salesforce CRM for comprehensive product insights.",
      logo: integrationIcons.salesforce || "SF",
      category: "marketing",
      popular: false,
      connected: false,
      status: null,
      isNew: false,
      comingSoon: true,
      features: [
        "Product visibility data in Salesforce",
        "Optimization tasks as Salesforce tasks",
        "Custom reports and dashboards",
        "Integration with Marketing Cloud",
        "Lead scoring based on product visibility",
      ],
      setupSteps: [
        "Install AIVO package from Salesforce AppExchange",
        "Configure API connection with your AIVO account",
        "Map AIVO products to Salesforce objects",
        "Set up data synchronization schedule",
        "Configure custom reports and dashboards",
      ],
      documentation: "/docs/salesforce-integration",
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description:
        "Connect AIVO with HubSpot to enhance your inbound marketing with AI visibility insights.",
      logo: integrationIcons.hubspot || "HS",
      category: "marketing",
      popular: false,
      connected: false,
      status: null,
      isNew: true,
      features: [
        "Product visibility data in HubSpot CRM",
        "Content optimization workflows",
        "Campaign performance correlation",
        "Custom properties for AI visibility metrics",
        "Automated task creation for optimization",
      ],
      setupSteps: [
        "Install AIVO app from HubSpot Marketplace",
        "Connect your AIVO account",
        "Configure data synchronization settings",
        "Create custom properties for visibility metrics",
        "Set up automation workflows",
      ],
      documentation: "/docs/hubspot-integration",
    },
    {
      id: "api",
      name: "Custom API",
      description:
        "Use our comprehensive API to build custom integrations with your own systems and applications.",
      logo: integrationIcons.api || "</>",
      category: "custom",
      popular: true,
      connected: true,
      status: "connected",
      isNew: false,
      featured: true,
      features: [
        "Complete REST API access",
        "Webhook support for real-time events",
        "SDKs for major programming languages",
        "Detailed API documentation",
        "Developer support",
      ],
      setupSteps: [
        "Generate API key in your AIVO account settings",
        "Review our API documentation",
        "Make test API calls with our interactive console",
        "Set up webhooks for real-time notifications",
        "Implement your custom integration",
      ],
      documentation: "/docs/api-reference",
    },
    {
      id: "microsoft-teams",
      name: "Microsoft Teams",
      description:
        "Receive AIVO notifications and reports directly in your Microsoft Teams channels.",
      logo: integrationIcons["microsoft-teams"] || "MT",
      category: "communication",
      popular: false,
      connected: false,
      status: null,
      isNew: true,
      features: [
        "Channel notifications for important events",
        "Weekly report summaries",
        "Interactive commands via Teams bot",
        "Task assignments for optimization activities",
        "Team collaboration on product improvements",
      ],
      setupSteps: [
        "Go to Integrations section in AIVO",
        "Select Microsoft Teams integration",
        "Follow the Microsoft authentication flow",
        "Select which Teams channels to connect",
        "Configure notification preferences",
      ],
      documentation: "/docs/microsoft-teams-integration",
    },
  ];

  // Featured integrations
  const featuredIntegrations = integrations.filter((i) => i.featured);

  // Recent integrations (newest first)
  const recentIntegrations = integrations.filter((i) => i.isNew);

  // Animation for fading in sections when they become visible
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Section visible:", entry.target.id); // Debug logging
        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    });

    // Apply observer to all sections that need animation
    const sections = document.querySelectorAll(".observe-section");
    sections.forEach((section) => {
      if (section.id) {
        observer.observe(section);
      } else {
        console.warn("Section without ID found:", section);
      }
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Filter integrations based on active category and search query
  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory =
      activeCategory === "all" || integration.category === activeCategory;
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Handle integration modal
  const handleIntegrationClick = (integration) => {
    console.log("Opening modal for integration:", integration.name);
    setSelectedIntegration(integration);
    setActiveTab("overview");
  };

  // Learn more button handler - modified to ensure modal opens properly
  const handleLearnMoreClick = (integration, e) => {
    e.stopPropagation(); // Prevent parent click event
    console.log("Learn more clicked for:", integration.name);
    handleIntegrationClick(integration);
  };

  const closeIntegrationModal = () => {
    setSelectedIntegration(null);
  };

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotificationQueue((prev) => [...prev, { id, message, type }]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotificationQueue((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const handleConnectClick = (integration, e) => {
    e.stopPropagation(); // Prevent opening the modal
    setConnectingIntegration(integration);
    setShowConnectModal(true);
    setConnectionStep(1);
    setConnectionProgress(0);
  };

  const handleManageClick = (integration, e) => {
    e.stopPropagation(); // Prevent opening the modal
    setSelectedIntegration(integration);
    setActiveTab("setup");
  };

  const handleNotifyClick = (integration, e) => {
    e.stopPropagation(); // Prevent opening the modal
    setConnectingIntegration(integration);
    setShowNotifyModal(true);
  };

  const handleConnectionNext = () => {
    if (connectionStep < 3) {
      setConnectionStep((prev) => prev + 1);
      setConnectionProgress((prev) => prev + 33);
    } else {
      const updatedIntegrations = integrations.map((i) =>
        i.id === connectingIntegration.id
          ? { ...i, connected: true, status: "connected", comingSoon: false }
          : i
      );

      addNotification(
        `Successfully connected to ${connectingIntegration.name}!`
      );
      setShowConnectModal(false);
      setConnectingIntegration(null);
      setConnectionStep(1);
      setConnectionProgress(0);
    }
  };

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (notifyEmail && connectingIntegration) {
      setNotifyList((prev) => [
        ...prev,
        {
          email: notifyEmail,
          integration: connectingIntegration.id,
        },
      ]);
      addNotification(
        `You'll be notified when ${connectingIntegration.name} is available!`
      );
      setShowNotifyModal(false);
      setNotifyEmail("");
      setConnectingIntegration(null);
    }
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    addNotification("Your integration request has been submitted!", "success");
    setShowContactForm(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
      integration: "",
    });
  };

  const handleSyncNow = (integration) => {
    addNotification(`Syncing ${integration.name}...`, "info");

    setTimeout(() => {
      addNotification(`${integration.name} synced successfully!`, "success");
    }, 2000);
  };

  const handleDisconnect = (integration) => {
    addNotification(`${integration.name} has been disconnected.`, "info");
    closeIntegrationModal();
  };

  return (
    <div className={`pb-20 ${isDarkMode ? "text-gray-100" : ""}`}>
      {/* Notification system */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence>
          {notificationQueue.map((notification) => (
            <motion.div
              key={notification.id}
              className={`px-4 py-3 rounded-lg shadow-lg flex items-center justify-between ${
                notification.type === "success"
                  ? isDarkMode
                    ? "bg-green-900 text-green-100"
                    : "bg-green-100 text-green-800 border-l-4 border-green-500"
                  : notification.type === "error"
                  ? isDarkMode
                    ? "bg-red-900 text-red-100"
                    : "bg-red-100 text-red-800 border-l-4 border-red-500"
                  : isDarkMode
                  ? "bg-blue-900 text-blue-100"
                  : "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
              }`}
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <p>{notification.message}</p>
              <button
                onClick={() =>
                  setNotificationQueue((prev) =>
                    prev.filter((n) => n.id !== notification.id)
                  )
                }
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header Section */}
      <section
        className={`py-16 ${
          isDarkMode
            ? "bg-gray-900"
            : "bg-gradient-to-b from-indigo-50 to-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Powerful Integrations for{" "}
              <span className="text-indigo-600 dark:text-indigo-400">AIVO</span>
            </motion.h1>
            <motion.p
              className={`text-xl mb-8 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Connect AIVO with your favorite platforms to streamline your
              workflow and maximize AI search visibility
            </motion.p>

            <motion.div
              className={`flex flex-col md:flex-row justify-center gap-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Easy to setup</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Seamless data sync</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Secure connections</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Integrations */}
      <section
        className={`py-12 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        id="featured-integrations-section"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center">
                <StarIcon className="h-6 w-6 mr-2 text-yellow-500" />
                Featured Integrations
              </h2>
              <Link
                to="/integrations/featured"
                className={`text-sm font-medium flex items-center ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                View all featured
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredIntegrations.map((integration) => (
                <motion.div
                  key={integration.id}
                  className={`rounded-xl overflow-hidden shadow-md transition hover:shadow-lg ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-700/90"
                      : "bg-white hover:bg-gray-50"
                  } cursor-pointer group`}
                  whileHover={{ y: -5 }}
                  onClick={() => handleIntegrationClick(integration)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 flex items-center justify-center text-lg font-medium rounded-lg ${
                            isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                          } text-indigo-600 dark:text-indigo-400 mr-3`}
                        >
                          {integration.logo}
                        </div>
                        <h3 className="text-lg font-medium">
                          {integration.name}
                        </h3>
                      </div>

                      {integration.status && (
                        <Tooltip
                          content={statusDescriptions[integration.status]}
                          position="top"
                        >
                          <div className="flex items-center">
                            {statusIcons[integration.status]}
                          </div>
                        </Tooltip>
                      )}
                    </div>

                    <p
                      className={`text-sm line-clamp-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {integration.description}
                    </p>

                    <div
                      className={`mt-3 pt-2 border-t ${
                        isDarkMode ? "border-gray-600" : "border-gray-100"
                      }`}
                    >
                      <button
                        className={`w-full flex items-center justify-center py-1 text-sm font-medium rounded-md ${
                          integration.connected
                            ? isDarkMode
                              ? "text-green-400 hover:bg-green-900/20"
                              : "text-green-700 hover:bg-green-50"
                            : isDarkMode
                            ? "text-indigo-400 hover:bg-indigo-900/20"
                            : "text-indigo-600 hover:bg-indigo-50"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (integration.connected) {
                            handleManageClick(integration, e);
                          } else if (integration.comingSoon) {
                            handleNotifyClick(integration, e);
                          } else {
                            handleConnectClick(integration, e);
                          }
                        }}
                      >
                        {integration.connected ? (
                          <>
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Connected
                          </>
                        ) : integration.comingSoon ? (
                          <>
                            <LightBulbIcon className="h-4 w-4 mr-1" />
                            Coming Soon
                          </>
                        ) : (
                          <>
                            <PlusIcon className="h-4 w-4 mr-1" />
                            Connect
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Integrations */}
      {recentIntegrations.length > 0 && (
        <section
          className={`py-10 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          } observe-section`}
          id="recent-integrations-section"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <TagIcon className="h-6 w-6 mr-2 text-blue-500" />
                  New Integrations
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentIntegrations.map((integration) => (
                  <motion.div
                    key={integration.id}
                    className={`rounded-xl overflow-hidden shadow-md transition ${
                      isDarkMode
                        ? "bg-gray-800 border border-blue-900/30"
                        : "bg-white border border-blue-100"
                    } cursor-pointer relative`}
                    whileHover={{ y: -3 }}
                    onClick={() => handleIntegrationClick(integration)}
                  >
                    <div className="absolute top-0 right-0">
                      <div
                        className={`px-3 py-1 text-xs font-medium ${
                          isDarkMode
                            ? "bg-blue-900/60 text-blue-200"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        New
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div
                          className={`w-10 h-10 flex items-center justify-center text-lg font-medium rounded-lg ${
                            isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                          } text-indigo-600 dark:text-indigo-400 mr-3`}
                        >
                          {integration.logo}
                        </div>
                        <h3 className="text-lg font-medium">
                          {integration.name}
                        </h3>
                      </div>

                      <p
                        className={`text-sm mb-3 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {integration.description}
                      </p>

                      <button
                        className={`flex items-center text-sm font-medium ${
                          isDarkMode ? "text-indigo-400" : "text-indigo-600"
                        }`}
                        onClick={(e) => handleLearnMoreClick(integration, e)}
                      >
                        Learn more
                        <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Category Filter */}
      <section className={`py-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {integrationCategories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === category.id
                      ? isDarkMode
                        ? "bg-indigo-700 text-white"
                        : "bg-indigo-100 text-indigo-700"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-700/70"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div
              className={`w-full md:w-64 relative ${
                isDarkMode ? "text-white" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Search integrations..."
                className={`w-full pl-4 pr-10 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                    : "bg-white border-gray-300 placeholder-gray-500"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className={`absolute right-3 top-2.5 h-5 w-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Cards */}
      <section className={`py-12 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          {filteredIntegrations.length === 0 ? (
            <div className="text-center py-16">
              <div
                className={`text-6xl mb-4 ${
                  isDarkMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <QuestionMarkCircleIcon className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-medium mb-2">
                No integrations found
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Try adjusting your search query or filters
              </p>
              <button
                className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {activeCategory === "cms" && (
                <div className="mb-12 overflow-hidden">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2 text-indigo-500" />
                    Compare CMS Integrations
                  </h3>
                  <div className="overflow-x-auto">
                    <table
                      className={`w-full border-collapse ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <thead
                        className={`${
                          isDarkMode ? "bg-gray-800" : "bg-gray-100"
                        }`}
                      >
                        <tr>
                          <th className="p-3 text-left">Platform</th>
                          <th className="p-3 text-center">Auto-sync</th>
                          <th className="p-3 text-center">AI Optimization</th>
                          <th className="p-3 text-center">Product Analytics</th>
                          <th className="p-3 text-center">Bulk Operations</th>
                          <th className="p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {integrations
                          .filter((i) => i.category === "cms")
                          .map((integration, idx) => (
                            <tr
                              key={integration.id}
                              className={`${
                                idx % 2 === 0
                                  ? isDarkMode
                                    ? "bg-gray-800/50"
                                    : "bg-white"
                                  : isDarkMode
                                  ? "bg-gray-800"
                                  : "bg-gray-50"
                              } cursor-pointer hover:${
                                isDarkMode ? "bg-gray-700" : "bg-gray-100"
                              }`}
                              onClick={() =>
                                handleIntegrationClick(integration)
                              }
                            >
                              <td className="p-3 border-t border-b border-gray-700">
                                <div className="flex items-center">
                                  <div
                                    className={`w-8 h-8 flex items-center justify-center text-lg font-medium rounded-lg ${
                                      isDarkMode
                                        ? "bg-indigo-900"
                                        : "bg-indigo-100"
                                    } text-indigo-600 dark:text-indigo-400 mr-2`}
                                  >
                                    {integration.logo}
                                  </div>
                                  <span className="font-medium">
                                    {integration.name}
                                  </span>
                                  {integration.comingSoon && (
                                    <span
                                      className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                                        isDarkMode
                                          ? "bg-purple-900/40 text-purple-300"
                                          : "bg-purple-100 text-purple-700"
                                      }`}
                                    >
                                      Coming Soon
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 text-center border-t border-b border-gray-700">
                                {integration.features.some((f) =>
                                  f.toLowerCase().includes("sync")
                                ) ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                                ) : (
                                  <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                                )}
                              </td>
                              <td className="p-3 text-center border-t border-b border-gray-700">
                                {integration.features.some((f) =>
                                  f.toLowerCase().includes("optim")
                                ) ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                                ) : (
                                  <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                                )}
                              </td>
                              <td className="p-3 text-center border-t border-b border-gray-700">
                                {integration.features.some(
                                  (f) =>
                                    f.toLowerCase().includes("analytic") ||
                                    f.toLowerCase().includes("score")
                                ) ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                                ) : (
                                  <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                                )}
                              </td>
                              <td className="p-3 text-center border-t border-b border-gray-700">
                                {integration.features.some((f) =>
                                  f.toLowerCase().includes("bulk")
                                ) ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500 mx-auto" />
                                ) : (
                                  <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                                )}
                              </td>
                              <td className="p-3 text-center border-t border-b border-gray-700">
                                {integration.connected ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                    Connected
                                  </span>
                                ) : integration.comingSoon ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                    Coming Soon
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    Available
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filteredIntegrations.map((integration, index) => (
                  <motion.div
                    key={integration.id}
                    className={`rounded-xl overflow-hidden shadow-md transition hover:shadow-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-800/80"
                        : "bg-white hover:bg-gray-50"
                    } cursor-pointer`}
                    variants={fadeInUp}
                    onClick={() => handleIntegrationClick(integration)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-12 flex items-center justify-center text-lg font-medium rounded-lg ${
                              isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                            } text-indigo-600 dark:text-indigo-400 mr-3`}
                          >
                            {integration.logo}
                          </div>
                          <div>
                            <h3 className="text-xl font-medium">
                              {integration.name}
                              {integration.comingSoon && (
                                <span
                                  className={`ml-2 text-xs px-2 py-1 rounded-full ${
                                    isDarkMode
                                      ? "bg-gray-700 text-gray-300"
                                      : "bg-gray-200 text-gray-600"
                                  }`}
                                >
                                  Coming Soon
                                </span>
                              )}
                            </h3>
                            {integration.popular && !integration.comingSoon && (
                              <span
                                className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                                  isDarkMode
                                    ? "bg-indigo-900/50 text-indigo-300"
                                    : "bg-indigo-100 text-indigo-800"
                                }`}
                              >
                                Popular
                              </span>
                            )}
                            {integration.isNew && (
                              <span
                                className={`inline-block ml-1 text-xs px-2 py-0.5 rounded-full ${
                                  isDarkMode
                                    ? "bg-blue-900/50 text-blue-300"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                New
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          {integration.status && (
                            <Tooltip
                              content={statusDescriptions[integration.status]}
                              position="top"
                            >
                              <div className="flex items-center">
                                {statusIcons[integration.status]}
                              </div>
                            </Tooltip>
                          )}
                        </div>
                      </div>

                      <p
                        className={`mb-4 line-clamp-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {integration.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {integrationCategories.find(
                            (cat) => cat.id === integration.category
                          )?.name || integration.category}
                        </span>
                        <button
                          className={`text-sm font-medium flex items-center ${
                            integration.connected
                              ? isDarkMode
                                ? "text-green-400"
                                : "text-green-600"
                              : isDarkMode
                              ? "text-indigo-400"
                              : "text-indigo-600"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (integration.connected) {
                              handleManageClick(integration, e);
                            } else if (integration.comingSoon) {
                              handleNotifyClick(integration, e);
                            } else {
                              handleLearnMoreClick(integration, e);
                            }
                          }}
                        >
                          {integration.connected ? (
                            <>
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Manage
                            </>
                          ) : integration.comingSoon ? (
                            <>
                              <BellAlertIcon className="h-4 w-4 mr-1" />
                              Notify me
                            </>
                          ) : (
                            <>
                              Learn more
                              <ArrowRightIcon className="h-4 w-4 ml-1" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Custom API and Webhook Section */}
      <section
        className={`py-16 observe-section ${
          isDarkMode ? "bg-gray-800" : "bg-indigo-50"
        }`}
        id="custom-integration-section"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["custom-integration-section"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5 }}
              >
                Build Custom Integrations
              </motion.h2>
              <motion.p
                className={`text-xl max-w-3xl mx-auto ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["custom-integration-section"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Need something more specific? Use our robust API to build
                tailored integrations for your business needs
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } shadow-md`}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isVisible["custom-integration-section"]
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                    isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                  } text-indigo-600 mb-4`}
                >
                  <CodeBracketIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-4">REST API</h3>
                <p
                  className={`mb-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Our comprehensive REST API enables you to integrate AIVO's
                  powerful AI search optimization capabilities into your
                  existing workflows and systems.
                </p>
                <ul
                  className={`space-y-2 mb-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Full CRUD operations for products and analyses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Secure authentication with API keys</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Rate limits suitable for enterprise use</span>
                  </li>
                </ul>
                <Link
                  to="/api-documentation"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center"
                >
                  View API Documentation
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>

              <motion.div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } shadow-md`}
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isVisible["custom-integration-section"]
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                    isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                  } text-indigo-600 mb-4`}
                >
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-4">Webhooks</h3>
                <p
                  className={`mb-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Receive real-time notifications about important events in
                  AIVO, allowing your systems to react instantly to changes in
                  AI visibility.
                </p>
                <ul
                  className={`space-y-2 mb-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Event-based triggers for real-time updates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Customizable event subscriptions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Secure payload delivery with signatures</span>
                  </li>
                </ul>
                <Link
                  to="/webhook-setup"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center"
                >
                  Configure Webhooks
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            </div>

            {/* Custom Integration Request */}
            <div className="mt-12 pt-10 border-t border-gray-700/30">
              <motion.div
                className={`rounded-xl overflow-hidden shadow-lg ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["custom-integration-section"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold mb-2 flex items-center">
                        <ServerIcon className="h-5 w-5 mr-2 text-indigo-500" />
                        Need a Custom Integration?
                      </h3>
                      <p
                        className={`${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Don't see the platform you need? Our team can build a
                        custom integration for your business.
                      </p>
                    </div>
                    <button
                      className={`px-5 py-2 rounded-lg font-medium ${
                        isDarkMode
                          ? "bg-indigo-700 hover:bg-indigo-600 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      } transition-colors`}
                      onClick={() => setShowContactForm(!showContactForm)}
                    >
                      {showContactForm ? "Hide Form" : "Request Integration"}
                    </button>
                  </div>

                  {showContactForm && (
                    <motion.div
                      className={`${
                        isDarkMode ? "bg-gray-800" : "bg-gray-50"
                      } p-6 rounded-lg`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-lg font-medium mb-4">
                        Custom Integration Request
                      </h4>
                      <form onSubmit={handleRequestSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium mb-1"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              className={`w-full rounded-lg border ${
                                isDarkMode
                                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                              } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                              placeholder="Your name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium mb-1"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className={`w-full rounded-lg border ${
                                isDarkMode
                                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                              } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="company"
                              className="block text-sm font-medium mb-1"
                            >
                              Company
                            </label>
                            <input
                              type="text"
                              id="company"
                              className={`w-full rounded-lg border ${
                                isDarkMode
                                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                              } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                              placeholder="Your company"
                              value={formData.company}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  company: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="integration"
                              className="block text-sm font-medium mb-1"
                            >
                              Integration Platform
                            </label>
                            <input
                              type="text"
                              id="integration"
                              className={`w-full rounded-lg border ${
                                isDarkMode
                                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                              } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                              placeholder="Platform to integrate with"
                              value={formData.integration}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  integration: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium mb-1"
                          >
                            Details
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className={`w-full rounded-lg border ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            placeholder="Please describe your integration requirements..."
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className={`px-6 py-2 rounded-lg font-medium ${
                              isDarkMode
                                ? "bg-indigo-700 hover:bg-indigo-600 text-white"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            } transition-colors`}
                          >
                            Submit Request
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className={`py-16 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } observe-section`}
        id="faq-section"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible["faq-section"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  question:
                    "How do integrations help improve my AI visibility?",
                  answer:
                    "Integrations allow AIVO to seamlessly connect with your existing platforms and content management systems, enabling automatic analysis and optimization of your product content. This ensures that all your product information is consistently optimized for AI search visibility without requiring manual work.",
                },
                {
                  question: "Is there an additional cost for integrations?",
                  answer:
                    "Basic integrations are included with all AIVO plans at no extra cost. Premium integrations with advanced features may be available only on Professional and Enterprise plans. Custom API usage may have rate limits depending on your plan level.",
                },
                {
                  question: "How secure are these integrations?",
                  answer:
                    "All integrations use secure OAuth 2.0 authentication or API keys with encrypted connections. We maintain strict data security practices and never store sensitive credentials in plain text. All data transfers are encrypted using industry-standard protocols.",
                },
                {
                  question: "Can I build my own custom integration?",
                  answer:
                    "Yes! We provide a comprehensive REST API and webhook system that allows you to build custom integrations with any platform. Our developer documentation includes examples and SDKs for popular programming languages to make custom integration development easier.",
                },
                {
                  question: "How often does data sync between systems?",
                  answer:
                    "The synchronization frequency depends on the specific integration and your plan level. Most integrations offer real-time, hourly, daily, or weekly sync options. You can configure these settings in each integration's settings panel.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className={`rounded-lg overflow-hidden border ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isVisible["faq-section"]
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <details className="group">
                    <summary
                      className={`flex items-center justify-between cursor-pointer p-6 ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-gray-800/80"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <h3 className="text-lg font-medium">{faq.question}</h3>
                      <span
                        className={`ml-6 flex-shrink-0 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <svg
                          className="h-6 w-6 transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div
                      className={`p-6 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-16 ${
          isDarkMode
            ? "bg-indigo-900"
            : "bg-gradient-to-br from-indigo-600 to-indigo-700"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ready to Connect Your Platforms?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 text-indigo-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get started today and see how AIVO integrations can streamline
              your AI visibility optimization
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/register"
                className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Create Account
              </Link>
              <Link
                to="/contact"
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-colors"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Detail Modal */}
      {selectedIntegration && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={closeIntegrationModal}
            ></div>

            {/* Modal panel */}
            <div
              className={`inline-block align-bottom ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full`}
            >
              {/* Modal header */}
              <div
                className={`${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                } px-4 py-5 sm:px-6 flex justify-between items-center`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 flex items-center justify-center text-lg font-medium rounded-lg ${
                      isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                    } text-indigo-600 dark:text-indigo-400 mr-3`}
                  >
                    {selectedIntegration.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">
                      {selectedIntegration.name}
                    </h3>
                    {selectedIntegration.status && (
                      <span
                        className={`inline-flex items-center text-sm ${
                          selectedIntegration.status === "connected"
                            ? "text-green-500"
                            : selectedIntegration.status === "pending"
                            ? "text-orange-500"
                            : selectedIntegration.status === "error"
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {statusIcons[selectedIntegration.status]}
                        <span className="ml-1">
                          {selectedIntegration.status === "connected"
                            ? "Connected"
                            : selectedIntegration.status === "pending"
                            ? "Connection Pending"
                            : selectedIntegration.status === "error"
                            ? "Connection Error"
                            : "Not Connected"}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className={`${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-600 hover:bg-gray-200"
                  } rounded-full p-1`}
                  onClick={closeIntegrationModal}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Tabs navigation */}
              <div
                className={`border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <nav className="flex -mb-px">
                  <button
                    className={`px-4 py-2 text-center text-sm font-medium border-b-2 ${
                      activeTab === "overview"
                        ? isDarkMode
                          ? "border-indigo-500 text-indigo-400"
                          : "border-indigo-600 text-indigo-700"
                        : isDarkMode
                        ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-2 text-center text-sm font-medium border-b-2 ${
                      activeTab === "features"
                        ? isDarkMode
                          ? "border-indigo-500 text-indigo-400"
                          : "border-indigo-600 text-indigo-700"
                        : isDarkMode
                        ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("features")}
                  >
                    Features
                  </button>
                  <button
                    className={`px-4 py-2 text-center text-sm font-medium border-b-2 ${
                      activeTab === "setup"
                        ? isDarkMode
                          ? "border-indigo-500 text-indigo-400"
                          : "border-indigo-600 text-indigo-700"
                        : isDarkMode
                        ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("setup")}
                  >
                    Setup Guide
                  </button>
                  <button
                    className={`px-4 py-2 text-center text-sm font-medium border-b-2 ${
                      activeTab === "documentation"
                        ? isDarkMode
                          ? "border-indigo-500 text-indigo-400"
                          : "border-indigo-600 text-indigo-700"
                        : isDarkMode
                        ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("documentation")}
                  >
                    Documentation
                  </button>
                </nav>
              </div>

              <div className="px-4 py-5 sm:p-6">
                {/* Tab content will be rendered here based on activeTab */}
                {activeTab === "overview" && selectedIntegration && (
                  <div>
                    <p
                      className={`mb-6 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {selectedIntegration.description}
                    </p>

                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <div>
                        <h4 className="text-sm font-medium mb-2">Category</h4>
                        <p
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {
                            integrationCategories.find(
                              (cat) => cat.id === selectedIntegration.category
                            )?.name
                          }
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Status</h4>
                        <p
                          className={`${
                            selectedIntegration.connected
                              ? "text-green-500"
                              : selectedIntegration.comingSoon
                              ? isDarkMode
                                ? "text-purple-400"
                                : "text-purple-600"
                              : isDarkMode
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {selectedIntegration.connected
                            ? "Connected"
                            : selectedIntegration.comingSoon
                            ? "Coming Soon"
                            : "Available for Connection"}
                        </p>
                      </div>
                      {selectedIntegration.popular && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Popularity
                          </h4>
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <StarIcon
                              className={`h-4 w-4 ${
                                isDarkMode ? "text-gray-600" : "text-gray-300"
                              } mr-1`}
                            />
                            <span className="ml-1 text-sm">Popular</span>
                          </div>
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Last Updated
                        </h4>
                        <p
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {selectedIntegration.isNew
                            ? "1 week ago"
                            : "2 months ago"}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      } flex items-center justify-between mb-4`}
                    >
                      <div>
                        <h4 className="font-medium">Integration Reliability</h4>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                              className={`${
                                selectedIntegration.comingSoon
                                  ? "bg-gray-500 w-0"
                                  : selectedIntegration.status === "error"
                                  ? "bg-red-500 w-1/4"
                                  : selectedIntegration.status === "pending"
                                  ? "bg-orange-500 w-1/2"
                                  : "bg-green-500 w-full"
                              } h-2.5 rounded-full`}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm">
                            {selectedIntegration.comingSoon
                              ? "Coming Soon"
                              : selectedIntegration.status === "error"
                              ? "Needs Attention"
                              : selectedIntegration.status === "pending"
                              ? "Setup in Progress"
                              : "Excellent"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <ShieldCheckIcon
                          className={`h-8 w-8 ${
                            selectedIntegration.comingSoon
                              ? "text-gray-500"
                              : selectedIntegration.status === "error"
                              ? "text-red-500"
                              : selectedIntegration.status === "pending"
                              ? "text-orange-500"
                              : "text-green-500"
                          }`}
                        />
                      </div>
                    </div>

                    {!selectedIntegration.comingSoon && (
                      <div
                        className={`p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between ${
                          isDarkMode ? "bg-indigo-900/30" : "bg-indigo-50"
                        }`}
                      >
                        <div>
                          <h4
                            className={`font-medium ${
                              isDarkMode ? "text-indigo-300" : "text-indigo-700"
                            }`}
                          >
                            Quick Start Guide
                          </h4>
                          <p
                            className={`text-sm ${
                              isDarkMode
                                ? "text-indigo-200/70"
                                : "text-indigo-600"
                            }`}
                          >
                            Get started with this integration in minutes
                          </p>
                        </div>
                        <button
                          className={`mt-3 sm:mt-0 px-4 py-2 rounded-md text-sm font-medium ${
                            isDarkMode
                              ? "bg-indigo-700 text-white hover:bg-indigo-600"
                              : "bg-indigo-600 text-white hover:bg-indigo-700"
                          }`}
                          onClick={() => setActiveTab("setup")}
                        >
                          View Setup Guide
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "features" && selectedIntegration && (
                  <div>
                    <h4 className="text-lg font-medium mb-4">Key Features</h4>
                    <ul className="space-y-3 mb-6">
                      {selectedIntegration.features &&
                        selectedIntegration.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircleIcon
                              className={`h-5 w-5 mr-2 mt-0.5 ${
                                isDarkMode ? "text-green-400" : "text-green-500"
                              }`}
                            />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                    </ul>

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      } mb-4`}
                    >
                      <h5 className="font-medium mb-2">Benefits</h5>
                      <ul
                        className={`space-y-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <li className="flex items-start">
                          <BoltIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                          <span>
                            Save time with automated content optimization
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ChartBarIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          <span>
                            Improve AI search visibility of your products
                          </span>
                        </li>
                        <li className="flex items-start">
                          <PresentationChartLineIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Track performance improvements over time</span>
                        </li>
                      </ul>
                    </div>

                    {selectedIntegration.limitations && (
                      <div
                        className={`p-4 rounded-lg ${
                          isDarkMode ? "bg-yellow-900/20" : "bg-yellow-50"
                        } border ${
                          isDarkMode
                            ? "border-yellow-900/30"
                            : "border-yellow-200"
                        }`}
                      >
                        <h5
                          className={`font-medium mb-2 ${
                            isDarkMode ? "text-yellow-300" : "text-yellow-800"
                          }`}
                        >
                          Limitations
                        </h5>
                        <ul
                          className={`list-disc pl-5 space-y-1 ${
                            isDarkMode
                              ? "text-yellow-200/70"
                              : "text-yellow-700"
                          }`}
                        >
                          {selectedIntegration.limitations.map(
                            (limitation, i) => (
                              <li key={i}>{limitation}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "setup" && selectedIntegration && (
                  <div>
                    <h4 className="text-lg font-medium mb-4">Setup Process</h4>
                    {selectedIntegration.setupSteps &&
                    selectedIntegration.setupSteps.length > 0 ? (
                      <ol
                        className={`space-y-4 mb-6 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {selectedIntegration.setupSteps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span
                              className={`flex items-center justify-center h-6 w-6 rounded-full text-sm mr-3 mt-0.5 flex-shrink-0 ${
                                isDarkMode
                                  ? "bg-indigo-900 text-indigo-300"
                                  : "bg-indigo-100 text-indigo-800"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <div>
                              <p>{step}</p>
                              {index <
                                selectedIntegration.setupSteps.length - 1 && (
                                <div
                                  className={`ml-3 h-6 border-l-2 ${
                                    isDarkMode
                                      ? "border-gray-700"
                                      : "border-gray-200"
                                  }`}
                                ></div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p
                        className={
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }
                      >
                        No setup steps available for this integration yet.
                      </p>
                    )}

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      } flex items-center justify-between`}
                    >
                      <div>
                        <h4 className="font-medium">Estimated setup time</h4>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {selectedIntegration.setupSteps &&
                          selectedIntegration.setupSteps.length <= 3
                            ? "Less than 5 minutes"
                            : selectedIntegration.setupSteps &&
                              selectedIntegration.setupSteps.length <= 5
                            ? "About 10 minutes"
                            : "15-20 minutes"}
                        </p>
                      </div>
                      <ClockIcon className="h-6 w-6 text-indigo-500" />
                    </div>

                    {!selectedIntegration.connected &&
                      !selectedIntegration.comingSoon && (
                        <div className="mt-6">
                          <button
                            onClick={() =>
                              handleConnectClick(selectedIntegration, {
                                stopPropagation: () => {},
                              })
                            }
                            className={`w-full py-2 rounded-lg ${
                              isDarkMode
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                          >
                            Start Setup Process
                          </button>
                        </div>
                      )}
                  </div>
                )}

                {activeTab === "documentation" && selectedIntegration && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Documentation</h4>
                      {selectedIntegration.documentation && (
                        <Link
                          to={selectedIntegration.documentation}
                          className={`flex items-center text-sm font-medium ${
                            isDarkMode
                              ? "text-indigo-400 hover:text-indigo-300"
                              : "text-indigo-600 hover:text-indigo-700"
                          }`}
                          target="_blank"
                        >
                          <DocumentTextIcon className="h-4 w-4 mr-1" />
                          Open Full Documentation
                        </Link>
                      )}
                    </div>

                    <div
                      className={`p-6 rounded-lg mb-4 ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <h5 className="text-lg font-medium mb-3">
                        Quick Reference
                      </h5>

                      <div className="mb-4">
                        <h6
                          className={`text-sm font-medium mb-2 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          API Endpoint
                        </h6>
                        <div
                          className={`p-2 rounded font-mono text-sm ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-300"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          https://api.aivo.co/v1/integrations/
                          {selectedIntegration.id}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h6
                          className={`text-sm font-medium mb-2 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Required Permissions
                        </h6>
                        <ul
                          className={`list-disc pl-5 space-y-1 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <li>Read access to products</li>
                          <li>Write access for optimization suggestions</li>
                          {selectedIntegration.id === "wordpress" && (
                            <li>Admin access to install plugins</li>
                          )}
                          {selectedIntegration.id === "shopify" && (
                            <li>Store content management</li>
                          )}
                        </ul>
                      </div>

                      <div>
                        <h6
                          className={`text-sm font-medium mb-2 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Support Resources
                        </h6>
                        <div className="space-y-2">
                          <a
                            href="#"
                            className={`flex items-center ${
                              isDarkMode
                                ? "text-indigo-400 hover:text-indigo-300"
                                : "text-indigo-600 hover:text-indigo-700"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              addNotification("Opening installation guide...");
                            }}
                          >
                            <DocumentTextIcon className="h-4 w-4 mr-2" />
                            Installation Guide
                          </a>
                          <a
                            href="#"
                            className={`flex items-center ${
                              isDarkMode
                                ? "text-indigo-400 hover:text-indigo-300"
                                : "text-indigo-600 hover:text-indigo-700"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              addNotification("Opening troubleshooting FAQ...");
                            }}
                          >
                            <DocumentTextIcon className="h-4 w-4 mr-2" />
                            Troubleshooting FAQ
                          </a>
                          <a
                            href="#"
                            className={`flex items-center ${
                              isDarkMode
                                ? "text-indigo-400 hover:text-indigo-300"
                                : "text-indigo-600 hover:text-indigo-700"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              addNotification("Opening video tutorial...");
                            }}
                          >
                            <DocumentTextIcon className="h-4 w-4 mr-2" />
                            Video Tutorial
                          </a>
                        </div>
                      </div>
                    </div>

                    {selectedIntegration.connected && (
                      <div
                        className={`p-4 rounded-lg border ${
                          isDarkMode
                            ? "bg-green-900/20 border-green-800/30 text-green-200"
                            : "bg-green-50 border-green-100 text-green-800"
                        }`}
                      >
                        <div className="flex">
                          <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Integration Active</p>
                            <p className="text-sm mt-1">
                              This integration is properly configured and
                              actively syncing data.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div
                className={`px-4 py-4 sm:px-6 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                } sm:flex sm:flex-row-reverse`}
              >
                {selectedIntegration.connected ? (
                  <>
                    <button
                      type="button"
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                        isDarkMode
                          ? "bg-red-700 text-white hover:bg-red-800"
                          : "bg-red-600 text-white hover:bg-red-700"
                      } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
                      onClick={() => handleDisconnect(selectedIntegration)}
                    >
                      Disconnect
                    </button>
                    <button
                      type="button"
                      className={`mt-3 sm:mt-0 w-full inline-flex justify-center items-center rounded-md border shadow-sm px-4 py-2 ${
                        isDarkMode
                          ? "bg-gray-600 text-white hover:bg-gray-500 border-gray-500"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                      } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
                      onClick={() => handleSyncNow(selectedIntegration)}
                    >
                      <ArrowPathIcon className="h-4 w-4 mr-1" />
                      Sync Now
                    </button>
                    <button
                      type="button"
                      className={`mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-gray-900 border-gray-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                      } text-base font-medium sm:w-auto sm:text-sm`}
                      onClick={() => setActiveTab("setup")}
                    >
                      Configure
                    </button>
                  </>
                ) : (
                  <>
                    {selectedIntegration.comingSoon ? (
                      <button
                        type="button"
                        className={`w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                          isDarkMode
                            ? "bg-purple-700 text-white hover:bg-purple-600"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
                        onClick={() =>
                          handleNotifyClick(selectedIntegration, {
                            stopPropagation: () => {},
                          })
                        }
                      >
                        <BellAlertIcon className="h-4 w-4 mr-1" />
                        Notify When Available
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                          isDarkMode
                            ? "bg-indigo-700 text-white hover:bg-indigo-800"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                        } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
                        onClick={() =>
                          handleConnectClick(selectedIntegration, {
                            stopPropagation: () => {},
                          })
                        }
                      >
                        Connect
                      </button>
                    )}
                    <button
                      type="button"
                      className={`mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-gray-900 border-gray-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                      } text-base font-medium sm:w-auto sm:text-sm`}
                      onClick={closeIntegrationModal}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connection Modal */}
      {showConnectModal && connectingIntegration && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="connect-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowConnectModal(false)}
            ></div>

            {/* Modal panel */}
            <div
              className={`inline-block align-bottom ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
            >
              <div
                className={`${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                } px-4 py-5 sm:px-6 flex justify-between items-center`}
              >
                <h3 className="text-lg font-medium">
                  Connect {connectingIntegration.name}
                </h3>
                <button
                  type="button"
                  className={`${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-600 hover:bg-gray-200"
                  } rounded-full p-1`}
                  onClick={() => setShowConnectModal(false)}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="px-4 py-5 sm:p-6">
                {/* Progress indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Connection progress
                    </span>
                    <span className="text-sm font-medium">
                      {connectionProgress}%
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${connectionProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Connection steps */}
                {connectionStep === 1 && (
                  <div>
                    <h4 className="text-lg font-medium mb-4">Authorization</h4>
                    <p
                      className={`mb-6 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      To connect with {connectingIntegration.name}, we need your
                      permission to:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircleIcon
                          className={`h-5 w-5 mr-2 mt-0.5 ${
                            isDarkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <span>Access your product information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon
                          className={`h-5 w-5 mr-2 mt-0.5 ${
                            isDarkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <span>Read your content data</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon
                          className={`h-5 w-5 mr-2 mt-0.5 ${
                            isDarkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <span>Apply optimization suggestions</span>
                      </li>
                    </ul>

                    <div
                      className={`p-4 rounded-lg ${
                        isDarkMode
                          ? "bg-blue-900/20 border border-blue-800/30"
                          : "bg-blue-50 border border-blue-100"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-blue-200" : "text-blue-700"
                        }`}
                      >
                        You will be redirected to {connectingIntegration.name}{" "}
                        to authorize this connection.
                      </p>
                    </div>
                  </div>
                )}

                {connectionStep === 2 && (
                  <div>
                    <h4 className="text-lg font-medium mb-4">Configuration</h4>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label
                          htmlFor="sync-frequency"
                          className="block text-sm font-medium mb-1"
                        >
                          Sync Frequency
                        </label>
                        <select
                          id="sync-frequency"
                          className={`w-full rounded-lg border ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                          <option>Every 6 hours</option>
                          <option>Every 12 hours</option>
                          <option>Daily</option>
                          <option>Weekly</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="content-types"
                          className="block text-sm font-medium mb-1"
                        >
                          Content Types to Analyze
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="content-products"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              defaultChecked
                            />
                            <label
                              htmlFor="content-products"
                              className="ml-2 text-sm"
                            >
                              Products
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="content-posts"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="content-posts"
                              className="ml-2 text-sm"
                            >
                              Blog Posts
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="content-pages"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="content-pages"
                              className="ml-2 text-sm"
                            >
                              Pages
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {connectionStep === 3 && (
                  <div>
                    <div className="flex justify-center mb-6">
                      <CheckCircleIcon className="h-16 w-16 text-green-500" />
                    </div>
                    <h4 className="text-lg font-medium text-center mb-2">
                      Ready to Connect!
                    </h4>
                    <p
                      className={`text-center mb-6 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Everything is set up. Click Finish to complete the
                      connection process with {connectingIntegration.name}.
                    </p>
                  </div>
                )}
              </div>

              <div
                className={`px-4 py-4 sm:px-6 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                } sm:flex sm:flex-row-reverse`}
              >
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                    isDarkMode
                      ? "bg-indigo-700 text-white hover:bg-indigo-800"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
                  onClick={handleConnectionNext}
                >
                  {connectionStep === 3 ? "Finish" : "Next"}
                </button>
                <button
                  type="button"
                  className={`mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-900 border-gray-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                  } text-base font-medium sm:w-auto sm:text-sm`}
                  onClick={() => setShowConnectModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notify Modal */}
      {showNotifyModal && connectingIntegration && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="notify-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowNotifyModal(false)}
            ></div>

            {/* Modal panel */}
            <div
              className={`inline-block align-bottom ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
            >
              <div
                className={`${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                } px-4 py-5 sm:px-6 flex justify-between items-center`}
              >
                <h3 className="text-lg font-medium">
                  Get Notified: {connectingIntegration.name}
                </h3>
                <button
                  type="button"
                  className={`${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-600 hover:bg-gray-200"
                  } rounded-full p-1`}
                  onClick={() => setShowNotifyModal(false)}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleNotifySubmit}>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-center mb-6">
                    <LightBulbIcon
                      className={`h-16 w-16 ${
                        isDarkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                    />
                  </div>
                  <h4 className="text-lg font-medium text-center mb-2">
                    Coming Soon!
                  </h4>
                  <p
                    className={`text-center mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {connectingIntegration.name} integration is coming soon.
                    Enter your email address to be notified when it's available.
                  </p>

                  <div className="mb-6">
                    <label
                      htmlFor="notify-email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="notify-email"
                      className={`w-full rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="your.email@example.com"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="notify-updates"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      defaultChecked
                    />
                    <label
                      htmlFor="notify-updates"
                      className={`ml-2 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Also send me updates about other new integrations
                    </label>
                  </div>
                </div>

                <div
                  className={`px-4 py-4 sm:px-6 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-50"
                  } sm:flex sm:flex-row-reverse`}
                >
                  <button
                    type="submit"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                      isDarkMode
                        ? "bg-purple-700 text-white hover:bg-purple-800"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
                  >
                    <BellAlertIcon className="h-4 w-4 mr-1" />
                    Notify Me
                  </button>
                  <button
                    type="button"
                    className={`mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-900 border-gray-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    } text-base font-medium sm:w-auto sm:text-sm`}
                    onClick={() => setShowNotifyModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsPage;
