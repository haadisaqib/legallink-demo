import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    if (route === 'authenticated') {
      const from = location.state?.from?.pathname || "/app";
      navigate(from, { replace: true });
    }
  }, [route, navigate, location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Authenticator
          initialState="signIn"
          components={{
            Header() {
              return (
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">LegalLink</h2>
                  <p className="text-slate-300 text-sm">Sign in to your account</p>
                </div>
              );
            },
          }}
          formFields={{
            signUp: [
              {
                type: 'email',
                name: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
                required: true,
              },
              {
                type: 'text',
                name: 'address',
                label: 'Address',
                placeholder: 'Enter your address',
                required: true,
              },
              {
                type: 'text',
                name: 'website',
                label: 'Website',
                placeholder: 'Enter your website',
                required: true,
              },
              {
                type: 'text',
                name: 'custom:FirmName',
                label: 'Firm Name',
                placeholder: 'Enter your firm name',
                required: true,
              },
              {
                type: 'password',
                name: 'password',
                label: 'Password',
                placeholder: 'Enter your password',
                required: true,
              },
              {
                type: 'password',
                name: 'confirm_password',
                label: 'Confirm Password',
                placeholder: 'Confirm your password',
                required: true,
              },
            ] as any,
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;