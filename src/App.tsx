import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';

// Import your page components
import AuthPage from "./pages/AuthPage";
import MainLayout from "./pages/MainLayout";
import Marketing from "./pages/Marketing";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

// Import the new RequireAuth component
import { RequireAuth } from "./components/RequireAuth";

function App() {
  return (
    // The Authenticator.Provider is still necessary for the useAuthenticator hook to work
    <Authenticator.Provider>
      <Router>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Marketing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<MainLayout />} />

          {/* --- Protected Routes --- */}
          <Route 
            path="/app/*" 
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } 
          />
          <Route 
            path="/billing" 
            element={
              <RequireAuth>
                <Billing />
              </RequireAuth>
            } 
          />

          {/* --- Not Found Route --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;