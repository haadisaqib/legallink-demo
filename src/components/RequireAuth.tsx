import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

export function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);

  if (route !== 'authenticated') {
    // Redirect them to the /auth page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after a
    // successful login.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
