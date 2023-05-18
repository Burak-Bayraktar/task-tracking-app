import useUser from "hooks/useUser";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Dashboard from "views/Dashboard";

function App() {
  useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
