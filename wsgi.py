import sys
import os

# Add the current directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the app from src/main.py
from src.main import app

if __name__ == "__main__":
    app.run()
