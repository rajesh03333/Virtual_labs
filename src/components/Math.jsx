import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Math() {
  const navigate = useNavigate();

  const experiments = [
    {
      title: "Pythagorean Theorem",
      category: "Geometry",
      theory: "Verify the Pythagorean theorem using a right triangle.",
      image: "https://images.unsplash.com/photo-1584697964404-3d5f74f60945",
      procedures: [
        "Draw a right triangle with known side lengths.",
        "Calculate the hypotenuse using a² + b² = c².",
        "Measure the hypotenuse and compare with the calculation.",
        "Analyze the results and confirm the theorem."
      ]
    },
    {
      title: "Probability Experiment",
      category: "Statistics",
      theory: "Analyze probability outcomes using dice rolls.",
      image: "https://images.unsplash.com/photo-1515076832099-689d13a54a89",
      procedures: [
        "Roll a die 50 times and record the outcomes.",
        "Calculate the probability of each number appearing.",
        "Compare the experimental results with theoretical probability.",
        "Discuss factors affecting probability."
      ]
    },
    {
      title: "Graphing Quadratic Equations",
      category: "Algebra",
      theory: "Understand the shape and properties of quadratic functions.",
      image: "https://images.unsplash.com/photo-1596496186757-17518f24f055",
      procedures: [
        "Plot a quadratic function on a graph.",
        "Identify the vertex, axis of symmetry, and intercepts.",
        "Compare different quadratic functions.",
        "Analyze how coefficients affect the graph shape."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Math Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Explore mathematical concepts through interactive simulations, helping students visualize and understand formulas better.
          </p>
        </div>

        <div className="space-y-8">
          {experiments.map((experiment, index) => {
            const experimentSlug = experiment.title.toLowerCase().replace(/\s+/g, "-"); // Convert title to a URL-friendly slug
            return (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src={experiment.image} alt={experiment.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">{experiment.title}</h2>
                    <p className="text-gray-600 mb-4">{experiment.theory}</p>
                    <button
                      onClick={() => navigate(`/math/${experimentSlug}`)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Experiment
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Math;
