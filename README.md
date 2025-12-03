# PharmaLens 🔬💊

> **Enterprise-Grade Agentic AI Platform for Pharmaceutical Drug Repurposing**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://react.dev/)

## 🎯 Overview

PharmaLens is a cutting-edge Multi-Agent Orchestrator platform that revolutionizes pharmaceutical drug repurposing through AI. By leveraging specialized agents (Clinical, Patent, Market, Vision), PharmaLens analyzes molecules in parallel to identify new therapeutic opportunities.

### Key Features

- **🔒 Hybrid Architecture**: Privacy Toggle to switch between Public Cloud (GPT-4) and Private Local (Llama 3) models
- **🕸️ Knowledge Graph**: Visualizing biological connections using GraphRAG
- **📋 Audit Trails**: Strict server-side logging for compliance (HIPAA-ready)
- **💰 ROI Engine**: Quantitative revenue forecasting for drug candidates

## 🏗️ Architecture

```
PharmaLens/
├── client/          # React + Vite + Tailwind CSS (Frontend)
├── server/          # Node.js + Express (Backend API Gateway)
├── ai_engine/       # Python + FastAPI (Multi-Agent AI System)
└── docker-compose.yml
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose (optional)

### Option 1: Using Docker (Recommended)

```bash
# Clone and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend:  http://localhost:3001
# AI Engine: http://localhost:8000/docs
```

### Option 2: Manual Setup

#### 1. Setup Client (Frontend)

```bash
cd client
npm install
npm run dev
```

#### 2. Setup Server (Backend)

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

#### 3. Setup AI Engine

```bash
cd ai_engine
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## 📡 API Endpoints

### Backend (Node.js - Port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/research` | Process drug repurposing analysis |
| GET | `/api/research/:id` | Get research status |
| GET | `/api/research/health` | Health check |
| GET | `/health` | Server health |

### AI Engine (Python - Port 8000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Multi-agent compound analysis |
| POST | `/api/agents/market/roi` | ROI calculation |
| GET | `/api/agents/status` | Agent status |
| GET | `/health` | Engine health |
| GET | `/docs` | Swagger documentation |

## 🔐 Privacy Modes

### Cloud Mode (GPT-4)
- Higher capability for complex analysis
- Best for non-sensitive research queries
- Uses OpenAI GPT-4 API

### Secure Mode (Llama 3)
- Data never leaves your premises
- HIPAA/GDPR compliant
- Lower latency for simple queries

Toggle between modes using the switch in the Navbar.

## 🤖 AI Agents

| Agent | Purpose |
|-------|---------|
| **Clinical Agent** | Analyzes clinical trial data, safety profiles, efficacy |
| **Patent Agent** | Maps IP landscape, FTO analysis, expiration tracking |
| **Market Agent** | ROI calculation, revenue projections, market sizing |
| **Vision Agent** | Molecular structure analysis, binding site identification |

## 📊 Example Response

```json
{
  "success": true,
  "molecule": "Metformin",
  "processingMode": "cloud",
  "results": {
    "market": {
      "projected_revenue_millions": 342,
      "development_cost_millions": 78,
      "roi_percentage": 338.5,
      "recommendation": "STRONG_BUY"
    },
    "clinical": {
      "total_trials_found": 47,
      "safety_score": 8.7,
      "potential_new_indications": ["Oncology", "Cardiology"]
    }
  }
}
```

## 🛠️ Development

### Running Tests

```bash
# Client tests
cd client && npm test

# Server tests
cd server && npm test

# AI Engine tests
cd ai_engine && pytest
```

### Environment Variables

See `.env.example` files in each service directory for required configuration.

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

---

**Built with ❤️ for Pharmaceutical Innovation**
