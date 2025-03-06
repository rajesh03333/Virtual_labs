import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpElectrolysisOfWater from "./help_ElectrolysisOfWater";

function ElectrolysisExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Electrolysis of Water",
    theory: `Electrolysis of water is a process that uses electricity to break water molecules...`,
    procedure: [
      "Fill a container with water and add a small amount of electrolyte.",
      "Place two electrodes into the solution.",
      "Connect the electrodes to a power supply.",
      "Observe hydrogen gas forming at the cathode and oxygen at the anode.",
    ],
    animation: "/assets/electrolysis-animation.gif",
    video: "https://www.youtube.com/embed/6pM5to36Rws",
    resources: [
      {
        title: "Electrolysis of Water - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Electrolysis - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Electrolysis",
      },
    ],
    feedback: "Please share your feedback on this experiment!",
    quiz: [
      {
        question: "What is the main purpose of electrolysis of water?",
        options: [
          "To create electricity",
          "To break water into hydrogen and oxygen",
          "To heat water",
          "To filter water",
        ],
        answer: "To break water into hydrogen and oxygen",
      },
      {
        question: "Which gas is released at the cathode?",
        options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon Dioxide"],
        answer: "Hydrogen",
      },
      { question: "What role does the electrolyte play in electrolysis?", options: ["Slows down the reaction", "Increases water purity", "Enhances conductivity", "Prevents gas formation"], answer: "Enhances conductivity" },
                { question: "Which electrode attracts oxygen gas?", options: ["Cathode", "Anode", "Both", "None"], answer: "Anode" },
                { question: "What type of energy is used in electrolysis?", options: ["Thermal", "Electrical", "Mechanical", "Solar"], answer: "Electrical" },

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
      from_name: "Vision Lab Experiment - Electrolysis of Water",
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
            alt="Animation"
            className="rounded-md w-full"
          />
        )}
        {activeTab === "simulation" && <HelpElectrolysisOfWater />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="400"
            src={experiment.video}
            title="Experiment Video"
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

export default ElectrolysisExperiment;
