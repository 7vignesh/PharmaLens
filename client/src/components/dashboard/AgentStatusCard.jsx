/**
 * PharmaLens Agent Status Card Component
 * =======================================
 * Displays the status of individual AI agents during analysis.
 */

import { Loader2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const AgentStatusCard = ({ name, status, icon: Icon, delay = 0 }) => {
  // Status configurations
  const statusConfig = {
    idle: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      iconColor: 'text-gray-400',
      label: 'Standby',
      StatusIcon: Clock
    },
    thinking: {
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-500',
      label: 'Analyzing...',
      StatusIcon: Loader2,
      animate: true
    },
    completed: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconColor: 'text-green-500',
      label: 'Complete',
      StatusIcon: CheckCircle2
    },
    error: {
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      iconColor: 'text-red-500',
      label: 'Error',
      StatusIcon: AlertCircle
    }
  };
  
  const config = statusConfig[status] || statusConfig.idle;
  const { StatusIcon } = config;
  
  return (
    <div 
      className={`${config.bgColor} rounded-xl p-4 transition-all duration-300`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-3">
        {/* Agent Icon */}
        <div className={`p-2 rounded-lg bg-white ${config.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        {/* Agent Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate text-sm">
            {name}
          </h4>
          <div className={`flex items-center space-x-1 ${config.textColor} text-xs`}>
            <StatusIcon className={`w-3 h-3 ${config.animate ? 'animate-spin' : ''}`} />
            <span>{config.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentStatusCard;
