import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResearchProvider } from './context/ResearchContext';
import Navbar from './components/layout/Navbar';
import ResearchDashboard from './pages/ResearchDashboard';
import ReportPreview from './pages/ReportPreview';

/**
 * PharmaLens Application
 * ======================
 * Main application component with routing and context providers.
 */
function App() {
  return (
    <ResearchProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <Navbar />
          
          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ResearchDashboard />} />
              <Route path="/report/:requestId" element={<ReportPreview />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              © 2024 PharmaLens. Enterprise AI for Drug Repurposing.
            </div>
          </footer>
        </div>
      </Router>
    </ResearchProvider>
  );
}

export default App;
