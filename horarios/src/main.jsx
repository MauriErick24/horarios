import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes/routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/global.css";

const reactRouter = createBrowserRouter(router);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={reactRouter} />
  </StrictMode>
);
