import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import type { Resume } from "@types/index";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { fs } = usePuterStore();

    useEffect(() => {
        if (!imagePath) return;
        if (imagePath.startsWith('/images/')) {
            setImageUrl(imagePath);
            return;
        }
        
        let active = true;
        fs.read(imagePath).then(blob => {
            if (active && blob) {
                setImageUrl(URL.createObjectURL(blob));
            }
        }).catch(err => console.error("Error loading image for card", err));

        return () => { active = false; };
    }, [imagePath, fs]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback?.overallScore || 0} />
                </div>
            </div>
            {imageUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={imageUrl}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        />
                    </div>
                </div>
            )}
        </Link>
    );
};

export default ResumeCard;