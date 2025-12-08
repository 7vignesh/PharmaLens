import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ResearchProvider } from './context/ResearchContext';
import Navbar from './components/layout/Navbar';
import ResearchDashboard from './pages/ResearchDashboard';
import ReportPreview from './pages/ReportPreview';

/**
 * PharmaLens Application
 * ======================
 * Main application component with routing and context providers.
 */

// Layout wrapper component
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2024 PharmaLens. Enterprise AI for Drug Repurposing.
        </div>
      </footer>
    </div>
  );
}

// Create router with future flags to suppress v7 warnings
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout><ResearchDashboard /></Layout>,
    },
    {
      path: "/report/:requestId",
      element: <Layout><ReportPreview /></Layout>,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <ResearchProvider>
      <RouterProvider router={router} />
    </ResearchProvider>
  );
}

export default App;
