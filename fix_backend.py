from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os

app = Flask(__name__ )
CORS(app)

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
    with open('/tmp/demo_video.txt', 'w') as f:
        f.write('This is a demo video placeholder')
    return send_file('/tmp/demo_video.txt', as_attachment=True, download_name='demo_video.mp4')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
