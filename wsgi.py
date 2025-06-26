import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Try different import patterns until one works
try:
    # If main.py is in the same directory as wsgi.py
    from main import app
except ImportError:
    try:
        # If main.py is in a src subdirectory
        from src.main import app
    except ImportError:
        try:
            # If we're already in src and main.py is here
            import main
            app = main.app
        except ImportError:
            # Last resort - check if app.py exists instead of main.py
            try:
                from app import app
            except ImportError:
                from src.app import app

# This is important for Render
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
