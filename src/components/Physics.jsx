import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Physics() {
  const navigate = useNavigate();

  const experiments = [
    {
      title: "Ohm's Law",
      category: "Electricity and Magnetism",
      theory:
        "Study the relationship between voltage, current, and resistance in electrical circuits.",
      image:
        "https://www.allaboutcircuits.com/uploads/articles/current-flow-ohms-law.jpg",
    },
    {
      title: "Verification of Hooke's Law",
      category: "Mechanics",
      theory:
        "Investigate the relationship between force and extension in a spring.",
        image:
        "https://imgs.search.brave.com/pMzzeOAgWp8jZBQ0lTpjXDEDjXlahKro8RERAmSszWk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2NpZW5jZS1zcGFy/a3MuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA0L0hv/b2tlcy1MQXctMS0x/MDI0eDEwMjQuanBl/Zw",
    },
    {
      title: "Simple Pendulum",
      category: "Oscillations",
      theory:
        "Study the motion of a simple pendulum and calculate acceleration due to gravity.",
        image:

        "https://imgs.search.brave.com/rqsM2EMGe-bK4yloiCvpANWzW9_F46xkvgQhNjC_Wbo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE4LzQ3Lzk2/LzM2MF9GXzYxODQ3/OTY1Nl85ZGRETmhR/RGhCTk5XaEluVGg3/Y25jYVcycjRFdFd3/RS5qcGc",

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

        {/* Physics Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Physics Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Physics Virtual Lab! Here you can perform various
            physics experiments in a simulated environment. These virtual
            experiments help you understand physics concepts through practical applications.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Experiments</h3>
              <p className="text-gray-600">
                Comprehensive collection of physics experiments.
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
                    className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-lg border-4 border-gray-500 shadow-lg"
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
                    onClick={() =>
                      navigate(`/physics/${formatTitleForURL(experiment.title)}`)
                    }
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
