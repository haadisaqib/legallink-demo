import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, UserPlus, Building, Globe, MapPin, X } from "lucide-react";
import { signUp, signIn, confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import { useAuthenticator } from "@aws-amplify/ui-react";

// --- Forgot Password Modal Component ---
interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter code and new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await resetPassword({ username: email });
      setSuccess('A password reset code has been sent to your email.');
      setStep(2);
    } catch (err) {
      setError(err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'An unexpected error occurred.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await confirmResetPassword({ username: email, confirmationCode: code, newPassword });
      setSuccess('Your password has been successfully reset. Please sign in.');
      setTimeout(() => {
        onClose();
        setStep(1);
      }, 3000);
    } catch (err) {
      setError(err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'An unexpected error occurred.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Reset Password</h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4">{success}</p>}
        {step === 1 ? (
          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <label htmlFor="email-reset" className="text-slate-300 mb-2 block">Email Address</label>
              <input id="email-reset" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-4 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-600">Send Reset Code</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="code" className="text-slate-300 mb-2 block">Confirmation Code</label>
              <input id="code" type="text" value={code} onChange={e => setCode(e.target.value)} className="w-full pl-4 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required />
            </div>
            <div>
              <label htmlFor="new-password" className="text-slate-300 mb-2 block">New Password</label>
              <input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full pl-4 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-600">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

// Helper to generate a random username for Cognito
function generateRandomUsername(): string {
  return 'user-' + Math.random().toString(36).substring(2, 15);
}

// --- Main Auth Page Component ---
const AuthPage = () => {
  const [authView, setAuthView] = useState<'signIn' | 'signUp' | 'confirmSignUp'>('signIn');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    website: '',
    firmName: '',
    confirmationCode: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    if (route === 'authenticated') {
      const from = location.state?.from?.pathname || "/app";
      navigate(from, { replace: true });
    }
  }, [route, navigate, location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await signUp({
        username: generateRandomUsername(), // NOT the email!
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            address: formData.address,
            website: formData.website,
            'custom:FirmName': formData.firmName,
          },
        },
      });
      setAuthView('confirmSignUp');
      setSuccess('A confirmation code has been sent to your email.');
    } catch (err) {
      setError(err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'An unexpected error occurred during sign up.');
    }
    setIsLoading(false);
  };

  const handleConfirmSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await confirmSignUp({ username: formData.email, confirmationCode: formData.confirmationCode });
      await signIn({ username: formData.email, password: formData.password });
      // useAuthenticator will redirect
    } catch (err) {
      setError(err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'An unexpected error occurred during confirmation.');
    }
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await signIn({ username: formData.email, password: formData.password });
      // useAuthenticator will redirect
    } catch (err) {
      setError(err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'An unexpected error occurred during sign in.');
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await resendSignUpCode({ username: formData.email });
      setSuccess('A new confirmation code has been sent to your email.');
    } catch (err) {
      setError(err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'Failed to resend code.');
    }
    setIsLoading(false);
  };

  return (
    <>
      <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="w-full max-w-md p-10 space-y-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">LegalLink</h2>
            <p className="text-slate-300 text-sm">
              {authView === 'signIn' && 'Sign in to your account'}
              {authView === 'signUp' && 'Create a new account'}
              {authView === 'confirmSignUp' && 'Confirm your email'}
            </p>
          </div>

          {error && <p className="text-red-400 bg-red-900/20 border border-red-500/30 p-3 rounded-lg text-center">{error}</p>}
          {success && <p className="text-green-400 bg-green-900/20 border border-green-500/30 p-3 rounded-lg text-center">{success}</p>}

          {authView === 'signIn' && (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="email" type="email" placeholder="Email" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
              <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="password" type="password" placeholder="Password" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50"><LogIn size={20} />{isLoading ? 'Signing In...' : 'Sign In'}</button>
              <p className="text-center text-sm text-slate-400"><button type="button" onClick={() => setForgotPasswordOpen(true)} className="hover:text-white underline">Forgot Password?</button></p>
            </form>
          )}

          {authView === 'signUp' && (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="email" type="email" placeholder="Email" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
              <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="address" type="text" placeholder="Address" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
              <div className="relative"><Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="website" type="text" placeholder="Website" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
              <div className="relative"><Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="firmName" type="text" placeholder="Firm Name" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
              <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="password" type="password" placeholder="Password" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
              <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50"><UserPlus size={20} />{isLoading ? 'Creating Account...' : 'Create Account'}</button>
            </form>
          )}

          {authView === 'confirmSignUp' && (
            <form onSubmit={handleConfirmSignUp} className="space-y-6">
                <p className="text-center text-slate-300">A confirmation code has been sent to {formData.email}. Please enter it below.</p>
                <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input name="confirmationCode" type="text" placeholder="Confirmation Code" onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-700 text-white" required /></div>
                <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50"><LogIn size={20} />{isLoading ? 'Confirming...' : 'Confirm & Sign In'}</button>
                <p className="text-center text-sm text-slate-400">
                    Didn't receive a code? <button type="button" onClick={handleResendCode} className="hover:text-white underline" disabled={isLoading}>Resend Code</button>
                </p>
            </form>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-600"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-slate-800 text-slate-400">or</span></div>
          </div>
          <div>
            <button type="button" onClick={() => setAuthView(authView === 'signIn' ? 'signUp' : 'signIn')} className="w-full text-center text-blue-400 hover:text-blue-300">
              {authView === 'signIn' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;