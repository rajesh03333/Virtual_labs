import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpSPE from "./help_SimplePendulum"; // Simulation Component

function SimplePendulumExperiment() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");
    const [quizAnswers, setQuizAnswers] = useState({});
    const [score, setScore] = useState(null);

    const experiment = {
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
        resources: [
            { title: "Simple Pendulum - Khan Academy", link: "https://www.khanacademy.org" },
            { title: "Simple Pendulum - Wikipedia", link: "https://en.wikipedia.org/wiki/Pendulum" },
        ],
        feedback: "Please share your feedback on this simulation!",
        quiz: [
            {
                question: "What is the formula for the time period of a simple pendulum?",
                options: ["T = 2π √(L/g)", "T = L/g", "T = 2πg/L", "T = g/L"],
                answer: "T = 2π √(L/g)",
            },
            {
                question: "Which factor affects the time period of a simple pendulum?",
                options: ["Mass of the bob", "Length of the string", "Amplitude", "All of the above"],
                answer: "Length of the string",
            },
            {
                question: "What happens if the length of the pendulum is increased?",
                options: ["Time period decreases", "Time period remains the same", "Time period increases", "Pendulum stops oscillating"],
                answer: "Time period increases",
            },
            {
                question: "What is the acceleration due to gravity (g) on Earth?",
                options: ["8.9 m/s²", "9.81 m/s²", "10.5 m/s²", "12 m/s²"],
                answer: "9.81 m/s²",
            },
            {
                question: "What kind of motion does a simple pendulum exhibit?",
                options: ["Linear motion", "Rotational motion", "Oscillatory motion", "Random motion"],
                answer: "Oscillatory motion",
            },
        ],
    };

    const handleOptionChange = (questionIndex, option) => {
        setQuizAnswers({ ...quizAnswers, [questionIndex]: option });
    };

    const handleSubmitQuiz = () => {
        let correctAnswers = 0;
        experiment.quiz.forEach((q, index) => {
            if (quizAnswers[index] === q.answer) correctAnswers++;
        });
        setScore(correctAnswers);
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
            from_name: "Vision Lab Experiment - Simple Pendulum",
            message: feedback,
        };

        emailjs
            .send(
                "service_0updalp",
                "template_gga1aol",
                templateParams,
                "eQ_JCPczgpDZ1uk7d"
            )
            .then(() => {
                setMessage("Thank you for your feedback!");
                setFeedback("");
            })
            .catch(() => setMessage("Error sending feedback. Please try again."));
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
                {["theory", "procedure", "animation", "simulation", "video", "resources", "feedback", "quiz"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                {activeTab === "theory" && <p className="text-gray-700">{experiment.theory}</p>}

                {activeTab === "procedure" && (
                    <ul className="list-disc pl-5">
                        {experiment.procedure.map((step, i) => (
                            <li key={i} className="mb-2 text-gray-700">{step}</li>
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

                {activeTab === "resources" && (
                    <ul className="list-disc pl-5">
                        {experiment.resources.map((res, i) => (
                            <li key={i}>
                                <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {res.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

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
                        {experiment.quiz.map((q, i) => (
                            <div key={i} className="mb-4">
                                <p className="font-semibold">{i + 1}. {q.question}</p>
                                {q.options.map((option, j) => (
                                    <label key={j} className="block">
                                        <input type="radio" name={`question-${i}`} value={option} onChange={() => handleOptionChange(i, option)} />
                                        {" " + option}
                                    </label>
                                ))}
                            </div>
                        ))}
                        <button onClick={handleSubmitQuiz} className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                        {score !== null && <p className="mt-4 text-lg font-bold text-green-600">Your Score: {score}/{experiment.quiz.length}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SimplePendulumExperiment;
