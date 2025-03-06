import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpAcidBaseTitration from "./help_acidbasetitration";

function AcidBaseTitrationSimulator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Acid-Base Titration Simulator",
    theory: `Acid-base titration is a quantitative analysis method used to determine 
                 the concentration of an unknown acid or base by neutralizing it with a 
                 base or acid of known concentration.`,
    procedure: [
      "Prepare the acid and base solutions with known concentrations.",
      "Fill a burette with the titrant (acid or base).",
      "Add the titrant gradually to the analyte solution with an indicator.",
      "Observe the color change at the equivalence point.",
      "Record the volume of titrant used for neutralization.",
    ],
    animation: "/assets/acid-base-titration-animation.gif",
    video: "https://www.youtube.com/embed/AcidBaseTitrationVideo",
    resources: [
      {
        title: "Acid-Base Titration - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Titration - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Titration",
      },
    ],
    feedback: "Please share your feedback on this simulation!",
    quiz: [
      {
        question: "What is the main purpose of an acid-base titration?",
        options: [
          "To measure temperature",
          "To determine pH",
          "To find unknown concentration",
          "To create a new solution",
        ],
        answer: "To find unknown concentration",
      },
      {
        question: "What indicator is commonly used in acid-base titration?",
        options: ["Phenolphthalein", "Litmus", "Bromine", "Methyl Orange"],
        answer: "Phenolphthalein",
      },
      {
        question: "What is the equivalence point in a titration?",
        options: [
          "When pH is 7",
          "When moles of acid and base are equal",
          "When color changes",
          "When the solution boils",
        ],
        answer: "When moles of acid and base are equal",
      },
      { 
        question: "What is the formula for molarity?", 
        options: ["M = moles/volume", "M = volume/moles", "M = mass/volume", "M = moles × volume"], 
        answer: "M = moles/volume" 
    },
    { 
        question: "Which apparatus is commonly used to measure the titrant volume?", 
        options: ["Burette", "Pipette", "Beaker", "Test tube"], 
        answer: "Burette" 
    },
    ],
  };

  // Function to handle quiz answer selection
  const handleSelect = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  // Function to submit quiz and calculate score
  const handleSubmit = () => {
    let totalScore = 0;
    experiment.quiz.forEach((q, index) => {
      if (answers[index] === q.answer) totalScore += 1;
    });
    setScore(totalScore);
  };

  // Function to send feedback with template parameters
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
        "service_0updalp", // Your EmailJS service ID
        "template_gga1aol", // Your EmailJS template ID
        templateParams,
        "eQ_JCPczgpDZ1uk7d" // Your EmailJS public key
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
        {activeTab === "simulation" && <HelpAcidBaseTitration />}
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
                <p className="font-semibold mb-2">{`${i + 1}. ${q.question}`}</p>
                {q.options.map((option, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      checked={answers[i] === option}
                      onChange={() => handleSelect(i, option)}
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
              onClick={handleSubmit}
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

export default AcidBaseTitrationSimulator;
