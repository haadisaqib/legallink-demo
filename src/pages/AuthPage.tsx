import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Authenticator, useAuthenticator, ThemeProvider } from "@aws-amplify/ui-react";
import type { Theme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AnimatedBackground from '../components/AnimatedBackground';

const customTheme: Theme = {
  name: 'LegalLinkDarkTheme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#181f2a' }, // very dark blue/gray
        secondary: { value: '#232b3a' },
      },
      font: {
        primary: { value: '#fff' },
        secondary: { value: '#cbd5e1' },
        interactive: { value: '#38bdf8' },
      },
      brand: {
        primary: { value: '#2563eb' },
        secondary: { value: '#60a5fa' },
        accent: { value: '#38bdf8' },
      },
      border: {
        primary: { value: '#334155' },
      },
    },
    radii: {
      small: { value: '1rem' },
      medium: { value: '1.5rem' },
      large: { value: '2rem' },
    },
  },
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { route } = useAuthenticator((context) => [context.route]);
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam === 'signUp' ? 'signUp' : 'signIn';
  const [authTab] = useState<'signIn' | 'signUp'>(initialTab);

  useEffect(() => {
    if (route === "authenticated") {
      const from = location.state?.from?.pathname || "/app";
      navigate(from, { replace: true });
    }
  }, [route, navigate, location.state]);

  return (
    <ThemeProvider theme={customTheme}>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
        <AnimatedBackground />
        <div className="w-full max-w-md relative z-10">
          <Authenticator
            initialState={authTab}
            hideSignUp={false}
            components={{
              Header() {
                return (
                  <div className="flex flex-col mb-6 select-none">
                    <span className="text-3xl font-bold text-center">
                      <span className="text-white">LegalLink</span>
                      <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent ml-2">AI</span>
                    </span>
                    <div className="text-slate-300 text-base mt-2 font-medium text-center">Sign in to your account</div>
                  </div>
                );
              },
            }}
            formFields={{
              signUp: [
                {
                  type: "email",
                  name: "email",
                  label: "Email",
                  placeholder: "Enter your email",
                  required: true,
                },
                {
                  type: "text",
                  name: "address",
                  label: "Address",
                  placeholder: "Enter your address",
                  required: true,
                },
                {
                  type: "text",
                  name: "website",
                  label: "Website",
                  placeholder: "Enter your website",
                  required: true,
                },
                {
                  type: "text",
                  name: "custom:firmName",
                  label: "Firm Name",
                  placeholder: "Enter your firm name",
                  required: true,
                },
                {
                  type: "hidden",
                  name: "custom:accountType",
                  value: "parent",
                },
              ] as any,
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AuthPage;
