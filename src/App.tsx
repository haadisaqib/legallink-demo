import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainLayout from "./pages/MainLayout";
import Marketing from "./pages/Marketing";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

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
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
