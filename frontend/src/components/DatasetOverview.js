import React, { useState } from 'react';

function DatasetOverview({ data = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'oceanography', name: 'Oceanography', color: 'bg-blue-500', count: data.filter(item => item.habitat && (item.habitat.includes('Benthic') || item.habitat.includes('Pelagic'))).length },
    { id: 'fisheries', name: 'Fisheries & Taxonomy', color: 'bg-green-500', count: data.filter(item => item.individual_count && item.individual_count > 0).length },
    { id: 'molecular', name: 'Molecular/eDNA', color: 'bg-purple-500', count: data.filter(item => item.basis_of_record === 'PreservedSpecimen').length },
    { id: 'all', name: 'All Data', color: 'bg-gray-500', count: data.length }
  ];

  const filteredData = selectedCategory === 'all' ? data : 
    selectedCategory === 'oceanography' ? data.filter(item => item.habitat && (item.habitat.includes('Benthic') || item.habitat.includes('Pelagic'))) :
    selectedCategory === 'fisheries' ? data.filter(item => item.individual_count && item.individual_count > 0) :
    data.filter(item => item.basis_of_record === 'PreservedSpecimen');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marine Dataset Overview</h1>
        <p className="text-gray-600">Comprehensive view of marine species occurrence data</p>
      </div>

      {/* Interactive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`${category.color} ${selectedCategory === category.id ? 'ring-4 ring-blue-300' : ''} 
              text-white p-6 rounded-lg cursor-pointer hover:opacity-90 transition-all`}
          >
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className="text-2xl font-bold">{category.count}</p>
            <p className="text-sm opacity-90">records</p>
          </div>
        ))}
      </div>

      {/* Dataset Display */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {selectedCategory === 'all' ? 'Complete Dataset' : 
           categories.find(c => c.id === selectedCategory)?.name} 
          ({filteredData.length} records)
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Species</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Count</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Habitat</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{item.scientific_name}</td>
                  <td className="px-4 py-2">{item.locality}</td>
                  <td className="px-4 py-2">{item.individual_count}</td>
                  <td className="px-4 py-2">{item.event_date?.split('T')[0]}</td>
                  <td className="px-4 py-2">{item.habitat}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-gray-500 text-center py-4">
            Showing all {filteredData.length} records
          </p>
        </div>
      </div>
    </div>
  );
}

export default DatasetOverview;