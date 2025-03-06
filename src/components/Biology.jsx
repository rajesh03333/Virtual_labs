import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Biology() {
  const navigate = useNavigate();

  const experiments = [
    {
      title: "Microscopic Cell Observation",
      category: "Cell Biology",
      theory: "Observe plant and animal cells under a microscope.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557",
      procedures: [
        "Prepare microscope slides with cell samples.",
        "Adjust microscope focus and lighting.",
        "Identify organelles within the cell structure.",
        "Compare plant and animal cells."
      ]
    },
    {
      title: "Photosynthesis Experiment",
      category: "Plant Biology",
      theory: "Study how light intensity affects the rate of photosynthesis.",
      image: "https://images.unsplash.com/photo-1595981267039-a6d5a181b3e2",
      procedures: [
        "Set up a beaker with water and a plant leaf.",
        "Expose the leaf to different light intensities.",
        "Measure oxygen bubble production over time.",
        "Analyze the effect of light on photosynthesis."
      ]
    },
    {
      title: "Human DNA Extraction",
      category: "Genetics",
      theory: "Extract and observe DNA from human cheek cells.",
      image: "https://images.unsplash.com/photo-1612452581836-01c25723a694",
      procedures: [
        "Swab inside of the cheek for cells.",
        "Mix cells with a saline solution and detergent.",
        "Add alcohol to precipitate the DNA.",
        "Observe DNA strands under a microscope."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-green-600 hover:text-green-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Biology Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Perform virtual biology experiments on cells, plants, and genetics to explore the world of life sciences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">10+ Experiments</h3>
              <p className="text-gray-600">Engaging biology simulations</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Interactive Virtual Lab</h3>
              <p className="text-gray-600">Realistic 3D models</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Detailed Analysis</h3>
              <p className="text-gray-600">Learn with step-by-step procedures</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {experiments.map((experiment, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img src={experiment.image} alt={experiment.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="mb-4">
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                      {experiment.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{experiment.title}</h2>
                  <p className="text-gray-600 mb-4">{experiment.theory}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Procedure:</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      {experiment.procedures.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-600">{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
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

export default Biology;
