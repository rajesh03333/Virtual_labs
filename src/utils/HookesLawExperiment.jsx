import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpHookesLaw from "./help_HookesLawExperiment"; // Importing the simulation component

function HookesLawExperiment() {
    const experimentsData = {
        hookesLaw: {
            id: "hookes-law",
            title: "Hooke's Law Simulator",
            theory: `
                Hooke's Law states that the force exerted by a spring is directly proportional to the 
                extension or compression of the spring, provided the elastic limit is not exceeded.
                The mathematical expression is:
                
                F = k × x
                
                Where:
                - F is the force applied (Newtons),
                - k is the spring constant (N/m),
                - x is the extension or compression (meters).
            `,
            procedure: [
                "Attach a spring to a fixed support.",
                "Hang different weights from the spring and measure the extension.",
                "Record the force (weight) and corresponding extension.",
                "Calculate the spring constant using Hooke's Law formula.",
                "Plot a graph of force vs. extension to verify linearity.",
            ],
            animation: "/assets/hookes-law-animation.gif",
            video: "https://www.youtube.com/embed/HookesLawVideo",
            selfEvaluation: [
                "What is Hooke's Law formula?",
                "What happens if the elastic limit is exceeded?",
                "Why is Hooke's Law important in engineering?",
            ],
            resources: [
                { title: "Hooke's Law - Khan Academy", link: "https://www.khanacademy.org" },
                { title: "Hooke's Law - Wikipedia", link: "https://en.wikipedia.org/wiki/Hooke%27s_law" },
            ],
            feedback: "Please share your feedback on this simulation!",
        },
    };

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const experiment = experimentsData.hookesLaw;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate("/physics")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Physics
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
                    <img src={experiment.animation} alt="Hooke's Law Animation" className="rounded-md w-full" />
                )}

                {activeTab === "simulation" && <HelpHookesLaw />}

                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src={experiment.video}
                        title="Hooke's Law Video"
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

export default HookesLawExperiment;