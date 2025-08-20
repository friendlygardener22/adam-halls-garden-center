'use client';

import { useState } from 'react';

interface PlantCareInfoProps {
  plantName: string;
  careInstructions: {
    light: string;
    water: string;
    temperature: string;
    humidity: string;
    soil: string;
    fertilizer: string;
    pruning: string;
    propagation: string;
  };
  className?: string;
}

export default function PlantCareInfo({
  plantName,
  careInstructions,
  className = '',
}: PlantCareInfoProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Care' },
    { id: 'advanced', label: 'Advanced Care' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {plantName} Care Guide
        </h3>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'basic' && (
            <>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Light Requirements</h4>
                <p className="text-gray-600">{careInstructions.light}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Watering</h4>
                <p className="text-gray-600">{careInstructions.water}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Temperature</h4>
                <p className="text-gray-600">{careInstructions.temperature}</p>
              </div>
            </>
          )}

          {activeTab === 'advanced' && (
            <>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Humidity</h4>
                <p className="text-gray-600">{careInstructions.humidity}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Soil Type</h4>
                <p className="text-gray-600">{careInstructions.soil}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Fertilizing</h4>
                <p className="text-gray-600">{careInstructions.fertilizer}</p>
              </div>
            </>
          )}

          {activeTab === 'troubleshooting' && (
            <>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Pruning</h4>
                <p className="text-gray-600">{careInstructions.pruning}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Propagation</h4>
                <p className="text-gray-600">{careInstructions.propagation}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Common Issues</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Yellow leaves: Usually indicates overwatering or poor drainage</li>
                  <li>Brown tips: Often caused by low humidity or over-fertilization</li>
                  <li>Drooping leaves: Check soil moisture and adjust watering schedule</li>
                  <li>Pests: Inspect regularly and treat with appropriate insecticide</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 