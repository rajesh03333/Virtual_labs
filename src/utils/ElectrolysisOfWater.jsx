import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpElectrolysisOfWater from "./help_ElectrolysisOfWater"; // Importing the simulation component

function ElectrolysisExperiment() {
    const experimentsData = {
        electrolysis: {
            id: "electrolysis-of-water",
            title: "Electrolysis of Water",
            theory: `
                Electrolysis of water is a process that uses electricity to break water molecules 
                (H₂O) into oxygen (O₂) and hydrogen (H₂) gases. It occurs in an electrolyte solution 
                with electrodes connected to a power source.
                
                2H₂O → 2H₂ + O₂
            `,
            procedure: [
                "Fill a container with water and add a small amount of electrolyte (e.g., salt).",
                "Place two electrodes (anode and cathode) into the solution.",
                "Connect the electrodes to a power supply.",
                "Observe hydrogen gas forming at the cathode (-) and oxygen at the anode (+).",
            ],
            animation: "/assets/electrolysis-animation.gif",
            video: "https://www.youtube.com/embed/6pM5to36Rws",
            selfEvaluation: [
                "What is the main purpose of electrolysis of water?",
                "Why do we add an electrolyte to the water?",
                "What gases are released at the anode and cathode?",
            ],
            resources: [
                { title: "Electrolysis of Water - Khan Academy", link: "https://www.khanacademy.org" },
                { title: "Electrolysis - Wikipedia", link: "https://en.wikipedia.org/wiki/Electrolysis" },
            ],
            feedback: "Please share your feedback on this experiment!",
        },
    };

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const experiment = experimentsData.electrolysis;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate("/chemistry")}
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
                    <img src={experiment.animation} alt="Electrolysis Animation" className="rounded-md w-full" />
                )}

                {activeTab === "simulation" && <HelpElectrolysisOfWater />}

                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src={experiment.video}
                        title="Electrolysis of Water Video"
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

export default ElectrolysisExperiment;
