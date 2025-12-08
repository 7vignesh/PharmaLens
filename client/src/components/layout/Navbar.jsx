/**
 * PharmaLens Navbar Component
 * ============================
 * Top navigation bar with Privacy Mode toggle switch.
 * 
 * Features:
 * - Logo and branding
 * - Privacy toggle (Secure/Cloud mode)
 * - Visual mode indicator
 * - Navigation links
 */

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Cloud, 
  Menu, 
  X, 
  Beaker, 
  Settings,
  Bell
} from 'lucide-react';
import { ResearchContext } from '../../context/ResearchContext';

const Navbar = () => {
  const { privacyMode, setPrivacyMode } = useContext(ResearchContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Toggle between secure (local) and cloud modes
  const handleToggle = () => {
    const newMode = privacyMode === 'secure' ? 'cloud' : 'secure';
    setPrivacyMode(newMode);
  };
  
  const isSecureMode = privacyMode === 'secure';
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">PharmaLens</span>
              <span className="hidden sm:block text-xs text-gray-500">Drug Repurposing AI</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Privacy Mode Toggle */}
            <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
              {/* Mode Label */}
              <span className={`text-sm font-medium transition-colors ${
                isSecureMode ? 'text-green-600' : 'text-gray-400'
              }`}>
                <Shield className="w-4 h-4 inline mr-1" />
                Secure
              </span>
              
              {/* Toggle Switch */}
              <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSecureMode 
                    ? 'bg-green-500 focus:ring-green-500' 
                    : 'bg-blue-500 focus:ring-blue-500'
                }`}
                role="switch"
                aria-checked={isSecureMode}
                aria-label="Privacy mode toggle"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    isSecureMode ? 'translate-x-1' : 'translate-x-7'
                  }`}
                />
              </button>
              
              {/* Cloud Label */}
              <span className={`text-sm font-medium transition-colors ${
                !isSecureMode ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <Cloud className="w-4 h-4 inline mr-1" />
                Cloud
              </span>
            </div>
            
            {/* Mode Status Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isSecureMode 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {isSecureMode ? '🔒 HIPAA Compliant' : '☁️ GPT-4 Enabled'}
            </div>
            
            {/* Notification Bell */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            {/* Settings */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Mobile Privacy Toggle */}
            <div className="flex flex-col space-y-4 px-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Privacy Mode</span>
                <button
                  onClick={handleToggle}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    isSecureMode ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                      isSecureMode ? 'translate-x-1' : 'translate-x-7'
                    }`}
                  />
                </button>
              </div>
              
              <div className={`text-center py-2 rounded-lg ${
                isSecureMode ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {isSecureMode ? (
                  <span><Shield className="w-4 h-4 inline mr-1" /> Local Secure Mode</span>
                ) : (
                  <span><Cloud className="w-4 h-4 inline mr-1" /> Cloud Mode (GPT-4)</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
