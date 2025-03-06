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
      image:
        "https://imgs.search.brave.com/EbvWn2NMdCD4lmnno-EEMh1tFhLzqLvJS0rsNKITcV8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzExLzA3LzMz/LzM2MF9GXzUxMTA3/MzM5MV9TSVZPMHJS/QlFqTlZZeG5rNUht/OVhtc21Pc0s3bjFx/aC5qcGc",
      procedures: [
        "Draw a right triangle with known side lengths.",
        "Calculate the hypotenuse using a² + b² = c².",
        "Measure the hypotenuse and compare with the calculation.",
        "Analyze the results and confirm the theorem.",
      ],
    },
    {
      title: "Probability Experiment",
      category: "Statistics",
      theory: "Analyze probability outcomes using dice rolls.",
      image:
        "https://www.shutterstock.com/shutterstock/photos/2529743471/display_1500/stock-vector-heads-or-tails-pitch-toss-flip-up-coin-probability-calculations-finding-possibility-static-2529743471.jpg",
      procedures: [
        "Roll a die 50 times and record the outcomes.",
        "Calculate the probability of each number appearing.",
        "Compare the experimental results with theoretical probability.",
        "Discuss factors affecting probability.",
      ],
    },
    {
      title: "Graphing Quadratic Equations",
      category: "Algebra",
      theory: "Understand the shape and properties of quadratic functions.",
      image:
        "https://www.shutterstock.com/shutterstock/photos/2092493470/display_1500/stock-vector-anatomy-of-quadratic-function-parts-of-a-parabola-2092493470.jpg",
      procedures: [
        "Plot a quadratic function on a graph.",
        "Identify the vertex, axis of symmetry, and intercepts.",
        "Compare different quadratic functions.",
        "Analyze how coefficients affect the graph shape.",
      ],
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

        {/* Math Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Math Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Explore mathematical concepts through interactive simulations,
            helping students visualize and understand formulas better.
          </p>
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
                      navigate(`/math/${formatTitleForURL(experiment.title)}`)
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

export default Math;
