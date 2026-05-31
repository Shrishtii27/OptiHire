import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Navbar from "~/components/Navbar";
import ScoreCircle from "~/components/ScoreCircle";
import { usePuterStore } from "~/lib/puter";

export default function ResumeFeedback() {
    const { id } = useParams();
    const { kv, fs } = usePuterStore();
    const [resumeData, setResumeData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchResume = async () => {
            if (!id) return;
            try {
                const dataStr = await kv.get(`resume:${id}`);
                if (!dataStr) {
                    setError("Resume not found");
                    return;
                }
                const data = JSON.parse(dataStr);
                setResumeData(data);
                
                if (data.imagePath) {
                    if (data.imagePath.startsWith('/images/')) {
                        setImageUrl(data.imagePath);
                    } else {
                        try {
                            const blob = await fs.read(data.imagePath);
                            if (blob) {
                                setImageUrl(URL.createObjectURL(blob));
                            }
                        } catch (imgErr) {
                            console.error("Failed to load image from fs", imgErr);
                        }
                    }
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load resume feedback");
            } finally {
                setIsLoading(false);
            }
        };

        fetchResume();
    }, [id, kv, fs]);

    if (isLoading) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen pt-10">
                <Navbar />
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="animate-pulse text-2xl text-dark-200">Loading your feedback...</div>
                </div>
            </main>
        );
    }

    if (error || !resumeData) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen pt-10">
                <Navbar />
                <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
                    <h2 className="text-3xl font-bold text-red-500">{error || "Something went wrong"}</h2>
                    <Link to="/dashboard" className="landing-primary-btn">Back to Dashboard</Link>
                </div>
            </main>
        );
    }

    const { companyName, jobTitle, feedback } = resumeData;

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen pt-10 pb-20">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 mt-8 animate-in fade-in duration-700">
                <Link to="/dashboard" className="inline-flex items-center text-dark-200 hover:text-[#606beb] mb-6 transition-colors">
                    <span className="mr-2">←</span> Back to Dashboard
                </Link>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left side: Overview & Image */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-[#606beb0a] border border-white/60">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{companyName || "Resume Feedback"}</h1>
                                    <p className="text-dark-200">{jobTitle || "General Analysis"}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center py-6 border-t border-gray-100">
                                <ScoreCircle score={feedback?.overallScore || 0} />
                                <p className="mt-4 font-semibold text-gray-900 text-lg">Overall Match</p>
                            </div>
                        </div>

                        {imageUrl && (
                            <div className="bg-white/60 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-white/40">
                                <img src={imageUrl} alt="Resume Preview" className="w-full rounded-2xl border border-gray-200" />
                            </div>
                        )}
                    </div>

                    {/* Right side: Detailed Feedback */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-[#606beb0a] border border-white/60">
                            <h2 className="text-3xl font-bold text-gradient mb-8">Detailed Analysis</h2>
                            
                            <div className="flex flex-col gap-8">
                                {Object.entries(feedback || {}).map(([key, categoryData]: [string, any]) => {
                                    if (key === 'overallScore') return null;
                                    
                                    const formatTitle = (text: string) => {
                                        return text.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                    };

                                    return (
                                        <div key={key} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-semibold text-gray-900">{formatTitle(key)}</h3>
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8e98ff] to-[#fa7185] flex items-center justify-center text-white font-bold shadow-inner">
                                                    {categoryData.score}
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col gap-4 mt-4">
                                                {categoryData.tips?.map((tipObj: any, index: number) => (
                                                    <div key={index} className={`p-4 rounded-xl border ${tipObj.type === 'good' ? 'bg-[#d5faf1]/50 border-[#d5faf1]' : 'bg-[#f9e3e2]/50 border-[#f9e3e2]'}`}>
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-xl mt-0.5">{tipObj.type === 'good' ? '✅' : '💡'}</span>
                                                            <div>
                                                                <h4 className={`font-semibold ${tipObj.type === 'good' ? 'text-[#254d4a]' : 'text-[#752522]'}`}>
                                                                    {tipObj.tip}
                                                                </h4>
                                                                {tipObj.explanation && (
                                                                    <p className="text-sm mt-1 text-gray-700 leading-relaxed">
                                                                        {tipObj.explanation}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!categoryData.tips || categoryData.tips.length === 0) && (
                                                    <p className="text-dark-200 italic">No specific feedback for this category.</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
