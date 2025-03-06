import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Search, Beaker, Brain, Atom, Calculator, ChevronRight, Download, ChevronDown } from 'lucide-react';
import Physics from './components/Physics';
import Chemistry from './components/Chemistry';
import Biology from './components/Biology';
import Math from './components/Math';
import EarthScience from './components/EarthScience';
import PythagorasTheorem from './utils/Pythagoras';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ElectrolysisExperiment from './utils/ElectrolysisOfWater';
import PhScaleSimulator from './utils/PhScaleSimulator';
import AcidBaseTitrationSimulator from './utils/AcidBaseTitrationSimulator';
import OhmsLawExperiment from './utils/OhmsLawExperiment';
import HookesLawExperiment from './utils/HookesLawExperiment';
import SimplePendulumExperiment from './utils/SimplePendulumExperiment';


function SimulationCard({ title, image, subject, grade }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="bg-blue-100 px-2 py-1 rounded">{subject}</span>
          <span className="bg-green-100 px-2 py-1 rounded">{grade}</span>
        </div>
      </div>
    </div>
  );
}

SimulationCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired
};

function DropdownMenu({ title, items, isOpen, onToggle }) {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item === "Physics") navigate('/physics');
    if (item === "Chemistry") navigate('/chemistry');
    if (item === "Math") navigate('/math');
    if (item === "Biology") navigate('/biology');
    if (item === "Earth Science") navigate('/earthscience');

  };

  return (
    <div className="relative">
      <button className="flex items-center gap-1 hover:text-blue-200 py-2" onClick={onToggle}>
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
          {items.map((item, index) => (
            <button key={index} onClick={() => handleItemClick(item)} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

DropdownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

function HomePage() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const dropdowns = {
    simulations: {
      title: "Simulations",
      items: [
        "Physics",
        "Chemistry",
        "Math",
        "Biology",
        "Earth Science",
      ]
    },
    teachers: {
      title: "For Teachers",
      items: [
        "Teacher Tips",
        "Workshops",
        "Activity Ideas",
        "Browse Activities",
        "Submit Activity",
        "Virtual Workshop",
        "Professional Development"
      ]
    },
    support: {
      title: "Support",
      items: [
        "Help Center",
        "Troubleshooting",
        "Donate",
        "Technical Requirements",
        "Report a Problem",
        "Accessibility"
      ]
    },
    languages: {
      title: "Languages",
      items: [
        "English",
        "Español",
        "العربية",
        "Português",
        "Français",
        "Deutsch",
        "Italiano",
        "Nederlands",
        "हिंदी",
        "More Languages..."
      ]
    }
  };

  const simulations = [
    {
      title: "Circuit Construction",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
      subject: "Physics",
      grade: "High School"
    },
    {
      title: "Molecular Geometry",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
      subject: "Chemistry",
      grade: "Middle School"
    },
    {
      title: "Cell Structure",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800",
      subject: "Biology",
      grade: "High School"
    },
    {
      title: "Plate Tectonics",
      image: "https://images.unsplash.com/photo-1566936737687-8f392a237b8b?w=800",
      subject: "Earth Science",
      grade: "Middle School"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0B3F75] text-white relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-10">
                <Atom className="w-8 h-8" />
                <span className="text-2xl font-bold">VisionLab</span>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="hidden md:flex items-center gap-4">
                <DropdownMenu
                  {...dropdowns.simulations}
                  isOpen={activeDropdown === 'simulations'}
                  onToggle={() => toggleDropdown('simulations')}
                />
                <DropdownMenu
                  {...dropdowns.teachers}
                  isOpen={activeDropdown === 'teachers'}
                  onToggle={() => toggleDropdown('teachers')}
                />
                <DropdownMenu
                  {...dropdowns.support}
                  isOpen={activeDropdown === 'support'}
                  onToggle={() => toggleDropdown('support')}
                />
              </div>
            </div>
            {/* Show Simulations dropdown on mobile instead of Languages */}
            <div className="md:hidden">
              <DropdownMenu
                {...dropdowns.simulations}
                isOpen={activeDropdown === 'simulations'}
                onToggle={() => toggleDropdown('simulations')}
              />
            </div>
            <div className="hidden md:block">
              <DropdownMenu
                {...dropdowns.languages}
                isOpen={activeDropdown === 'languages'}
                onToggle={() => toggleDropdown('languages')}
              />
            </div>
          </div>
        </div>
      </header>

      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Hero Section */}
      <div
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background_image.jpg')" }}
      >
        {/* Overlay with 40% transparency for better readability */}
        <div className="absolute inset-0  bg-opacity-40"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Interactive Simulations for Science and Math
          </h1>

          <button>
            <a href="#target-section" className="mt-4 inline-block px-6 py-3 border-2 border-gray-200 text-gray-200 rounded-full text-lg font-bold hover:bg-gray-200 hover:text-black transition">
              EXPLORE OUR SIMS
            </a>
          </button>
        </div>
      </div>

      {/* About VisionLab Section - Full Width Layout */}
      <div className="container mx-auto px-4 py-5" id="about">

        {/* Title: About VisionLab */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0B3F75]">About VisionLab</h1>
          <p className="text-gray-700 text-lg mt-4">
            VisionLab is an innovative virtual learning platform that provides interactive science and math simulations.
            We help students, teachers, and researchers explore STEM concepts through engaging digital experiments.
          </p>
        </div>

        {/* Overview - Full Width */}
        <div className="bg-blue-100 p-8 rounded-lg shadow-md w-full mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Overview</h2>
          <p className="text-gray-700">
            VisionLab is designed to revolutionize STEM education by making science and math more interactive.
            Our platform allows students to visualize concepts, conduct experiments, and analyze results in a virtual lab environment.
          </p>
          <p className="text-gray-700 mt-4">Key Features of VisionLab:</p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>100+ interactive simulations covering physics, chemistry, biology, earth science, and math.</li>
            <li>Designed for students and teachers—ideal for classrooms and self-learning.</li>
            <li>Accessible from anywhere on desktop, mobile, and tablets.</li>
            <li>Multilingual support available in English, Spanish, French, and more.</li>
          </ul>
        </div>

        {/* Our Mission - Full Width */}
        <div className="bg-green-100 p-8 rounded-lg shadow-md w-full mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to transform STEM education by providing engaging, easy-to-use, and effective learning experiences.
          </p>
          <p className="text-gray-700 mt-4">What We Aim to Achieve:</p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>Make science and math fun with interactive simulations.</li>
            <li>Bridge the gap between theory and practice through a realistic virtual lab.</li>
            <li>Ensure global access to education with free and low-cost solutions for schools.</li>
            <li>Support teachers with resources, including ready-to-use simulations and teaching guides.</li>
          </ul>
        </div>
      </div>
      {/* Subject Categories */}
      <div className="container mx-auto px-4 py-5">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Browse by Subject</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Beaker className="w-8 h-8 text-purple-500" />
            <button onClick={() => navigate("/chemistry")}>
              <div>
                <h3 className="font-bold">Chemistry</h3>
                <p className="text-sm text-gray-600">120+ simulations</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Atom className="w-8 h-8 text-blue-500" />
            <button onClick={() => navigate("/physics")}>
              <div>
                <h3 className="font-bold">Physics</h3>
                <p className="text-sm text-gray-600">150+ simulations</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Brain className="w-8 h-8 text-green-500" />
            <button onClick={() => navigate("/biology")}>
              <div>
                <h3 className="font-bold">Biology</h3>
                <p className="text-sm text-gray-600">80+ simulations</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Calculator className="w-8 h-8 text-red-500" />
            <button onClick={() => navigate("/math")}>
              <div>
                <h3 className="font-bold">Math</h3>
                <p className="text-sm text-gray-600">100+ simulations</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Simulations */}
      <div id="target-section" className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Simulations</h2>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-4 md:mt-0">
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {simulations.map((sim, index) => (
            <SimulationCard key={index} {...sim} />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 py-16" id="about">
        {/* Publications - Full Width */}
        <div className="bg-purple-100 p-8 rounded-lg shadow-md w-full">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">Publications</h2>
          <p className="text-gray-700">
            VisionLab is at the forefront of educational research, working with universities and learning organizations
            to improve digital learning experiences.
          </p>
          <p className="text-gray-700 mt-4">Our Notable Research & Publications:</p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>“Interactive Simulations in STEM Education” - Published in Educational Technology Journal.</li>
            <li>“Virtual Labs vs. Traditional Labs” - Published in Science Learning Review.</li>
            <li>“The Impact of Gamification on Learning” - Presented at International STEM Conference 2024.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Our work has been recognized at global education conferences, shaping the future of virtual learning.
          </p>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About VisionLab</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Our Mission</a></li>
                <li><a href="#" className="hover:text-blue-300">History</a></li>
                <li><a href="#" className="hover:text-blue-300">Team</a></li>
                <li><a href="#" className="hover:text-blue-300">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">For Teachers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Teacher Tips</a></li>
                <li><a href="#" className="hover:text-blue-300">Workshops</a></li>
                <li><a href="#" className="hover:text-blue-300">Activity Ideas</a></li>
                <li><a href="#" className="hover:text-blue-300">Research</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Donate</a></li>
                <li><a href="#" className="hover:text-blue-300">Volunteer</a></li>
                <li><a href="#" className="hover:text-blue-300">Partners</a></li>
                <li><a href="#" className="hover:text-blue-300">Sponsors</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Newsletter</a></li>
                <li><a href="#" className="hover:text-blue-300">Blog</a></li>
                <li><a href="#" className="hover:text-blue-300">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-300">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; 2025 VisionLab Interactive Simulations, University of Colorado Boulder</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/physics" element={<Physics />} />
          <Route path="/chemistry" element={<Chemistry />} />
          <Route path="/biology" element={<Biology />} />
          <Route path="/math" element={<Math />} />
          <Route path="/earthscience" element={<EarthScience />} />

          <Route path="/math/pythagorean-theorem" element={<PythagorasTheorem />} />

          <Route path="/chemistry/ph-scale-simulator" element={<PhScaleSimulator />} />
          <Route path="/chemistry/acid-base-titration" element={<AcidBaseTitrationSimulator />} />
          <Route path="/chemistry/electrolysis-of-water" element={<ElectrolysisExperiment />} />


           <Route path="/physics/ohm's-law" element={<OhmsLawExperiment/>} />
           <Route path="/physics/verification-of-hooke's-law" element={<HookesLawExperiment/>} />
           <Route path="/physics/simple-pendulum" element={<SimplePendulumExperiment />} ></Route>


        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
