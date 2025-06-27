from flask import Flask, jsonify, send_file, request, make_response
from flask_cors import CORS
import os

app = Flask(__name__ )

# Configure CORS to allow requests from your frontend domain
CORS(app, resources={r"/*": {"origins": "*"}})

# Add CORS headers to all responses
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Handle OPTIONS requests explicitly
@app.route('/', defaults={'path': ''}, methods=['OPTIONS'])
@app.route('/<path:path>', methods=['OPTIONS'])
def options_handler(path):
    return make_response('', 200)

@app.route('/')
def index():
    return jsonify({"status": "healthy", "message": "API is running"})

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy", "message": "API is running"})

@app.route('/api/upload', methods=['POST'])
def upload():
    return jsonify({"success": True, "message": "File received", "fileId": "demo123"})

@app.route('/api/presentation/download/demo')
def download_demo():
    # Create a simple text file as a placeholder
    with open('/tmp/demo.txt', 'w') as f:
        f.write('This is a demo video placeholder')
    return send_file('/tmp/demo.txt', as_attachment=True, download_name='demo.mp4')

@app.route('/api/presentation/generate', methods=['POST'])
def generate_presentation():
    return jsonify({
        "success": True,
        "presentationId": "demo_presentation_123",
        "videoFile": "demo_video.mp4",
        "message": "Presentation generated successfully"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
