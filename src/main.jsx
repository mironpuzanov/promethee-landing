import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import DownloadPage from "./DownloadPage.jsx";
import "./index.css";

function pickPage() {
  if (typeof window === "undefined") return <App />;
  const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
  if (path === "/download") return <DownloadPage />;
  return <App />;
}

function mount() {
  const target = document.getElementById("promethee-root") || document.getElementById("root");
  if (!target) {
    console.warn("[promethee] No #promethee-root or #root element found.");
    return;
  }
  ReactDOM.createRoot(target).render(pickPage());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
