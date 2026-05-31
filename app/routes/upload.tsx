import { type FormEvent, useState } from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "~/constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) {
            console.error("PDF Conversion Error:", imageFile.error);
            return setStatusText(`Error: ${imageFile.error || 'Failed to convert PDF to image'}`);
        }

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        let rawText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        // Robust JSON extraction: find first { and last } to strip markdown/text
        const firstBrace = rawText.indexOf('{');
        const lastBrace = rawText.lastIndexOf('}');
        
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
            rawText = rawText.substring(firstBrace, lastBrace + 1);
        }

        try {
            data.feedback = JSON.parse(rawText);
        } catch (error) {
            console.error("Failed to parse AI feedback:", rawText, error);
            return setStatusText('Error: AI returned invalid format');
        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover pt-10 min-h-screen">
            <Navbar />

            <section className="main-section px-4">
                <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl mt-8 animate-in fade-in duration-1000">
                    
                    {/* Left side: Context/Visuals */}
                    <div className="flex-1 flex flex-col gap-6 pt-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8e98ff1a] to-[#fa71851a] text-sm font-medium text-dark-200 border border-[#8e98ff33] w-fit">
                            <span>✨</span>
                            <span>AI-Powered Analysis</span>
                        </div>
                        <h1 className="text-6xl max-sm:text-4xl text-gradient font-bold leading-tight">
                            Optimize for your dream job
                        </h1>
                        <p className="text-xl text-dark-200 max-w-md leading-relaxed">
                            Upload your resume to get an instant ATS score, category-by-category tips, and actionable insights tailored to your target role.
                        </p>
                        
                        <div className="mt-8 hidden lg:block animate-float w-full max-w-md relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8e98ff] to-[#fa7185] blur-3xl opacity-20 rounded-full"></div>
                            <img src="/images/resume-01.png" className="relative w-full rounded-2xl shadow-2xl shadow-[#606beb22] border border-white/40 object-cover object-top h-[320px]" alt="Resume Preview" />
                        </div>
                    </div>

                    {/* Right side: Form */}
                    <div className="flex-1">
                        <div className="bg-white/60 backdrop-blur-xl p-8 max-sm:p-6 rounded-3xl border border-white/40 shadow-xl shadow-[#606beb0a]">
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center text-center gap-6 py-16 animate-in fade-in duration-700">
                                    <h2 className="text-3xl font-semibold text-gradient">{statusText}</h2>
                                    <p className="text-dark-200">Our AI is reviewing your resume against industry standards...</p>
                                    <div className="w-full max-w-xs mt-4 rounded-2xl overflow-hidden shadow-lg border border-white/50">
                                        <img src="/images/scan.gif" className="w-full object-cover" alt="Scanning..." />
                                    </div>
                                </div>
                            ) : (
                                <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="mb-2">
                                        <h2 className="text-2xl font-semibold text-gray-900">Upload Details</h2>
                                        <p className="text-sm text-dark-200 mt-1">Provide context for a more accurate analysis.</p>
                                    </div>
                                    
                                    <div className="form-div">
                                        <label htmlFor="company-name" className="font-medium text-sm">Target Company</label>
                                        <input type="text" name="company-name" placeholder="e.g. Google, Apple" id="company-name" className="bg-white/80 border-0 focus:ring-2 focus:ring-[#8e98ff]" />
                                    </div>
                                    <div className="form-div">
                                        <label htmlFor="job-title" className="font-medium text-sm">Target Role</label>
                                        <input type="text" name="job-title" placeholder="e.g. Senior Software Engineer" id="job-title" className="bg-white/80 border-0 focus:ring-2 focus:ring-[#8e98ff]" />
                                    </div>
                                    <div className="form-div">
                                        <label htmlFor="job-description" className="font-medium text-sm">Job Description (Optional)</label>
                                        <textarea rows={4} name="job-description" placeholder="Paste the job description to get tailored feedback..." id="job-description" className="bg-white/80 border-0 focus:ring-2 focus:ring-[#8e98ff] resize-none" />
                                    </div>

                                    <div className="form-div mt-2">
                                        <label htmlFor="uploader" className="font-medium text-sm">Resume PDF</label>
                                        <FileUploader onFileSelect={handleFileSelect} />
                                    </div>

                                    <button className="landing-primary-btn mt-6 w-full flex items-center justify-center gap-2" type="submit">
                                        <span>Analyze Resume</span>
                                        <span className="text-xl leading-none">→</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Upload