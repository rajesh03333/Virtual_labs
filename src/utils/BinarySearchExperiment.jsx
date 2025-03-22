import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpBinarySearch from "./HelpBinarySearch";
import ChatInterface from "./ChatAi";

function BinarySearchExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Binary Search Simulator",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>To understand and implement the Binary Search algorithm.</p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Binary Search is an efficient searching algorithm that finds an item in a sorted list by repeatedly dividing the search interval in half.
        </p>
        <p>
          Time Complexity: **O(log n)**, where *n* is the number of elements in the list.
        </p>
      </>
    ),
    procedure: [
      "Start with a sorted array and a target element.",
      "Find the middle element of the array.",
      "If the middle element matches the target, return its index.",
      "If the target is smaller, repeat on the left half; if larger, repeat on the right half.",
      "Continue until the target is found or the search space is empty.",
    ],
    queries: "/assets/binary-search-animation.gif",
    video: "https://www.youtube.com/embed/binarySearchVideo",
    resources: [
      { title: "Binary Search - GeeksforGeeks", link: "https://www.geeksforgeeks.org/binary-search/" },
      { title: "Binary Search - Wikipedia", link: "https://en.wikipedia.org/wiki/Binary_search_algorithm" },
    ],
    feedback: "Please share your feedback on this simulation!",
  };

  const quizQuestions = [
    {
      question: "What is the worst-case time complexity of Binary Search?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      correct: "O(log n)",
    },
    {
      question: "What is a prerequisite for Binary Search to work?",
      options: ["Array must be sorted", "Array must be unsorted", "Array must contain unique elements", "Array size must be even"],
      correct: "Array must be sorted",
    },
    {
      question: "What happens if the target element is not found?",
      options: ["The algorithm returns -1", "The algorithm throws an error", "The algorithm crashes", "It returns the last element"],
      correct: "The algorithm returns -1",
    },
    {
      question: "Binary Search follows which algorithm paradigm?",
      options: ["Divide and Conquer", "Greedy Algorithm", "Brute Force", "Dynamic Programming"],
      correct: "Divide and Conquer",
    },
    {
      question: "What is the best-case time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correct: "O(1)",
    },
  ];

  const handleQuizChange = (questionIndex, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answer });
  };

  const submitQuiz = () => {
    let totalScore = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) totalScore++;
    });
    setScore(totalScore);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/computerscience")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Computer Science
      </button>
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        {experiment.title}
      </h1>
      <div className="flex gap-4 mb-6 border-b pb-2">
        {["theory", "procedure", "queries", "simulation", "video", "resources", "feedback", "quiz"].map((tab) => (
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
        {activeTab === "theory" && <div>{experiment.theory}</div>}
        {activeTab === "procedure" && (
          <ol className="list-decimal pl-5">
            {experiment.procedure.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>
        )}
        {activeTab === "queries" && <ChatInterface experiment="binary search" />}
        {activeTab === "simulation" && <HelpBinarySearch />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="400"
            src={experiment.video}
            title="Binary Search Video"
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
        {activeTab === "quiz" && (
          <div>
            {quizQuestions.map((q, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{q.question}</p>
                {q.options.map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleQuizChange(index, option)}
                    /> {option}
                  </label>
                ))}
              </div>
            ))}
            <button onClick={submitQuiz} className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit Quiz</button>
            {score !== null && <p className="mt-4 font-bold">Your Score: {score}/5</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default BinarySearchExperiment;
