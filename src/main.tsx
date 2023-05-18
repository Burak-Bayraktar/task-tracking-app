import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TaskProvider } from "contexts/TaskContext.tsx";
import { ModalProvider } from "contexts/ModalContext.tsx";
import "index.css";
import ModalOpener from "modals/ModalOpener.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TaskProvider>
      <ModalProvider>
        <div className="app-container">
          <App />
          <ModalOpener />
        </div>
      </ModalProvider>
    </TaskProvider>
  </React.StrictMode>
);
