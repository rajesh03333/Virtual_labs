import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpOhmsLaw from "./help_OhmsLawExperiment"; // Importing the simulation component

function OhmsLawSimulator() {
    const experimentsData = {
        ohmsLaw: {
            id: "ohms-law",
            title: "Ohm's Law Simulator",
            theory: `
                Ohm's Law states that the current through a conductor between two points is directly 
                proportional to the voltage across the two points and inversely proportional to the 
                resistance between them. The mathematical expression is:
                
                V = I × R
                
                Where:
                - V is the voltage (volts),
                - I is the current (amperes),
                - R is the resistance (ohms).
            `,
            procedure: [
                "Set up a simple electrical circuit with a resistor, a voltage source, and an ammeter.",
                "Adjust the voltage of the power supply and measure the current using an ammeter.",
                "Repeat the experiment with different resistor values.",
                "Record the readings and calculate resistance using Ohm's Law.",
                "Analyze the relationship between voltage, current, and resistance.",
            ],
            animation: "/assets/ohms-law-animation.gif",
            video: "https://www.youtube.com/embed/OhmsLawVideo",
            selfEvaluation: [
                "What is the formula of Ohm's Law?",
                "How does increasing resistance affect current?",
                "Why is Ohm's Law important in electrical circuits?",
            ],
            resources: [
                { title: "Ohm's Law - Khan Academy", link: "https://www.khanacademy.org" },
                { title: "Ohm's Law - Wikipedia", link: "https://en.wikipedia.org/wiki/Ohm%27s_law" },
            ],
            feedback: "Please share your feedback on this simulation!",
        },
    };

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const experiment = experimentsData.ohmsLaw;

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
                    <img src={experiment.animation} alt="Ohm's Law Animation" className="rounded-md w-full" />
                )}

                {activeTab === "simulation" && <HelpOhmsLaw />}

                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src={experiment.video}
                        title="Ohm's Law Video"
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

export default OhmsLawSimulator;
