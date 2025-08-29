# AI Q&A Assistant with Gemini Integration

A modern React TypeScript application that provides an intelligent question-and-answer interface powered by Google's Gemini AI. Features include answer rating, best answer management, copy functionality, and a beautiful responsive UI.

## Features

### 🤖 AI-Powered Responses
- **Gemini Pro Integration**: Leverages Google's latest Gemini AI model for accurate, comprehensive answers
- **Smart Prompting**: Optimized prompts ensure clear, well-structured, and helpful responses
- **Error Handling**: Graceful error handling with user-friendly messages

### ⭐ Answer Management System
- **Star Ratings**: Rate answers from 1-5 stars to track quality
- **Best Answers Section**: Automatically highlights top-rated answers at the top
- **Visual Indicators**: Clear visual distinction for best answers with golden highlights

### 🛠 User Experience Features
- **Copy to Clipboard**: One-click copying of answers with visual confirmation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Loading States**: Clear loading indicators during API calls
- **History Management**: Complete Q&A history with timestamps

### 🎨 Modern UI/UX
- **Tailwind CSS**: Beautiful, modern styling with gradient backgrounds
- **Lucide Icons**: Consistent, professional iconography
- **Smooth Animations**: Subtle hover effects and transitions
- **Clean Layout**: Intuitive interface with clear visual hierarchy

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Google Gemini API Key** (free from Google AI Studio)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install

# Or with yarn
yarn install
```

### 2. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the generated API key

### 3. Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace `your_gemini_api_key_here` with your actual Gemini API key:

```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**Important**: Never commit your API key to version control. The `.env` file is already included in `.gitignore`.

### 4. Start the Development Server

```bash
npm run dev
# Or with yarn
yarn dev
```

The application will be available at `http://localhost:5173`

## Usage Guide

### Asking Questions
1. Type your question in the text area
2. Click "Ask Question" or press Enter
3. Wait for the AI to generate a comprehensive response

### Managing Answers
- **Rate Answers**: Click the stars (1-5) to rate answer quality
- **Mark as Best**: Click the star icon to add answers to the "Best Answers" section
- **Copy Answers**: Click the copy icon to copy the answer to your clipboard
- **View History**: All Q&A pairs are saved in the history section with timestamps

### Best Answers Section
- Automatically appears when you mark answers as "best"
- Shows top 3 best answers sorted by rating
- Displays truncated answers with key information
- Highlighted with golden styling for easy identification

## Technical Details

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI SDK
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

### Project Structure
```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── index.css        # Global styles and Tailwind imports
└── vite-env.d.ts    # Vite environment type definitions

.env                 # Environment variables (API key)
package.json         # Dependencies and scripts
tailwind.config.js   # Tailwind CSS configuration
vite.config.ts       # Vite configuration
```

### Key Components and Functions

#### Main State Management
- `qaHistory`: Array of Q&A items with ratings and metadata
- `isLoading`: Loading state during API calls
- `error`: Error message display

#### Core Functions
- `getGeminiResponse()`: Handles Gemini API communication
- `askQuestion()`: Processes form submission and manages state
- `rateAnswer()`: Updates answer ratings
- `markAsBest()`: Manages best answer selection
- `copyToClipboard()`: Handles clipboard operations

## API Integration

The application uses Google's Gemini Pro model with optimized prompting:

```typescript
const prompt = `Please provide a comprehensive and accurate answer to the following question: ${question}

Please make sure your answer is:
- Clear and well-structured
- Factually accurate
- Helpful and informative
- Easy to understand

Question: ${question}`;
```

## Building for Production

```bash
npm run build
# Or with yarn
yarn build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |

## Security Considerations

- **API Key Protection**: Environment variables are used to protect your API key
- **Client-side Limitation**: API key is exposed in the client build (consider using a backend proxy for production)
- **Rate Limiting**: Be aware of Gemini API rate limits and quotas

## Troubleshooting

### Common Issues

1. **"Please set your Gemini API key" Error**
   - Check that your `.env` file contains the correct API key
   - Ensure the key starts with `VITE_` prefix
   - Restart the development server after adding the key

2. **API Connection Issues**
   - Verify your API key is valid and active
   - Check your internet connection
   - Ensure you haven't exceeded API quotas

3. **Build Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Update dependencies: `npm update`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React, TypeScript, and Google Gemini AI**
