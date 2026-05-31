import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

export function meta() {
  return [
    { title: "OptiHire — AI-Powered Resume Feedback" },
    {
      name: "description",
      content:
        "Get instant ATS scores, actionable improvement tips, and AI-powered insights for your resume. Land your dream job with OptiHire.",
    },
  ];
}

export default function Landing() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-top">
      {/* ===== Navbar ===== */}
      <nav className="landing-navbar">
        <Link to="/">
          <p className="text-2xl font-bold text-gradient">OptiHire</p>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-dark-200 font-medium hover:text-[#606beb] transition-colors duration-300"
          >
            Log In
          </Link>
          <Link to="/signup" className="landing-primary-btn !py-2.5 !px-6 !text-base">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="landing-hero">
        <div className="landing-hero-badge">
          <span>✨</span>
          <span>AI-Powered Resume Analysis</span>
        </div>

        <h1>Smart Feedback for Your Dream Job</h1>

        <p>
          Upload your resume and get instant ATS scores, category-by-category
          tips, and actionable insights — all powered by AI. Stand out from the
          crowd.
        </p>

        <div className="landing-cta-group">
          <Link to="/signup" className="landing-primary-btn">
            Get Started Free
          </Link>
          <Link to="/login" className="landing-outline-btn">
            Log In
          </Link>
        </div>

        {/* Hero Visual — floating resume mockup with score */}
        <div className="landing-hero-visual">
          <div className="landing-hero-mockup">
            <img
              src="/images/resume-01.png"
              alt="Resume preview showing AI-powered analysis"
              className="w-full h-[400px] max-sm:h-[240px] object-cover object-top"
            />
          </div>
          <div className="landing-hero-score-float">
            <ScoreCircle score={85} />
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="landing-features">
        <div className="landing-section-heading">
          <h2>Everything You Need</h2>
          <p>
            Comprehensive resume analysis across multiple dimensions to help you
            land interviews
          </p>
        </div>

        <div className="landing-features-grid">
          <div className="feature-card">
            <div className="feature-card-icon">🎯</div>
            <h3>ATS Score Analysis</h3>
            <p>
              See exactly how your resume performs against applicant tracking
              systems used by top companies
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon">💡</div>
            <h3>Smart Suggestions</h3>
            <p>
              Get category-by-category tips on content, structure, tone, and
              skills — tailored to your target role
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>
              Upload your PDF and receive detailed, AI-powered feedback in
              seconds — not hours
            </p>
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="landing-steps">
        <div className="landing-section-heading">
          <h2>How It Works</h2>
          <p>Three simple steps to a better resume</p>
        </div>

        <div className="landing-steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Upload Your Resume</h3>
            <p>
              Drag and drop your PDF or click to upload. We accept resumes up to
              20MB.
            </p>
          </div>

          <div className="step-connector">
            <div className="step-connector-line" />
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>AI Analyzes It</h3>
            <p>
              Our AI reviews your resume across 5 categories: ATS, content,
              structure, tone, and skills.
            </p>
          </div>

          <div className="step-connector">
            <div className="step-connector-line" />
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Actionable Feedback</h3>
            <p>
              Receive a detailed score breakdown with specific tips on what to
              keep and what to improve.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <section className="landing-stats">
        <div className="landing-stats-bar">
          <div className="stat-item">
            <span className="stat-value">5</span>
            <span className="stat-label">Categories Analyzed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">AI</span>
            <span className="stat-label">Powered by Claude</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">Free</span>
            <span className="stat-label">To Use</span>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="landing-cta">
        <div className="landing-cta-card">
          <h2>Ready to Optimize Your Resume?</h2>
          <p>
            Join and start getting AI-powered feedback that helps you land
            interviews at top companies.
          </p>
          <Link to="/signup" className="landing-primary-btn inline-block">
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="landing-footer">
        <p>
          © {new Date().getFullYear()} OptiHire. Built with ❤️ for job seekers
          everywhere.
        </p>
      </footer>
    </main>
  );
}
