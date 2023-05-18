import useUser from "hooks/useUser";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "views/Dashboard";

function App() {
  useUser();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
