# Athletic Presentation Generator Frontend

This is the frontend for the Athletic Presentation Generator, a tool that creates professional video presentations from athletic performance data.

## Features

- Upload athletic performance data files (PDF, CSV, Excel, videos)
- Configure athlete information and sport
- ElevenLabs integration for professional voice narration
- Generate and download video presentations

## Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run the development server: `npm run dev`

## Building for Production

1. Run `npm run build`
2. The built files will be in the `dist` directory
3. Deploy these files to your web server

## Environment Variables

- `VITE_API_URL`: URL of the backend API
- `VITE_ELEVENLABS_ENABLED`: Whether ElevenLabs integration is enabled
- `VITE_APP_NAME`: Application name
- `VITE_DEFAULT_SPORT`: Default sport selection

## Dependencies

- React: UI library
- Vite: Build tool and development server

## License

MIT