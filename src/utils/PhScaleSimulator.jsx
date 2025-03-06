import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpPHScale from "./help_PHSensor";

function PhScaleSimulator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const experiment = {
    title: "pH Scale Simulator",
    theory:
      "The pH scale measures how acidic or basic a substance is, ranging from 0 to 14...",
    procedure: [
      "Select a solution to test its pH value.",
      "Use the pH meter or indicator paper to measure the pH.",
      "Observe the color change and match it to the pH scale.",
      "Interpret the pH value to determine if the solution is acidic, neutral, or basic.",
    ],
    animation: "/assets/ph-scale-animation.gif",
    video: "https://www.youtube.com/embed/pHScaleVideo",
    resources: [
      { title: "pH Scale - Khan Academy", link: "https://www.khanacademy.org" },
      { title: "pH - Wikipedia", link: "https://en.wikipedia.org/wiki/PH" },
    ],
    feedback: "Please share your feedback on this simulation!",
    quiz: [
      {
        question: "What is the pH of a neutral solution?",
        options: ["0", "7", "14", "10"],
        answer: "7",
      },
      {
        question: "Which of the following is a strong acid?",
        options: ["NaOH", "HCl", "NH3", "H2O"],
        answer: "HCl",
      },
      {
        question: "What does a pH of 14 indicate?",
        options: ["Neutral", "Weak acid", "Strong base", "Weak base"],
        answer: "Strong base",
      },
      {
        question: "Which ion is responsible for acidity?",
        options: ["OH-", "H+", "Na+", "Cl-"],
        answer: "H+",
      },
      {
        question: "What is the pH of pure water?",
        options: ["5", "6", "7", "8"],
        answer: "7",
      },
    ],
  };

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    experiment.quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) correctAnswers++;
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
      from_name: "Vision Lab Experiment - pH Scale Simulator",
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
        onClick={() => navigate("/chemistry")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Chemistry
      </button>
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        {experiment.title}
      </h1>
      <div className="flex gap-4 mb-6 border-b pb-2">
        {[
          "theory",
          "procedure",
          "animation",
          "simulation",
          "video",
          "resources",
          "feedback",
          "quiz",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "theory" && (
          <p className="text-gray-700">{experiment.theory}</p>
        )}
        {activeTab === "procedure" && (
          <ul className="list-disc pl-5">
            {experiment.procedure.map((step, i) => (
              <li key={i} className="mb-2 text-gray-700">
                {step}
              </li>
            ))}
          </ul>
        )}
        {activeTab === "animation" && (
          <img
            src={experiment.animation}
            alt="pH Scale Animation"
            className="rounded-md w-full"
          />
        )}
        {activeTab === "simulation" && <HelpPHScale />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="400"
            src={experiment.video}
            title="pH Scale Video"
            className="rounded-md"
            allowFullScreen
          ></iframe>
        )}
        {activeTab === "resources" && (
          <ul className="list-disc pl-5">
            {experiment.resources.map((res, i) => (
              <li key={i}>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {res.title}
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
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              onClick={sendFeedback}
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
          </div>
        )}
        {activeTab === "quiz" && (
          <div>
            {experiment.quiz.map((q, i) => (
              <div key={i}>
                <p className="font-semibold mb-2">
                  {i + 1}. {q.question}
                </p>
                {q.options.map((option, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      checked={selectedAnswers[i] === option}
                      onChange={() => handleOptionChange(i, option)}
                      className="mr-2"
                    />
                    <label className="cursor-pointer text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={handleSubmitQuiz}
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
            {score !== null && (
              <p className="mt-4 text-lg font-bold text-green-600">
                Your Score: {score} / {experiment.quiz.length}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhScaleSimulator;
