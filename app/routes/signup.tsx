import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export const meta = () => [
  { title: "OptiHire | Sign Up" },
  { name: "description", content: "Create your OptiHire account and start getting AI-powered resume feedback today" },
];

const Signup = () => {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/dashboard");
  }, [auth.isAuthenticated]);

  return (
    <main className="min-h-screen bg-white flex flex-row-reverse">
      {/* Right side: Visuals (hidden on small screens) */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-bl from-[#f0f4ff] to-[#fff3f6] items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/bg-auth.svg')] bg-cover mix-blend-overlay opacity-60 transform -scale-x-100"></div>
        <div className="relative z-10 max-w-lg flex flex-col gap-8">
          <Link to="/">
            <p className="text-4xl font-bold text-gradient inline-block">OptiHire</p>
          </Link>
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Level up your<br />
            <span className="text-gradient">job search.</span>
          </h2>
          <p className="text-xl text-dark-200">
            Create an account to start optimizing your resume and landing more interviews.
          </p>
          
          {/* Floating decorative elements */}
          <div className="mt-8 relative animate-float">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl shadow-[#606beb22] border border-white/60 w-full max-w-sm flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8e98ff] to-[#606beb] text-white flex items-center justify-center font-bold text-sm">✓</div>
                <p className="font-medium text-gray-900">Free ATS scoring</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8e98ff] to-[#606beb] text-white flex items-center justify-center font-bold text-sm">✓</div>
                <p className="font-medium text-gray-900">AI-powered suggestions</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8e98ff] to-[#606beb] text-white flex items-center justify-center font-bold text-sm">✓</div>
                <p className="font-medium text-gray-900">Track multiple resumes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left side: Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 bg-white relative">
        <div className="absolute top-8 left-8 lg:hidden">
            <Link to="/">
              <p className="text-2xl font-bold text-gradient inline-block">OptiHire</p>
            </Link>
        </div>

        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl max-sm:text-3xl font-bold text-gray-900 mb-3">Create Account</h1>
            <p className="text-lg text-dark-200">Start getting AI-powered resume feedback today</p>
          </div>

          {/* Signup Button */}
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <button className="auth-puter-btn animate-pulse" disabled>
                Setting things up...
              </button>
            ) : (
              <button className="auth-puter-btn" onClick={auth.signIn}>
                Sign Up with Puter
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Link to Login */}
          <p className="text-center text-dark-200 text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-[#606beb] font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
