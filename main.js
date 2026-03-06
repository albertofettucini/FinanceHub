const { app, BrowserWindow, ipcMain, session, shell, net, nativeTheme } = require('electron');
const path = require('path');

// Force light mode in all webviews (prevents sites like MarketWatch from going dark)
nativeTheme.themeSource = 'light';

// Remove Electron/automation fingerprint flags
app.commandLine.appendSwitch('disable-blink-features', 'AutomationControlled');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

let mainWindow;
const isMac = process.platform === 'darwin';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    frame: false,
    titleBarStyle: 'hidden',
    // On macOS expose the traffic-light area so our custom titlebar can sit below it
    titleBarOverlay: false,
    transparent: true,           // enables acrylic/chrome mode (v2.48)
    backgroundColor: '#07070f',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
    icon: path.join(__dirname, 'assets', isMac ? 'icon.png' : 'icon.ico'),
  });

  // Set realistic user-agent for all requests
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = UA;
    callback({ requestHeaders: details.requestHeaders });
  });

  // Allow notification permission for price alerts
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    callback(permission === 'notifications');
  });
  session.defaultSession.setPermissionCheckHandler((_webContents, permission) => {
    return permission === 'notifications';
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-state', 'maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-state', 'normal');
  });

  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('window-state', 'fullscreen');
  });

  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('window-state', 'normal');
  });
}

// IPC handlers for window controls
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow?.maximize();
  }
});
ipcMain.on('window-close', () => mainWindow?.close());

// Acrylic / Chrome mode toggle (v2.48)
ipcMain.on('set-acrylic', (_, enable) => {
  if (!mainWindow) return;
  try {
    if (enable) {
      // Windows 11 acrylic material
      mainWindow.setBackgroundMaterial('acrylic');
    } else {
      mainWindow.setBackgroundMaterial('none');
    }
  } catch (_err) {
    // Fallback: opacity-based on older Windows/macOS
    mainWindow.setOpacity(enable ? 0.88 : 1.0);
  }
});

app.whenReady().then(() => {
  createWindow();

  // Handle new-window events from webviews (Electron 22+: new-window event removed)
  // Instead, intercept via web-contents-created and use setWindowOpenHandler
  app.on('web-contents-created', (_event, contents) => {
    if (contents.getType() === 'webview') {
      // Open popup links inside the same webview instead of new windows
      contents.setWindowOpenHandler(({ url }) => {
        contents.loadURL(url);
        return { action: 'deny' };
      });

      // Block external navigation to dangerous protocols
      contents.on('will-navigate', (_navEvent, navUrl) => {
        try {
          const parsed = new URL(navUrl);
          const allowed = ['https:', 'http:'];
          if (!allowed.includes(parsed.protocol)) {
            _navEvent.preventDefault();
          }
        } catch (_) {
          _navEvent.preventDefault();
        }
      });
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ── v2.81: Always-on-Top Float Window ────────────────────────────────────
let floatWindow = null;

ipcMain.handle('open-float-window', (_event, { symbol, price, pct }) => {
  // If already open — close it (toggle)
  if (floatWindow && !floatWindow.isDestroyed()) {
    floatWindow.close();
    floatWindow = null;
    return { opened: false };
  }
  floatWindow = new BrowserWindow({
    width: 210, height: 90,
    frame: false, alwaysOnTop: true, transparent: true,
    resizable: false, skipTaskbar: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'assets', isMac ? 'icon.png' : 'icon.ico'),
  });
  const qs = `?symbol=${encodeURIComponent(symbol)}&price=${encodeURIComponent(price)}&pct=${encodeURIComponent(pct)}`;
  floatWindow.loadFile(path.join(__dirname, 'renderer', 'float.html'), { search: qs });
  floatWindow.on('closed', () => { floatWindow = null; });
  return { opened: true };
});

ipcMain.handle('update-float-window', (_event, { symbol, price, pct }) => {
  if (floatWindow && !floatWindow.isDestroyed()) {
    floatWindow.webContents.send('price-update', { symbol, price, pct });
  }
});

// IPC: open URL in system default browser
ipcMain.handle('open-external', (_event, url) => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      shell.openExternal(url);
    }
  } catch (_) {}
});

// IPC: fetch URLs from main process (no CORS restrictions)
ipcMain.handle('fetch-json', async (_event, url) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000); // 10s timeout
  try {
    const res = await net.fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/xml, */*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    const text = await res.text();
    clearTimeout(timer);
    return { ok: res.ok, status: res.status, text };
  } catch (err) {
    clearTimeout(timer);
    return { ok: false, error: err.message };
  }
});
