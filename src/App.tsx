import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainLayout from "./pages/MainLayout";
import Marketing from "./pages/Marketing";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app/*" element={<MainLayout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/demo" element={<MainLayout />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
