import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";

import { resumes } from "~/constants";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta() {
  return [
    { title: "OptiHire | Dashboard" },
    { name: "description", content: "Track your resume applications and AI-powered feedback scores" },
  ];
}

export default function Dashboard() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/login?next=/dashboard');
  }, [auth.isAuthenticated])


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover pt-10">

    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>
          Track Your Applications & Resume Ratings
        </h1>
        <h2>
          Review your submissions and check AI-powered feedback
        </h2>
      </div>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes && resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>


  </main>
}
