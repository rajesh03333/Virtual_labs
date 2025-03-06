import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Chemistry() {
  const navigate = useNavigate();

  const experiments = [
    {
      title: "Acid-Base Titration",
      category: "Analytical Chemistry",
      theory:
        "Determine the concentration of an unknown acid or base using titration.",
      image:
        "https://imgs.search.brave.com/Q5sncTBgXGmXuebRGf37N_VmYx-bYGesQbqIntayoUI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmFj/dGljYWwtc2NpZW5j/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTcvMDcvdGl0/cmF0aW9uLnBuZz93/PTgwMCZoPTQxMg",
    },
    {
      title: "Electrolysis of Water",
      category: "Electrochemistry",
      theory:
        "Decompose water into hydrogen and oxygen gases using electrical energy.",
      image:
        "https://media.istockphoto.com/id/517845768/vector/electrolysis-experimental-set-up-for-electrolysis.jpg?s=1024x1024&w=is&k=20&c=puTXhiQV4hQWKTUR3TeNeq2mAgiwGVVaQ-ihQERJ1qs=",
    },
    {
      title: "pH Scale Simulator",
      category: "Acid-Base Chemistry",
      theory:
        "Understand the pH levels of different solutions and mix them to observe changes in acidity and alkalinity.",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-ph-scale-infographic_23-2150294094.jpg?t=st=1741251154~exp=1741254754~hmac=2bdab59e4d71d21831d5d238b4f74e5a907b7c96b8e8bd797b6d2c4cc78e97fb&w=996",
    },
  ];

  // Convert experiment titles into URL-friendly format
  const formatTitleForURL = (title) =>
    title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Chemistry Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Chemistry Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Chemistry Virtual Lab! Perform various chemistry experiments in a simulated environment. These virtual experiments help you understand chemistry concepts better through practical application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">15+ Experiments</h3>
              <p className="text-gray-600">
                Comprehensive collection of chemistry experiments.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Real-time Simulation</h3>
              <p className="text-gray-600">
                Interactive virtual lab environment.
              </p>
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
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={experiment.image}
                    alt={experiment.title}
                    className="w-full h-56 object-cover rounded-lg border-4 border-gray-500 shadow-lg"
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
