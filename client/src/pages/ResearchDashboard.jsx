/**
 * PharmaLens Research Dashboard
 * ==============================
 * Main dashboard for drug repurposing analysis.
 * 
 * Features:
 * - Drug name input
 * - API call to Node.js backend
 * - Agent status visualization
 * - ROI results display
 * - Loading state animation
 */

import { useState, useContext } from 'react';
import { 
  Search, 
  Loader2, 
  Brain, 
  TrendingUp, 
  FileText, 
  Eye,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ResearchContext } from '../context/ResearchContext';
import { researchService } from '../services/api';
import AgentStatusCard from '../components/dashboard/AgentStatusCard';
import ROICalculator from '../components/dashboard/ROICalculator';

const ResearchDashboard = () => {
  const { privacyMode } = useContext(ResearchContext);
  const [drugName, setDrugName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [agentStatuses, setAgentStatuses] = useState([
    { name: 'Clinical Agent', status: 'idle', icon: FileText },
    { name: 'Patent Agent', status: 'idle', icon: FileText },
    { name: 'Market Agent', status: 'idle', icon: TrendingUp },
    { name: 'Vision Agent', status: 'idle', icon: Eye }
  ]);
  
  /**
   * Handle research form submission
   * Calls the Node.js backend which orchestrates AI agents
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!drugName.trim()) {
      setError('Please enter a drug or molecule name');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    // Update agent statuses to "thinking"
    setAgentStatuses(prev => prev.map(agent => ({
      ...agent,
      status: 'thinking'
    })));
    
    try {
      // Call the research API
      const response = await researchService.analyze(drugName, privacyMode);
      
      // Simulate progressive agent completion
      const agents = ['Clinical Agent', 'Patent Agent', 'Market Agent', 'Vision Agent'];
      for (let i = 0; i < agents.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setAgentStatuses(prev => prev.map(agent => 
          agent.name === agents[i] ? { ...agent, status: 'completed' } : agent
        ));
      }
      
      setResults(response.data);
    } catch (err) {
      console.error('Research failed:', err);
      setError(err.response?.data?.error || 'Failed to process research request');
      setAgentStatuses(prev => prev.map(agent => ({
        ...agent,
        status: 'error'
      })));
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Reset the form and results
   */
  const handleReset = () => {
    setDrugName('');
    setResults(null);
    setError(null);
    setAgentStatuses(prev => prev.map(agent => ({
      ...agent,
      status: 'idle'
    })));
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Drug Repurposing Analysis
        </h1>
        <p className="text-gray-600">
          Enter a drug or molecule name to analyze repurposing opportunities
        </p>
      </div>
      
      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                placeholder="Enter drug name (e.g., Aspirin, Metformin, Imatinib)"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !drugName.trim()}
              className={`px-6 py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center space-x-2 ${
                isLoading || !drugName.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : privacyMode === 'secure'
                    ? 'gradient-secure hover:opacity-90'
                    : 'gradient-cloud hover:opacity-90'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
          
          {/* Mode Indicator */}
          <div className={`text-sm text-center py-2 rounded-lg ${
            privacyMode === 'secure' 
              ? 'bg-green-50 text-green-700' 
              : 'bg-blue-50 text-blue-700'
          }`}>
            Processing in <strong>{privacyMode === 'secure' ? 'Local Secure Mode (Llama 3)' : 'Cloud Mode (GPT-4)'}</strong>
          </div>
        </form>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
      
      {/* Agent Status Cards */}
      {(isLoading || results) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {agentStatuses.map((agent, index) => (
            <AgentStatusCard 
              key={agent.name}
              name={agent.name}
              status={agent.status}
              icon={agent.icon}
              delay={index * 200}
            />
          ))}
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Agents Thinking...
          </h3>
          <p className="text-gray-600">
            Our AI agents are analyzing {drugName} for repurposing opportunities
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-blue-500 rounded-full agent-thinking"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Results Display */}
      {results && !isLoading && (
        <div className="space-y-6">
          {/* Success Header */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <span className="font-semibold text-green-800">Analysis Complete!</span>
              <span className="text-green-700 ml-2">
                Processed in {results.results?.processingTimeMs || 0}ms
              </span>
            </div>
          </div>
          
          {/* ROI Calculator Card */}
          <ROICalculator data={results.results?.market} molecule={drugName} />
          
          {/* Additional Results Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Clinical Summary */}
            {results.results?.clinical && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Clinical Insights
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trials Found</span>
                    <span className="font-semibold">{results.results.clinical.total_trials_found}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Safety Score</span>
                    <span className="font-semibold text-green-600">{results.results.clinical.safety_score}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Efficacy Rating</span>
                    <span className="font-semibold">{results.results.clinical.efficacy_rating}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Patent Summary */}
            {results.results?.patent && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Patent Landscape
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Patents</span>
                    <span className="font-semibold">{results.results.patent.active_patents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">FTO Status</span>
                    <span className="font-semibold">{results.results.patent.freedom_to_operate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiration</span>
                    <span className="font-semibold">{results.results.patent.earliest_expiration}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* New Research Button */}
          <div className="text-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors"
            >
              Start New Research
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchDashboard;
