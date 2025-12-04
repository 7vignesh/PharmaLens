/**
 * PharmaLens Research Dashboard
 * ==============================
 * Main dashboard for drug repurposing analysis.
 * 
 * Features:
 * - Drug name input with auto-suggest
 * - API call to Node.js backend
 * - Agent status visualization
 * - ROI results display
 * - Citation panel with hover-to-verify
 * - PDF report generation
 * - Watch & Alert module
 * - Interactive Knowledge Graph
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
  Clock,
  Shield,
  Users,
  Network
} from 'lucide-react';
import { ResearchContext } from '../context/ResearchContext';
import { researchService } from '../services/api';
import AgentStatusCard from '../components/dashboard/AgentStatusCard';
import ROICalculator from '../components/dashboard/ROICalculator';
import AutoSuggestInput from '../components/dashboard/AutoSuggestInput';
import CitationPanel from '../components/dashboard/CitationPanel';
import ReportGenerator from '../components/dashboard/ReportGenerator';
import WatchAlertModule from '../components/dashboard/WatchAlertModule';
import KnowledgeGraph from '../components/graph/KnowledgeGraph';

const ResearchDashboard = () => {
  const { privacyMode } = useContext(ResearchContext);
  const [drugName, setDrugName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [activeTab, setActiveTab] = useState('results'); // 'results', 'graph', 'citations', 'watch'
  const [agentStatuses, setAgentStatuses] = useState([
    { name: 'Clinical Agent', status: 'idle', icon: FileText },
    { name: 'Patent Agent', status: 'idle', icon: FileText },
    { name: 'Market Agent', status: 'idle', icon: TrendingUp },
    { name: 'Vision Agent', status: 'idle', icon: Eye },
    { name: 'Validation Agent', status: 'idle', icon: Shield },
    { name: 'KOL Finder', status: 'idle', icon: Users },
    { name: 'Pathfinder', status: 'idle', icon: Network }
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
      const agents = [
        'Clinical Agent', 'Patent Agent', 'Market Agent', 'Vision Agent',
        'Validation Agent', 'KOL Finder', 'Pathfinder'
      ];
      for (let i = 0; i < agents.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
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
            <div className="flex-1">
              <AutoSuggestInput
                value={drugName}
                onChange={setDrugName}
                onSelect={(value) => {
                  setDrugName(value);
                }}
                placeholder="Enter drug name (e.g., Aspirin, Metformin, Imatinib)"
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {agentStatuses.map((agent, index) => (
            <AgentStatusCard 
              key={agent.name}
              name={agent.name}
              status={agent.status}
              icon={agent.icon}
              delay={index * 100}
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
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <span className="font-semibold text-green-800">Analysis Complete!</span>
                <span className="text-green-700 ml-2">
                  Processed in {results.results?.processingTimeMs || 0}ms
                </span>
              </div>
            </div>
            <ReportGenerator 
              data={results} 
              molecule={drugName} 
            />
          </div>
          
          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-1 p-2">
                {[
                  { id: 'results', label: 'Results', icon: TrendingUp },
                  { id: 'graph', label: 'Knowledge Graph', icon: Network },
                  { id: 'citations', label: 'Citations', icon: FileText },
                  { id: 'watch', label: 'Watch & Alert', icon: Eye }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Results Tab */}
              {activeTab === 'results' && (
                <div className="space-y-6">
                  {/* ROI Calculator Card */}
                  <ROICalculator data={results.results?.market} molecule={drugName} />
                  
                  {/* Additional Results Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Clinical Summary */}
                    {results.results?.clinical && (
                      <div className="bg-gray-50 rounded-xl p-6">
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
                      <div className="bg-gray-50 rounded-xl p-6">
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
                  
                  {/* Validation Summary */}
                  {results.results?.validation && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-yellow-600" />
                        Validation Results (The Skeptic)
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">
                            {results.results.validation.confidence_score || 85}%
                          </div>
                          <div className="text-sm text-gray-600">Confidence Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {results.results.validation.risk_flags?.length || 2}
                          </div>
                          <div className="text-sm text-gray-600">Risk Flags</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {results.results.validation.verified_claims || 12}
                          </div>
                          <div className="text-sm text-gray-600">Verified Claims</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Knowledge Graph Tab */}
              {activeTab === 'graph' && (
                <div className="h-[600px]">
                  <KnowledgeGraph 
                    molecule={drugName}
                    data={results.results?.knowledge_graph}
                  />
                </div>
              )}
              
              {/* Citations Tab */}
              {activeTab === 'citations' && (
                <CitationPanel 
                  citations={results.results?.citations || []}
                  molecule={drugName}
                />
              )}
              
              {/* Watch & Alert Tab */}
              {activeTab === 'watch' && (
                <WatchAlertModule molecule={drugName} />
              )}
            </div>
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
