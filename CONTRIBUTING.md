# Contributing to PharmaLens

Thank you for contributing to PharmaLens! This guide will help you get started with development.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ritik0506/PharmaLens.git
   cd PharmaLens
   ```

2. **Set up your development environment**
   - Follow the setup instructions in the [README.md](README.md)
   - Install all dependencies for ai_engine, server, and client

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Before You Start
- Make sure all three services are running (AI engine, server, client)
- Pull the latest changes from master
  ```bash
  git checkout master
  git pull origin master
  git checkout your-branch
  git merge master
  ```

### Making Changes

1. **Work on your feature**
   - Make small, logical commits
   - Write clear commit messages
   - Test your changes thoroughly

2. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Guidelines

Use semantic commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```bash
git commit -m "feat: add drug interaction checker"
git commit -m "fix: resolve API connection timeout"
git commit -m "docs: update installation instructions"
```

### Pushing Changes

```bash
git push origin feature/your-feature-name
```

### Creating a Pull Request

1. Go to the GitHub repository
2. Click "Pull Requests" > "New Pull Request"
3. Select your branch
4. Add a clear description of your changes
5. Request review from team members
6. Address any feedback

## Code Standards

### Python (AI Engine)
- Follow PEP 8 style guide
- Use type hints where possible
- Write docstrings for functions and classes
- Keep functions focused and small

### JavaScript/React (Client & Server)
- Use ESLint for code formatting
- Follow React best practices
- Use meaningful variable and function names
- Keep components focused and reusable

### Testing
- Write tests for new features
- Ensure existing tests pass before submitting
- Run tests:
  ```bash
  # Python tests
  cd ai_engine
  pytest
  
  # JavaScript tests
  cd server
  npm test
  ```

## Directory Structure

```
PharmaLens/
├── ai_engine/              # Python AI/ML backend
│   ├── app/
│   │   ├── agents/        # AI agent implementations
│   │   ├── core/          # Core functionality
│   │   └── services/      # External services
│   ├── tests/             # Python tests
│   └── requirements.txt   # Python dependencies
│
├── server/                 # Node.js API server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   └── middleware/    # Express middleware
│   └── package.json       # Node dependencies
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── package.json       # Node dependencies
│
└── docs/                   # Documentation
```

## Working with Environment Variables

### Never Commit Secrets!
- Never commit `.env` files
- Always use `.env.example` as template
- Keep API keys and secrets secure

### Adding New Environment Variables
1. Add to respective `.env.example` file
2. Document in README.md
3. Update `.gitignore` to exclude `.env`

## Debugging

### AI Engine
- Check logs in terminal running uvicorn
- Use Python debugger (pdb)
- Verify environment variables are set

### Server
- Check console logs
- Use Node.js debugger
- Verify database connections

### Client
- Use React Developer Tools
- Check browser console
- Inspect network requests

## Common Tasks

### Adding a New API Endpoint
1. Define route in `server/src/routes/`
2. Create controller in `server/src/controllers/`
3. Update API documentation
4. Test the endpoint

### Adding a New AI Agent
1. Create agent class in `ai_engine/app/agents/`
2. Register agent in agent manager
3. Write tests for agent
4. Update documentation

### Adding a New UI Component
1. Create component in `client/src/components/`
2. Add proper prop types
3. Style with existing design system
4. Add to storybook (if available)

## Getting Help

- Check existing documentation in `docs/`
- Ask questions in team chat
- Review existing code for examples
- Open an issue for bugs or feature requests

## Code Review Process

### As a Contributor
- Respond to feedback promptly
- Make requested changes
- Ask questions if unclear
- Be open to suggestions

### As a Reviewer
- Be constructive and respectful
- Provide specific feedback
- Suggest alternatives when possible
- Approve when ready

## Release Process

1. All features merged to `master`
2. Version updated in package.json
3. Changelog updated
4. Tagged release created
5. Deployment to production

## Questions?

If you have questions:
1. Check the documentation
2. Ask in team communication channel
3. Create an issue on GitHub
4. Contact project maintainers

Happy coding! 🚀
