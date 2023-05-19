import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TaskProvider } from "contexts/TaskContext.tsx";
import { ModalProvider } from "contexts/ModalContext.tsx";
import "index.css";
import ModalOpener from "modals/ModalOpener.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <ModalProvider>
            <div className="app-container">
              <App />
              <ModalOpener />
            </div>
          </ModalProvider>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
