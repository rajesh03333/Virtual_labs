import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpAcidBaseTitration from "./help_acidbasetitration"; // Importing the simulation component

function AcidBaseTitrationSimulator() {
    const experimentsData = {
        acidBaseTitration: {
            id: "acid-base-titration",
            title: "Acid-Base Titration Simulator",
            theory: `
                Acid-base titration is a quantitative analysis method used to determine the 
                concentration of an unknown acid or base by neutralizing it with a base or acid 
                of known concentration. The reaction follows:
                
                Acid + Base → Salt + Water
            `,
            procedure: [
                "Prepare the acid and base solutions with known concentrations.",
                "Fill a burette with the titrant (acid or base).",
                "Add the titrant gradually to the analyte solution with an indicator.",
                "Observe the color change at the equivalence point.",
                "Record the volume of titrant used for neutralization.",
            ],
            animation: "/assets/acid-base-titration-animation.gif",
            video: "https://www.youtube.com/embed/AcidBaseTitrationVideo",
            selfEvaluation: [
                "What is the purpose of acid-base titration?",
                "What is an equivalence point in titration?",
                "Why do we use an indicator in titration?",
            ],
            resources: [
                { title: "Acid-Base Titration - Khan Academy", link: "https://www.khanacademy.org" },
                { title: "Titration - Wikipedia", link: "https://en.wikipedia.org/wiki/Titration" },
            ],
            feedback: "Please share your feedback on this simulation!",
        },
    };

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const experiment = experimentsData.acidBaseTitration;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate("/chemistry/acid-base-titration")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Chemistry
            </button>

            <h1 className="text-3xl font-bold text-orange-600 mb-4">{experiment.title}</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b pb-2">
                {["theory", "procedure", "animation", "simulation", "video", "selfEvaluation", "resources", "feedback"].map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    )
                )}
            </div>

            {/* Content */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                {activeTab === "theory" && <p className="text-gray-700">{experiment.theory}</p>}

                {activeTab === "procedure" && (
                    <ul className="list-disc pl-5">
                        {experiment.procedure.map((step, index) => (
                            <li key={index} className="mb-2 text-gray-700">{step}</li>
                        ))}
                    </ul>
                )}

                {activeTab === "animation" && (
                    <img src={experiment.animation} alt="Acid-Base Titration Animation" className="rounded-md w-full" />
                )}

                {activeTab === "simulation" && <HelpAcidBaseTitration />}

                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src={experiment.video}
                        title="Acid-Base Titration Video"
                        className="rounded-md"
                        allowFullScreen
                    ></iframe>
                )}

                {activeTab === "selfEvaluation" && (
                    <ul className="list-disc pl-5">
                        {experiment.selfEvaluation.map((question, index) => (
                            <li key={index} className="mb-2 text-gray-700">{question}</li>
                        ))}
                    </ul>
                )}

                {activeTab === "resources" && (
                    <ul className="list-disc pl-5">
                        {experiment.resources.map((resource, index) => (
                            <li key={index} className="mb-2">
                                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {resource.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === "feedback" && (
                    <div>
                        <p className="text-gray-700 mb-4">{experiment.feedback}</p>
                        <textarea className="w-full border p-3 rounded-md" placeholder="Write your feedback here..."></textarea>
                        <button className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AcidBaseTitrationSimulator;
