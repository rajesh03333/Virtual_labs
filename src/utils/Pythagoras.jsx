import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pythagoras from "./help_pythagoras";

function PythagorasTheorem() {
    const experimentsData = {
        math: {
            id: "pythagoras-theorem",
            title: "Pythagoras' Theorem",
            theory: `
            Pythagoras' theorem states that in a right-angled triangle, 
            the square of the hypotenuse is equal to the sum of the squares 
            of the other two sides: c² = a² + b².
          `,
            procedure: [
                "Draw a right-angled triangle with sides a, b, and hypotenuse c.",
                "Measure the lengths of the sides a and b.",
                "Calculate the hypotenuse using c = √(a² + b²).",
                "Compare the theoretical and actual hypotenuse values.",
            ],
            animation: "/assets/pythagoras-animation.gif",
            simulation: "/assets/pythagoras-simulation.html",
            video: "https://www.youtube.com/embed/PythagorasVideo",
            selfEvaluation: [
                "What is the formula of Pythagoras' theorem?",
                "How does the theorem apply to real-life problems?",
            ],
            resources: [
                { title: "Pythagoras Theorem - Khan Academy", link: "https://www.khanacademy.org" },
                { title: "Pythagoras Theorem - Wikipedia", link: "https://en.wikipedia.org/wiki/Pythagorean_theorem" },
            ],
            feedback: "Please share your feedback on this experiment!",
        },
    };

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const experiment = experimentsData.math;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate("/math")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Math
            </button>

            <h1 className="text-3xl font-bold text-orange-600 mb-4">{experiment.title}</h1>

            {/* Tabs for navigation */}
            <div className="flex gap-4 mb-6 border-b pb-2">
                {["theory", "procedure", "animation", "simulation", "video", "selfEvaluation", "resources", "feedback"].map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"
                                }`}
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
                            <li key={index} className="mb-2 text-gray-700">
                                {step}
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === "animation" && (
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/QJYmyhnaaek"
                        title="Pythagoras Theorem Animation"
                        className="rounded-md"
                        allowFullScreen
                    ></iframe>
                )}


                {activeTab === "simulation" && (
                    < Pythagoras />
                )}

                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/gRf780Pce7o"
                        title="Pythagoras Theorem Animation"
                        className="rounded-md"
                        allowFullScreen
                    ></iframe>
                )}


                {activeTab === "selfEvaluation" && (
                    <ul className="list-disc pl-5">
                        {experiment.selfEvaluation.map((question, index) => (
                            <li key={index} className="mb-2 text-gray-700">
                                {question}
                            </li>
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
                        <textarea
                            className="w-full border p-3 rounded-md"
                            placeholder="Write your feedback here..."
                        ></textarea>
                        <button className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PythagorasTheorem;
