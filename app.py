import http.server
import socketserver
import webbrowser
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

print(f"\n  ⚡ SQL-Easy Talk — Intérprete Interactivo")
print(f"  Servidor iniciado en: http://localhost:{PORT}")
print(f"  Presiona Ctrl+C para detener\n")

webbrowser.open(f"http://localhost:{PORT}")

handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), handler) as httpd:
    httpd.serve_forever()
