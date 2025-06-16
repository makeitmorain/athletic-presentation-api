# Athletic Presentation Generator API

This is the backend API for the Athletic Presentation Generator, a tool that creates professional video presentations from athletic performance data.

## Features

- Extract metrics from PDF reports, CSV files, and Excel spreadsheets
- Generate professional scripts based on athlete data
- Create audio narration using ElevenLabs API
- Generate video presentations with synchronized slides and audio
- RESTful API for frontend integration

## Installation

1. Clone this repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and configure your environment variables
6. Run the application: `python src/main.py`

## API Endpoints

- `GET /api/health`: Health check endpoint
- `POST /api/upload`: Upload files for processing
- `POST /api/presentation/generate`: Generate a presentation
- `GET /api/presentation/download/<filename>`: Download a generated presentation
- `GET /api/presentation/download/demo`: Download a demo presentation

## Environment Variables

- `ELEVENLABS_API_KEY`: Your ElevenLabs API key for voice generation
- `ELEVENLABS_DEFAULT_VOICE`: Default voice ID to use for narration
- `UPLOAD_FOLDER`: Directory for uploaded files
- `OUTPUT_FOLDER`: Directory for generated presentations
- `TEMP_FOLDER`: Directory for temporary files
- `DEBUG`: Enable debug mode (True/False)
- `ALLOWED_ORIGINS`: CORS allowed origins

## Dependencies

- Flask: Web framework
- Flask-CORS: Cross-Origin Resource Sharing
- Requests: HTTP library
- Pandas: Data analysis
- NumPy: Numerical computing
- Matplotlib: Data visualization
- Pillow: Image processing
- PyPDF2: PDF processing
- OpenPyXL: Excel file processing
- python-dotenv: Environment variable management

## License

MIT