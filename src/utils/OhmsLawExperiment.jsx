import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpOhmsLaw from "./help_OhmsLawExperiment";

function OhmsLawSimulator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Ohm's Law Simulator",
    theory:
      "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points and inversely proportional to the resistance between them. The formula is V = I × R.",
    procedure: [
      "Set up a simple electrical circuit with a resistor, a voltage source, and an ammeter.",
      "Adjust the voltage of the power supply and measure the current using an ammeter.",
      "Repeat the experiment with different resistor values.",
      "Record the readings and calculate resistance using Ohm's Law.",
      "Analyze the relationship between voltage, current, and resistance.",
    ],
    animation: "/assets/ohms-law-animation.gif",
    video: "https://www.youtube.com/embed/OhmsLawVideo",
    resources: [
      { title: "Ohm's Law - Khan Academy", link: "https://www.khanacademy.org" },
      { title: "Ohm's Law - Wikipedia", link: "https://en.wikipedia.org/wiki/Ohm's_law" },
    ],
    feedback: "Please share your feedback on this simulation!",
    quiz: [
      { question: "What is the formula of Ohm's Law?", options: ["V = IR", "P = IV", "R = V/I", "I = VR"], answer: "V = IR" },
      { question: "What happens to current when resistance increases?", options: ["Increases", "Remains same", "Decreases", "Becomes infinite"], answer: "Decreases" },
      { question: "What is the SI unit of resistance?", options: ["Volt", "Ohm", "Ampere", "Watt"], answer: "Ohm" },
      { question: "If voltage is 10V and resistance is 5Ω, what is the current?", options: ["0.5A", "2A", "5A", "10A"], answer: "2A" },
      { question: "Who discovered Ohm's Law?", options: ["Isaac Newton", "James Watt", "Georg Ohm", "Albert Einstein"], answer: "Georg Ohm" },
    ],
  };

  const handleSelect = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let totalScore = 0;
    experiment.quiz.forEach((q, index) => {
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
        user_name: "User", // Replace with actual user name if available
        user_email: "rajeshgajula.1434@gmail.com", // Replace with user's email if available
        from_name: "Vision Lab Experiment Ohm's Law Simulator ", // Ensure this matches your EmailJS template
        message: feedback, // The actual feedback message
      };

    emailjs
      .send(
        "service_0updalp",  // Replace with your EmailJS service ID
        "template_gga1aol", // Replace with your EmailJS template ID
        templateParams,
        "eQ_JCPczgpDZ1uk7d"      // Replace with your EmailJS user ID
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

      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        {experiment.title}
      </h1>

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
        {activeTab === "procedure" && <ul className="list-disc pl-5">{experiment.procedure.map((step, index) => <li key={index} className="mb-2 text-gray-700">{step}</li>)}</ul>}
        {activeTab === "animation" && <img src={experiment.animation} alt="Ohm's Law Animation" className="rounded-md w-full" />}
        {activeTab === "simulation" && <HelpOhmsLaw />}
        {activeTab === "video" && <iframe width="100%" height="400" src={experiment.video} title="Ohm's Law Video" className="rounded-md" allowFullScreen></iframe>}
        {activeTab === "resources" && <ul className="list-disc pl-5">{experiment.resources.map((resource, index) => <li key={index} className="mb-2"><a href={resource.link} className="text-blue-600 hover:underline">{resource.title}</a></li>)}</ul>}
        
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
            {experiment.quiz.map((q, index) => (
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
            <button onClick={handleSubmit} className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
            {score !== null && <p className="mt-4 text-lg font-bold text-green-600">Your Score: {score} / {experiment.quiz.length}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default OhmsLawSimulator;
