from flask import Flask, jsonify
from flask_cors import CORS
import os
import logging
from routes.health import health_bp
from src.routes.presentation import presentation_bp
from src.routes.upload import upload_bp
from src.routes.download import download_bp

logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://athletic-presentation-frontend.onrender.com"}})

app.register_blueprint(health_bp)
app.register_blueprint(presentation_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(download_bp)

os.makedirs('/tmp/uploads', exist_ok=True)
os.makedirs('/tmp/outputs', exist_ok=True)

@app.route('/')
def index():
    return jsonify({
        "name": "Athletic Presentation Generator API",
        "version": "1.0.0",
        "status": "running"
    })

if __name__ == '__main__':
    logger.info("Starting Athletic Presentation Generator API...")
    app.run(debug=True, host='0.0.0.0', port=5000)
