import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const experiments = [
    { 
        title: "Acid-Base Titration", 
        path: "/chemistry/acid-base-titration", 
        image: "https://imgs.search.brave.com/Q5sncTBgXGmXuebRGf37N_VmYx-bYGesQbqIntayoUI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmFj/dGljYWwtc2NpZW5j/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTcvMDcvdGl0/cmF0aW9uLnBuZz93/PTgwMCZoPTQxMg", 
        subject: "Chemistry"
    },
    { 
        title: "Electrolysis of Water", 
        path: "/chemistry/electrolysis-of-water", 
        image: "https://media.istockphoto.com/id/517845768/vector/electrolysis-experimental-set-up-for-electrolysis.jpg?s=1024x1024&w=is&k=20&c=puTXhiQV4hQWKTUR3TeNeq2mAgiwGVVaQ-ihQERJ1qs=", 
        subject: "Chemistry"
    },
    { 
        title: "pH Scale Simulator", 
        path: "/chemistry/ph-scale-simulator", 
        image: "https://img.freepik.com/free-vector/hand-drawn-ph-scale-infographic_23-2150294094.jpg?t=st=1741251154~exp=1741254754~hmac=2bdab59e4d71d21831d5d238b4f74e5a907b7c96b8e8bd797b6d2c4cc78e97fb&w=996", 
        subject: "Chemistry"
    },
    { 
        title: "Ohm's Law", 
        path: "/physics/ohms-law", 
        image: "https://www.allaboutcircuits.com/uploads/articles/current-flow-ohms-law.jpg", 
        subject: "Physics"
    },
    { 
        title: "Verification of Hooke's Law", 
        path: "/physics/verification-of-hookes-law", 
        image: "https://imgs.search.brave.com/pMzzeOAgWp8jZBQ0lTpjXDEDjXlahKro8RERAmSszWk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2NpZW5jZS1zcGFy/a3MuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA0L0hv/b2tlcy1MQXctMS0x/MDI0eDEwMjQuanBl/Zw", 
        subject: "Physics"
    },
    { 
        title: "Simple Pendulum", 
        path: "/physics/simple-pendulum", 
        image: "https://imgs.search.brave.com/rqsM2EMGe-bK4yloiCvpANWzW9_F46xkvgQhNjC_Wbo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE4LzQ3Lzk2/LzM2MF9GXzYxODQ3/OTY1Nl85ZGRETmhR/RGhCTk5XaEluVGg3/Y25jYVcycjRFdFd3/RS5qcGc", 
        subject: "Physics"
    },
    { 
        title: "Pythagorean Theorem", 
        path: "/math/pythagorean-theorem", 
        image: "https://imgs.search.brave.com/EbvWn2NMdCD4lmnno-EEMh1tFhLzqLvJS0rsNKITcV8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzExLzA3LzMz/LzM2MF9GXzUxMTA3/MzM5MV9TSVZPMHJS/QlFqTlZZeG5rNUht/OVhtc21Pc0s3bjFx/aC5qcGc", 
        subject: "Mathematics"
    },
    {
        title: "linearsearch",
        path: "/computerscience/linearsearch",
        image:"https://i.pinimg.com/originals/f5/27/0a/f5270acbc4b98112fcd520d2eea023de.gif",
        subject: "Computer Science",
    }
];

function FeaturedSimulations() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleExperiments = 3;

    const handleNext = () => {
        if (currentIndex + visibleExperiments < experiments.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Featured Simulations</h1>
            
            <div className="flex items-center justify-center md:justify-between ">
                <button 
                    onClick={handlePrev} 
                    className="hidden md:block p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50" 
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 text-center p-3">
                    {experiments.slice(currentIndex, currentIndex + visibleExperiments).map((exp) => (
                        <div key={exp.path} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 p-4">
                            <img src={exp.image} alt={exp.title} className="w-full h-40 object-cover rounded-md" />
                            <h3 className="font-bold text-lg mt-2">{exp.title}</h3>
                            <p className="text-sm text-gray-600">{exp.subject}</p>
                            <button
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                onClick={() => navigate(exp.path)}
                            >
                                Start Experiment
                            </button>
                        </div>
                    ))}
                </div>
                
                <button 
                    onClick={handleNext} 
                    className="hidden md:block p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 " 
                    disabled={currentIndex + visibleExperiments >= experiments.length}
                >
                    <ChevronRight className="w-6 h-6 " />
                </button>
            </div>
        </div>
    );
}

export default FeaturedSimulations;
