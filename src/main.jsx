import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Route/Route.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
     <QueryClientProvider client={queryClient}>
     <div className="o">
        <RouterProvider router={router} />
      </div>
     </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
