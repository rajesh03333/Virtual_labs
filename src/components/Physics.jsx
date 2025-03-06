import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Physics() {
  const navigate = useNavigate();

  const experiments = [
    {
      title: "Ohm's Law",
      category: "Electricity and Magnetism",
      theory: "Study the relationship between voltage, current, and resistance in electrical circuits.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    },
    {
      title: "Verification of Hooke's Law",
      category: "Mechanics",
      theory: "Investigate the relationship between force and extension in a spring.",
      image: "https://images.unsplash.com/photo-1517976547714-720226b864c1?w=800",
    },
    {
      title: "Simple Pendulum",
      category: "Oscillations",
      theory: "Study the motion of a simple pendulum and calculate acceleration due to gravity.",
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800",
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

        {/* Physics Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Physics Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Physics Virtual Lab! Here you can perform various physics experiments in a simulated environment. 
            These virtual experiments are designed to help you understand physics concepts better through practical application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">15+ Experiments</h3>
              <p className="text-gray-600">Comprehensive collection of physics experiments.</p>
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
                    onClick={() => navigate(`/physics/${formatTitleForURL(experiment.title)}`)}
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

export default Physics;
