import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TaskProvider } from "contexts/TaskContext.tsx";
import { ModalProvider } from "contexts/ModalContext.tsx";
import "index.css";
import ModalOpener from "modals/ModalOpener.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <ModalProvider>
          <div className="app-container">
            <App />
            <ModalOpener />
          </div>
        </ModalProvider>
      </TaskProvider>
    </BrowserRouter>
  </React.StrictMode>
);
