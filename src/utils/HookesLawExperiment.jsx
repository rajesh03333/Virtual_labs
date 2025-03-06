import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpHookesLaw from "./help_HookesLawExperiment";

function HookesLawExperiment() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    const experiment = {
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
        resources: [
            { title: "Hooke's Law - Khan Academy", link: "https://www.khanacademy.org" },
            { title: "Hooke's Law - Wikipedia", link: "https://en.wikipedia.org/wiki/Hooke%27s_law" },
        ],
        feedback: "Please share your feedback on this simulation!",
    };

    const quizQuestions = [
        {
            question: "What does Hooke’s Law state?",
            options: [
                "Force is inversely proportional to extension",
                "Force is directly proportional to extension",
                "Force is equal to mass times acceleration",
                "Force is independent of extension"
            ],
            answer: "Force is directly proportional to extension",
        },
        {
            question: "What is the unit of the spring constant (k)?",
            options: ["Newton", "Newton/meter", "Joule", "Watt"],
            answer: "Newton/meter",
        },
        {
            question: "What happens if the elastic limit is exceeded?",
            options: [
                "The spring returns to its original shape",
                "The spring breaks immediately",
                "The deformation becomes permanent",
                "The spring constant increases"
            ],
            answer: "The deformation becomes permanent",
        },
        {
            question: "Which of these graphs represents Hooke’s Law?",
            options: [
                "A straight line passing through the origin",
                "A curved line",
                "A horizontal line",
                "A vertical line"
            ],
            answer: "A straight line passing through the origin",
        },
        {
            question: "If the force applied is doubled, what happens to the extension?",
            options: ["Remains the same", "Doubles", "Halves", "Becomes zero"],
            answer: "Doubles",
        },
    ];

    const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
    const [score, setScore] = useState(null);

    const handleSelect = (index, option) => {
        const newAnswers = [...answers];
        newAnswers[index] = option;
        setAnswers(newAnswers);
    };

    const handleSubmitQuiz = () => {
        let totalScore = 0;
        quizQuestions.forEach((q, index) => {
            if (answers[index] === q.answer) totalScore += 1;
        });
        setScore(totalScore);
    };

    const sendFeedback = (e) => {
        e.preventDefault();
        if (!feedback.trim()) {
            setMessage("Please enter your feedback before submitting.");
            return;
        }

        const templateParams = {
            user_name: "Administrator",
            user_email: "rajeshgajula.1434@gmail.com",
            from_name: "Vision Lab Experiment Hooke's Law Simulator",
            message: feedback,
        };

        emailjs
            .send(
                "service_0updalp",
                "template_gga1aol",
                templateParams,
                "eQ_JCPczgpDZ1uk7d"
            )
            .then(
                (response) => {
                    console.log("Email sent successfully:", response);
                    setMessage("Thank you for your feedback!");
                    setFeedback("");
                },
                (error) => {
                    console.error("Email sending failed:", error);
                    setMessage("Error sending feedback. Please try again.");
                }
            );
    };

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

            <div className="flex gap-4 mb-6 border-b pb-2">
                {["theory", "procedure", "animation", "simulation", "video", "resources", "feedback", "quiz"].map(
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
                
                {activeTab === "feedback" && (
                    <div>
                        <p className="text-gray-700 mb-4">{experiment.feedback}</p>
                        <textarea className="w-full border p-3 rounded-md" placeholder="Write your feedback here..." value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
                        <button onClick={sendFeedback} className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                        {message && <p className="mt-4 text-green-600">{message}</p>}
                    </div>
                )}

                {activeTab === "quiz" && (
                    <div>
                        {quizQuestions.map((q, index) => (
                            <div key={index} className="mb-6">
                                <p className="text-gray-700 font-semibold mb-2">{`${index + 1}. ${q.question}`}</p>
                                {q.options.map((option, i) => (
                                    <div key={i} className="flex items-center mb-2">
                                        <input type="radio" name={`question-${index}`} checked={answers[index] === option} onChange={() => handleSelect(index, option)} className="mr-2" />
                                        <label className="cursor-pointer text-gray-700">{option}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button onClick={handleSubmitQuiz} className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                        {score !== null && <p className="mt-4 text-lg font-bold text-green-600">Your Score: {score} / {quizQuestions.length}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HookesLawExperiment;
