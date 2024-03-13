"use client";
import React, { useEffect } from "react";

const ChatbotWidgetScript: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/bwestwood11/chatbot-widget/bundle/index-4.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.href =
      "https://cdn.jsdelivr.net/gh/bwestwood11/chatbot-widget/bundle/index-4.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (window.Chatbot && document.getElementById("chatbot")) {
      window.Chatbot.mount(document.getElementById("chatbot"), {
        api_key: "d506d9d3-54d6-4674-b051-c84b5b5fd3ad",
      });
    }
  }, []);

  return null;
};

export default ChatbotWidgetScript;
