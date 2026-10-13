import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

# Fix encoding for Windows terminals
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# When running as PyInstaller bundle, files are in sys._MEIPASS
if getattr(sys, 'frozen', False):
    BASE_DIR = sys._MEIPASS
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

os.chdir(BASE_DIR)

PORT = 8080

# Try to find a free port if 8080 is taken
def find_free_port(start_port=8080, max_tries=10):
    import socket
    for port in range(start_port, start_port + max_tries):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('', port))
                return port
            except OSError:
                continue
    return start_port  # fallback

PORT = find_free_port(8080)

print("\n" + "="*45)
print("  ⚡ SQL-Easy Talk — Intérprete Interactivo")
print("="*45)
print(f"  🌐 Servidor: http://localhost:{PORT}")
print(f"  🔑 Usuario: admin  |  Contraseña: 1234")
print(f"  ℹ️  Presiona Ctrl+C para detener el servidor")
print("="*45 + "\n")

class SilentHTTPHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP handler that suppresses access logs."""
    def log_message(self, format, *args):
        pass  # Silence request logs

    def log_error(self, format, *args):
        pass  # Silence error logs

def open_browser():
    time.sleep(0.8)  # Give server time to start
    webbrowser.open(f"http://localhost:{PORT}")

# Open browser in background thread so server starts first
threading.Thread(target=open_browser, daemon=True).start()

try:
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SilentHTTPHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n  👋 Servidor detenido. ¡Hasta luego!")
    sys.exit(0)
except OSError as e:
    print(f"\n  ❌ Error al iniciar servidor: {e}")
    print(f"  Intenta cerrar otras aplicaciones que usen el puerto {PORT}")
    input("  Presiona Enter para salir...")
    sys.exit(1)
