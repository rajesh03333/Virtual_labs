import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EarthScience() {
  const navigate = useNavigate();

  const experiments = [
    {
      title: "Volcano Eruption Simulation",
      category: "Geology",
      theory: "Understand how pressure buildup causes volcanic eruptions.",
      image: "https://images.unsplash.com/photo-1501959181537-4c79f8731f55",
      procedures: [
        "Mix baking soda and vinegar in a model volcano.",
        "Observe the gas release and lava-like eruption.",
        "Record observations and analyze the reaction.",
        "Discuss real-world volcanic eruptions."
      ]
    },
    {
      title: "Rock Cycle Experiment",
      category: "Geology",
      theory: "Study the transformation of rocks over time due to heat and pressure.",
      image: "https://images.unsplash.com/photo-1586985289683-5310744ce127",
      procedures: [
        "Heat a crayon to represent magma formation.",
        "Compress layers of crayons to simulate sedimentary rocks.",
        "Apply heat and pressure to create metamorphic rocks.",
        "Discuss the real-world rock cycle."
      ]
    },
    {
      title: "Water Cycle Model",
      category: "Meteorology",
      theory: "Observe the continuous movement of water through evaporation, condensation, and precipitation.",
      image: "https://images.unsplash.com/photo-1529198530692-61730de99353",
      procedures: [
        "Fill a clear bowl with water to simulate the ocean.",
        "Place a small container inside to collect condensation.",
        "Cover with plastic wrap and place under sunlight.",
        "Observe evaporation, condensation, and precipitation."
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
          <h1 className="text-3xl font-bold mb-4">Earth Science Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Explore Earth’s dynamic systems through virtual experiments. Learn about geological, atmospheric, and hydrological processes in an interactive way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">10+ Experiments</h3>
              <p className="text-gray-600">Explore Earth's processes</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Real-time Simulation</h3>
              <p className="text-gray-600">Visualize natural phenomena</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Detailed Explanations</h3>
              <p className="text-gray-600">Understand real-world applications</p>
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

export default EarthScience;
