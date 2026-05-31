import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

export const meta = () => [
  { title: "OptiHire | Log In" },
  { name: "description", content: "Log in to your OptiHire account to access AI-powered resume feedback" },
];

const Login = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/dashboard";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="min-h-screen bg-white flex">
      {/* Left side: Visuals (hidden on small screens) */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#f0f4ff] to-[#fff3f6] items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/bg-auth.svg')] bg-cover mix-blend-overlay opacity-60"></div>
        <div className="relative z-10 max-w-lg flex flex-col gap-8">
          <Link to="/">
            <p className="text-4xl font-bold text-gradient inline-block">OptiHire</p>
          </Link>
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Your career,<br />
            <span className="text-gradient">optimized.</span>
          </h2>
          <p className="text-xl text-dark-200">
            Join thousands of job seekers landing their dream roles with our AI-powered resume feedback.
          </p>
          
          {/* Floating decorative elements */}
          <div className="mt-8 relative animate-float">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl shadow-[#606beb22] border border-white/60 w-full max-w-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8e98ff] to-[#fa7185] flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  85
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">ATS Compatibility</h4>
                  <p className="text-sm text-[#10b981] font-medium">Great match!</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#8e98ff] to-[#fa7185] h-full rounded-full w-[85%] relative">
                   <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 bg-white relative">
        <div className="absolute top-8 left-8 lg:hidden">
            <Link to="/">
              <p className="text-2xl font-bold text-gradient inline-block">OptiHire</p>
            </Link>
        </div>

        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl max-sm:text-3xl font-bold text-gray-900 mb-3">Welcome Back</h1>
            <p className="text-lg text-dark-200">Log in to continue your job journey</p>
          </div>

          {/* Login Button */}
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <button className="auth-puter-btn animate-pulse" disabled>
                Signing you in...
              </button>
            ) : (
              <button className="auth-puter-btn" onClick={auth.signIn}>
                Log In with Puter
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Link to Signup */}
          <p className="text-center text-dark-200 text-lg">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#606beb] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
