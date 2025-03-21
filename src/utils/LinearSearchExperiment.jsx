import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpLinearSearch from "./help_LinearSearch";
import ChatInterface from "./ChatAi";

function LinearSearchExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const experiment = {
    title: "Linear Search Simulator",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>To understand and implement the Linear Search algorithm.</p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Linear Search is a simple searching algorithm that checks every
          element in a list sequentially until the desired element is found or
          the list ends.
        </p>
        <p>
          Time Complexity: **O(n)**, where *n* is the number of elements in the
          list.
        </p>
      </>
    ),
    procedure: [
      "Start with an array and a target element.",
      "Compare the target with each element in the array.",
      "If a match is found, return the index.",
      "If no match is found, return -1.",
    ],
    queries: "/assets/linear-search-animation.gif",
    video: "https://www.youtube.com/embed/linearSearchVideo",
    resources: [
      { title: "Linear Search - GeeksforGeeks", link: "https://www.geeksforgeeks.org/linear-search/" },
      { title: "Linear Search - Wikipedia", link: "https://en.wikipedia.org/wiki/Linear_search" },
    ],
    feedback: "Please share your feedback on this simulation!",
  };

  const sendFeedback = (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setMessage("Please enter your feedback before submitting.");
      return;
    }

    emailjs
      .send("service_0updalp", "template_gga1aol", {
        user_name: "Administrator",
        user_email: "your-email@example.com",
        from_name: "Vision Lab Experiment - Linear Search Simulator",
        message: feedback,
      }, "eQ_JCPczgpDZ1uk7d")
      .then(() => {
        setMessage("Thank you for your feedback!");
        setFeedback("");
      })
      .catch(() => setMessage("Error sending feedback. Please try again."));
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
        {["theory", "procedure", "queries", "simulation", "video", "resources", "feedback"].map((tab) => (
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
        {activeTab === "queries" && <ChatInterface experiment="linear search" />}
        {activeTab === "simulation" && <HelpLinearSearch />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="400"
            src={experiment.video}
            title="Linear Search Video"
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
      </div>
    </div>
  );
}

export default LinearSearchExperiment;