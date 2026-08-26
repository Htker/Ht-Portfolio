from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent
INDEX_FILE = ROOT / 'index.html'


class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        path = self.translate_path(self.path)
        if self.path.startswith('/assets/') or self.path.startswith('/sections/') or self.path.startswith('/js/') or self.path.startswith('/css/') or self.path.startswith('/img/'):
            return super().do_GET()

        if os.path.isdir(path):
            self.path = '/index.html'
            return super().do_GET()

        if not os.path.exists(path) or path.endswith('.html') is False and not self.path.endswith('/'):
            if self.path not in ('/', ''):
                self.path = '/index.html'
                return super().do_GET()

        return super().do_GET()


if __name__ == '__main__':
    port = 8000
    server = ThreadingHTTPServer(('0.0.0.0', port), SPAHandler)
    print(f'Serving portfolio on http://localhost:{port}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
