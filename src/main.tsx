import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/firago"
import "@fontsource/firago/300.css";
import "@fontsource/firago/500.css";
import "@fontsource/firago/600.css";
import "./index.css";
import Router from "./Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
