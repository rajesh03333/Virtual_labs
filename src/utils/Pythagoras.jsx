import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import Pythagoras from "./help_pythagoras";

function PythagorasTheorem() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Pythagoras' Theorem",
    theory: `Pythagoras' theorem states that in a right-angled triangle, 
             the square of the hypotenuse is equal to the sum of the squares 
             of the other two sides: c² = a² + b².`,
    procedure: [
      "Draw a right-angled triangle with sides a, b, and hypotenuse c.",
      "Measure the lengths of the sides a and b.",
      "Calculate the hypotenuse using c = √(a² + b²).",
      "Compare the theoretical and actual hypotenuse values.",
    ],
    animation: "/assets/pythagoras-animation.gif",
    video: "https://www.youtube.com/embed/PythagorasVideo",
    resources: [
      {
        title: "Pythagoras Theorem - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Pythagoras Theorem - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Pythagorean_theorem",
      },
    ],
    feedback: "Please share your feedback on this experiment!",
    quiz: [
      {
        question: "What is the formula for Pythagoras' theorem?",
        options: [
          "a² + b² = c²",
          "a² - b² = c²",
          "a² + c² = b²",
          "a² * b² = c²",
        ],
        answer: "a² + b² = c²",
      },
      {
        question: "What type of triangle does Pythagoras' theorem apply to?",
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"],
        answer: "Right-angled",
      },
      {
        question: "If a right-angled triangle has sides 3 and 4, what is the hypotenuse?",
        options: ["5", "6", "7", "4.5"],
        answer: "5",
      },
      {
        question: "Which of the following is an example of a Pythagorean triplet?",
        options: ["3, 4, 5", "2, 3, 4", "5, 6, 7", "7, 8, 10"],
        answer: "3, 4, 5",
      },
      {
        question: "What is the hypotenuse in a triangle with sides 6 and 8?",
        options: ["10", "12", "14", "8"],
        answer: "10",
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
      from_name: "Vision Lab Experiment - Pythagoras' Theorem",
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
        onClick={() => navigate("/math")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Math
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

        {activeTab === "simulation" && <Pythagoras />}

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
              <div key={i} className="mb-4">
                <p className="font-semibold">{i + 1}. {q.question}</p>
                {q.options.map((option, j) => (
                  <label key={j} className="block">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      value={option}
                      onChange={() => handleOptionChange(i, option)}
                    />
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

export default PythagorasTheorem
