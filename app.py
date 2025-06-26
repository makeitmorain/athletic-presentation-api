cat > app.py << 'EOF'
from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({
        "message": "Athletic Presentation API is running!",
        "status": "success"
    })

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "athletic-presentation-api"
    })

# Add a debug route to check structure
@app.route('/debug/structure')
def debug_structure():
    import os
    files = []
    for root, dirs, filenames in os.walk('.'):
        if '.git' in root or '.venv' in root or '__pycache__' in root:
            continue
        for filename in filenames:
            if filename.endswith('.py'):
                files.append(os.path.join(root, filename))
    return jsonify({
        "working_directory": os.getcwd(),
        "python_files": files[:20]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
EOF
