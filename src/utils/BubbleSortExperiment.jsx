import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpBubbleSort from "./HelpBubbleSort";
import ChatInterface from "./ChatAi";

function BubbleSortExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Bubble Sort Simulator",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>To understand and implement the Bubble Sort algorithm.</p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Bubble Sort is a simple sorting algorithm that repeatedly steps
          through the list, compares adjacent elements, and swaps them if they
          are in the wrong order.
        </p>
        <p>
          Time Complexity: <strong>O(n²)</strong>, where <em>n</em> is the number of elements in the
          list.
        </p>
      </>
    ),
    procedure: [
      "Start with an unsorted array of elements.",
      "Compare each pair of adjacent elements.",
      "Swap them if they are in the wrong order.",
      "Repeat the process for all elements until the array is sorted.",
    ],
    queries: "/assets/bubble-sort-animation.gif",
    video: "https://www.youtube.com/embed/bubbleSortVideo",
    resources: [
      { title: "Bubble Sort - GeeksforGeeks", link: "https://www.geeksforgeeks.org/bubble-sort/" },
      { title: "Bubble Sort - Wikipedia", link: "https://en.wikipedia.org/wiki/Bubble_sort" },
    ],
    feedback: "Please share your feedback on this simulation!",
  };

  const quizQuestions = [
    {
      question: "What is the worst-case time complexity of Bubble Sort?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
      correct: "O(n²)",
    },
    {
      question: "Bubble Sort is best suited for which of the following cases?",
      options: ["Small datasets", "Large datasets", "Reverse-sorted data", "Randomly ordered data"],
      correct: "Small datasets",
    },
    {
      question: "How many passes does Bubble Sort take in the best case?",
      options: ["n", "n-1", "1", "log n"],
      correct: "1",
    },
    {
      question: "What happens if the array is already sorted?",
      options: ["No swaps occur", "Extra passes are required", "Algorithm breaks", "Time complexity increases"],
      correct: "No swaps occur",
    },
    {
      question: "What is the main drawback of Bubble Sort?",
      options: ["High space complexity", "Slow performance on large lists", "Requires additional data structures", "Does not guarantee sorting"],
      correct: "Slow performance on large lists",
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
        {activeTab === "queries" && <ChatInterface experiment="bubble sort" />}
        {activeTab === "simulation" && <HelpBubbleSort />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="400"
            src={experiment.video}
            title="Bubble Sort Video"
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

export default BubbleSortExperiment;