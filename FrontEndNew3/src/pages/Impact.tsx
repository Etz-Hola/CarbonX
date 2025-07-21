import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Leaf, Activity } from 'lucide-react';

export const Impact: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Mock impact data
  const impactProjects = [
    {
      id: '1',
      name: 'Amazon Rainforest Conservation',
      location: 'Brazil',
      totalArea: '15,000 hectares',
      co2Offset: 125000,
      growthRate: 8.5,
      coordinates: { lat: -3.4653, lng: -62.2159 },
      status: 'active',
      lastUpdate: '2024-02-15',
    },
    {
      id: '2',
      name: 'Mangrove Restoration',
      location: 'Indonesia',
      totalArea: '8,500 hectares',
      co2Offset: 68000,
      growthRate: 12.3,
      coordinates: { lat: -0.7893, lng: 113.9213 },
      status: 'active',
      lastUpdate: '2024-02-14',
    },
  ];

  const globalStats = {
    totalProjects: 24,
    totalCO2Offset: 850000,
    forestArea: 125000,
    averageGrowth: 9.2,
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Impact Visualization
            </h1>
            <p className="text-gray-600">
              Track real-world environmental impact from carbon credit projects
            </p>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: MapPin,
                label: 'Active Projects',
                value: globalStats.totalProjects.toString(),
                unit: 'projects',
                color: 'blue',
              },
              {
                icon: Leaf,
                label: 'CO₂ Offset',
                value: (globalStats.totalCO2Offset / 1000).toFixed(0),
                unit: 'k tons',
                color: 'emerald',
              },
              {
                icon: Activity,
                label: 'Forest Area',
                value: (globalStats.forestArea / 1000).toFixed(0),
                unit: 'k hectares',
                color: 'green',
              },
              {
                icon: TrendingUp,
                label: 'Avg Growth',
                value: globalStats.averageGrowth.toFixed(1),
                unit: '% monthly',
                color: 'yellow',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                      <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Project Locations
              </h2>
              <p className="text-gray-600">
                Real-time satellite data from forest conservation projects
              </p>
            </div>
            
            <div className="p-6">
              {/* Placeholder for map - replace with actual map integration */}
              <div className="h-96 bg-emerald-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    Interactive Map Coming Soon
                  </p>
                  <p className="text-gray-500">
                    Real-time forest monitoring with satellite imagery
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Active Projects
              </h2>
              <p className="text-gray-600">
                Detailed impact metrics for each conservation project
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {impactProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.01 }}
                    className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-emerald-300 transition-colors"
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{project.location}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Area</p>
                            <p className="font-medium">{project.totalArea}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">CO₂ Offset</p>
                            <p className="font-medium">{(project.co2Offset / 1000).toFixed(0)}k tons</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Growth Rate</p>
                            <p className="font-medium text-emerald-600">+{project.growthRate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Status</p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="bg-emerald-50 rounded-lg p-4">
                          <h4 className="font-medium text-emerald-900 mb-2">
                            Recent Updates
                          </h4>
                          <p className="text-sm text-emerald-700">
                            Latest satellite data shows continued forest growth with increased 
                            carbon sequestration rates. Project is exceeding initial projections 
                            by {project.growthRate}%.
                          </p>
                          <p className="text-xs text-emerald-600 mt-2">
                            Last updated: {project.lastUpdate}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};