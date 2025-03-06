import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpSPE from "./help_SimplePendulum"; // Importing the simulation component

function SimplePendulumExperiment() {
    const experimentsData = {
        simplePendulum: {
            id: "simple-pendulum",
            title: "Simple Pendulum Simulator",
            theory: `
                A simple pendulum consists of a mass (bob) attached to a string of fixed length, 
                swinging back and forth under the influence of gravity. The time period (T) of a 
                simple pendulum is given by:
                
                T = 2π √(L/g)
                
                Where:
                - T is the time period (seconds),
                - L is the length of the string (meters),
                - g is the acceleration due to gravity (9.81 m/s²).
            `,
            procedure: [
                "Suspend a bob using a string from a fixed support.",
                "Displace the bob slightly and release it to start oscillation.",
                "Measure the time taken for multiple oscillations.",
                "Calculate the time period using the formula T = total time / number of oscillations.",
                "Compare the experimental values with theoretical calculations.",
            ],
            animation: "/assets/simple-pendulum-animation.gif",
            video: "https://www.youtube.com/embed/SimplePendulumVideo",
            selfEvaluation: [
                "What factors affect the time period of a simple pendulum?",
                "Does mass affect the oscillation time?",
                "How does the length of the pendulum influence the time period?",
            ],
            resources: [
                { title: "Simple Pendulum - Khan Academy", link: "https://www.khanacademy.org" },
                { title: "Simple Pendulum - Wikipedia", link: "https://en.wikipedia.org/wiki/Pendulum" },
            ],
            feedback: "Please share your feedback on this simulation!",
        },
    };

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const experiment = experimentsData.simplePendulum;

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
                    <img src={experiment.animation} alt="Simple Pendulum Animation" className="rounded-md w-full" />
                )}

                {activeTab === "simulation" && <HelpSPE />}

                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src={experiment.video}
                        title="Simple Pendulum Video"
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

export default SimplePendulumExperiment;
