"""
PharmaLens Privacy Toggle Manager
==================================
Handles switching between Cloud (GPT-4) and Local (Llama 3) AI models.

This is a core component for the hybrid architecture, enabling:
- HIPAA-compliant local processing for sensitive data
- Cloud processing for non-sensitive operations
- Seamless switching between modes
"""

from typing import Dict, Any
import structlog

from .config import settings

logger = structlog.get_logger(__name__)


class PrivacyManager:
    """
    Manages the privacy toggle between Cloud and Local AI processing.
    
    Cloud Mode (GPT-4):
    - Higher capability for complex analysis
    - Requires internet connection
    - Data sent to OpenAI servers
    - Best for non-sensitive research queries
    
    Local Mode (Llama 3):
    - Data never leaves the premises
    - HIPAA/GDPR compliant
    - Lower latency for simple queries
    - Best for sensitive patient data analysis
    """
    
    def __init__(self):
        self.cloud_enabled = settings.CLOUD_ENABLED
        self.local_enabled = settings.LOCAL_ENABLED
        
        logger.info(
            "PrivacyManager initialized",
            cloud_available=self.cloud_enabled,
            local_available=self.local_enabled
        )
    
    def get_llm_config(self, mode: str) -> Dict[str, Any]:
        """
        Get LLM configuration based on the selected privacy mode.
        
        Args:
            mode: 'secure' for local processing, 'cloud' for GPT-4
            
        Returns:
            Dictionary containing model configuration
        """
        if mode == "secure":
            return self._get_local_config()
        else:
            return self._get_cloud_config()
    
    def _get_cloud_config(self) -> Dict[str, Any]:
        """Get cloud (GPT-4) configuration"""
        if not self.cloud_enabled:
            logger.warning("Cloud mode requested but not enabled, falling back to local")
            return self._get_local_config()
        
        return {
            "provider": "openai",
            "model": settings.OPENAI_MODEL,
            "api_key": settings.OPENAI_API_KEY,
            "temperature": 0.7,
            "max_tokens": 4096,
            "privacy_level": "standard",
            "data_residency": "cloud",
            "capabilities": {
                "complex_reasoning": True,
                "multi_modal": True,
                "context_window": 128000
            }
        }
    
    def _get_local_config(self) -> Dict[str, Any]:
        """Get local (Llama 3) configuration"""
        if not self.local_enabled:
            logger.warning("Local mode requested but not enabled, falling back to cloud")
            return self._get_cloud_config()
        
        return {
            "provider": "local",
            "model": settings.LOCAL_MODEL_NAME,
            "model_path": settings.LOCAL_MODEL_PATH,
            "temperature": 0.7,
            "max_tokens": 2048,
            "privacy_level": "hipaa_compliant",
            "data_residency": "on_premise",
            "capabilities": {
                "complex_reasoning": True,
                "multi_modal": False,
                "context_window": 8192
            }
        }
    
    def validate_mode(self, mode: str) -> bool:
        """
        Validate if the requested mode is available.
        
        Args:
            mode: Processing mode to validate
            
        Returns:
            True if mode is available
        """
        if mode == "secure":
            return self.local_enabled
        elif mode == "cloud":
            return self.cloud_enabled
        return False
    
    def get_available_modes(self) -> Dict[str, bool]:
        """Get all available processing modes"""
        return {
            "cloud": self.cloud_enabled,
            "secure": self.local_enabled
        }
