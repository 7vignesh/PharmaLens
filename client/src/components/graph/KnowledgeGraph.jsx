/**
 * PharmaLens Knowledge Graph Component
 * =====================================
 * Placeholder for Knowledge Graph visualization.
 * Will integrate with D3.js or similar for GraphRAG visualization.
 */

import { Network } from 'lucide-react';

const KnowledgeGraph = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Network className="w-5 h-5 mr-2 text-indigo-600" />
        Knowledge Graph
      </h3>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <div className="text-xl font-bold text-indigo-700">{data.nodes}</div>
          <div className="text-xs text-indigo-600">Nodes</div>
        </div>
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <div className="text-xl font-bold text-indigo-700">{data.edges}</div>
          <div className="text-xs text-indigo-600">Edges</div>
        </div>
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <div className="text-xl font-bold text-indigo-700">{data.key_pathways?.length || 0}</div>
          <div className="text-xs text-indigo-600">Pathways</div>
        </div>
      </div>
      
      {/* Placeholder for Graph */}
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        <div className="text-center">
          <Network className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Graph visualization will render here</p>
          <p className="text-xs mt-1">Integration with D3.js/vis-network pending</p>
        </div>
      </div>
      
      {/* Key Pathways */}
      {data.key_pathways && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Pathways</h4>
          <div className="flex flex-wrap gap-2">
            {data.key_pathways.map((pathway, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
              >
                {pathway}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
