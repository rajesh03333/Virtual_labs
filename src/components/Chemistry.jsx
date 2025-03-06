import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Chemistry() {
  const navigate = useNavigate();

  const experiments = [
    {
      title: "Acid-Base Titration",
      category: "Analytical Chemistry",
      theory: "Determine the concentration of an unknown acid or base using titration.",
      image: "https://plus.unsplash.com/premium_photo-1715107534823-ea682a93cf1b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Electrolysis of Water",
      category: "Electrochemistry",
      theory: "Decompose water into hydrogen and oxygen gases using electrical energy.",
      image: "https://plus.unsplash.com/premium_photo-1692825695165-367917888cb0?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "pH Scale Simulator",
      category: "Acid-Base Chemistry",
      theory: "Understand the pH levels of different solutions and mix them to observe changes in acidity and alkalinity.",
      image: "https://phet.colorado.edu/sims/html/ph-scale-basics/latest/ph-scale-basics.png",
    },
  ];

  // Convert experiment titles into URL-friendly format
  const formatTitleForURL = (title) => title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Chemistry Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Chemistry Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Chemistry Virtual Lab! Perform various chemistry experiments in a simulated environment.
            These virtual experiments help you understand chemistry concepts better through practical application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">15+ Experiments</h3>
              <p className="text-gray-600">Comprehensive collection of chemistry experiments.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Real-time Simulation</h3>
              <p className="text-gray-600">Interactive virtual lab environment.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Detailed Theory</h3>
              <p className="text-gray-600">Complete theoretical background.</p>
            </div>
          </div>
        </div>

        {/* Experiment List */}
        <div className="space-y-8">
          {experiments.map((experiment, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={experiment.image}
                    alt={experiment.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  {/* Experiment Category */}
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                      {experiment.category}
                    </span>
                  </div>

                  {/* Experiment Title & Theory */}
                  <h2 className="text-2xl font-bold mb-4">{experiment.title}</h2>
                  <p className="text-gray-600 mb-4">{experiment.theory}</p>

                  {/* Start Experiment Button */}
                  <button
                    onClick={() => navigate(`/chemistry/${formatTitleForURL(experiment.title)}`)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Experiment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chemistry;
