# Recipe AI - Frontend

A modern web application that helps users find and cook recipes based on available ingredients, with AI-powered assistance.

## Features

- **Ingredient Input**: Enter ingredients you have available
- **Recipe Selection**: Choose from AI-generated recipe suggestions
- **AI Chat Assistant**: Get cooking guidance with a conversational AI
- **Image Upload**: Share photos of your ingredients
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- Next.js 15 (React framework)
- TypeScript
- Eslint
- Tailwind CSS
- REST API integration

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn or bun

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd recipe_ai/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   # Create a .env.local file in the root directory
   echo "NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000" > .env.local
   echo "NEXT_PUBLIC_DEBUG_MODE=true" >> .env.local
   ```
   See [ENV_SETUP.md](ENV_SETUP.md) for more details.

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Configuration

The application uses environment variables for configuration:

- `NEXT_PUBLIC_API_BASE_URL`: The base URL of the API server
- `NEXT_PUBLIC_DEBUG_MODE`: Set to 'true' to enable debug logging, 'false' to disable

Different configurations can be set for development and production environments. See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions.

## Usage

1. **Home Page**: Start a new cooking session
2. **Cook Page**: Enter ingredients you have or upload an image
3. **Recipe Selection**: Choose from suggested recipes
4. **Chat Page**: Get cooking guidance from AI
   - Press Enter to send messages
   - Use Shift+Enter for line breaks
   - Click suggested questions for quick assistance
   - End session when finished cooking

## API Integration

The frontend connects to a backend API that provides:
- Session management
- Ingredient analysis
- Recipe generation
- Conversational AI for cooking guidance

## License

[Specify your license]
