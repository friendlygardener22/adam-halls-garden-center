'use client';

import { useState } from 'react';
import PlantCareInfo from '@/components/PlantCareInfo';

interface CareInstructions {
  light: string;
  water: string;
  temperature: string;
  humidity: string;
  soil: string;
  fertilizer: string;
  pruning: string;
  propagation: string;
}

interface PlantGuide {
  name: string;
  careInstructions: CareInstructions;
}

type PlantGuides = {
  [key: string]: PlantGuide;
};

// Mock data for plant care guides
const plantCareGuides: PlantGuides = {
  'monstera-deliciosa': {
    name: 'Monstera Deliciosa',
    careInstructions: {
      light: 'Prefers bright, indirect light. Can tolerate some direct morning sun but avoid harsh afternoon sun.',
      water: 'Water when the top 2-3 inches of soil are dry. Reduce watering in winter.',
      temperature: 'Thrives in temperatures between 65-85°F (18-29°C). Avoid temperatures below 60°F (15°C).',
      humidity: 'Prefers high humidity (60-80%). Mist regularly or use a humidifier.',
      soil: 'Well-draining potting mix with perlite or orchid bark for aeration.',
      fertilizer: 'Feed monthly during growing season with balanced liquid fertilizer diluted to half strength.',
      pruning: 'Prune to control size and shape. Remove yellow or damaged leaves. Cut back leggy stems.',
      propagation: 'Propagate through stem cuttings with at least one node. Root in water or moist soil.',
    },
  },
  'snake-plant': {
    name: 'Snake Plant',
    careInstructions: {
      light: 'Tolerates low light but grows best in bright, indirect light. Can handle some direct sun.',
      water: 'Allow soil to dry completely between waterings. Very drought tolerant.',
      temperature: 'Thrives in temperatures between 60-85°F (15-29°C). Can tolerate lower temperatures.',
      humidity: 'Adapts well to normal room humidity. No special humidity requirements.',
      soil: 'Well-draining potting mix. Can use cactus or succulent mix.',
      fertilizer: 'Feed lightly during growing season with balanced fertilizer. No fertilizer needed in winter.',
      pruning: 'Remove dead or damaged leaves at the base. Trim brown tips if desired.',
      propagation: 'Propagate through leaf cuttings or division of rhizomes.',
    },
  },
  'pothos': {
    name: 'Pothos',
    careInstructions: {
      light: 'Thrives in bright, indirect light. Can tolerate low light but may lose variegation.',
      water: 'Water when top inch of soil is dry. More drought tolerant than overwatering.',
      temperature: 'Prefers temperatures between 65-85°F (18-29°C). Avoid cold drafts.',
      humidity: 'Adapts to normal room humidity. Benefits from occasional misting.',
      soil: 'Well-draining potting mix. Can grow in water or soil.',
      fertilizer: 'Feed monthly during growing season with balanced liquid fertilizer.',
      pruning: 'Prune to control length and encourage bushiness. Remove yellow leaves.',
      propagation: 'Easy to propagate through stem cuttings in water or soil.',
    },
  },
};

export default function PlantCarePage() {
  const [selectedPlant, setSelectedPlant] = useState<keyof typeof plantCareGuides>('monstera-deliciosa');

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Plant Care Guides</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Plant Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Plant</h2>
              <div className="space-y-2">
                {Object.entries(plantCareGuides).map(([id, plant]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPlant(id as keyof typeof plantCareGuides)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedPlant === id
                        ? 'bg-green-50 text-green-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {plant.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Plant Care Information */}
          <div className="lg:col-span-3">
            <PlantCareInfo
              plantName={plantCareGuides[selectedPlant].name}
              careInstructions={plantCareGuides[selectedPlant].careInstructions}
            />
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Seasonal Care Tips</h3>
              <p className="text-gray-600 mb-4">
                Learn how to adjust your plant care routine for different seasons.
              </p>
              <a href="/garden-advice/seasonal-tips" className="text-green-600 hover:text-green-700">
                Read More →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Problems</h3>
              <p className="text-gray-600 mb-4">
                Troubleshoot common plant issues and learn how to prevent them.
              </p>
              <a href="/garden-advice/troubleshooting" className="text-green-600 hover:text-green-700">
                Read More →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Plant Care Blog</h3>
              <p className="text-gray-600 mb-4">
                Explore our blog for in-depth articles about plant care and gardening.
              </p>
              <a href="/garden-advice/blog" className="text-green-600 hover:text-green-700">
                Read More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 