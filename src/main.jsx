import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

function mount() {
  const target = document.getElementById("promethee-root") || document.getElementById("root");
  if (!target) {
    console.warn("[promethee] No #promethee-root or #root element found.");
    return;
  }
  ReactDOM.createRoot(target).render(<App />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
