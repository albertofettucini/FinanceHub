const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize:      () => ipcRenderer.send('window-minimize'),
  maximize:      () => ipcRenderer.send('window-maximize'),
  close:         () => ipcRenderer.send('window-close'),
  onWindowState: (cb) => ipcRenderer.on('window-state', (_, state) => cb(state)),
  fetchJson:     (url) => ipcRenderer.invoke('fetch-json', url),
  openExternal:  (url) => ipcRenderer.invoke('open-external', url),
  setAcrylic:       (enable) => ipcRenderer.send('set-acrylic', enable), // v2.48 chrome mode
  openFloatWindow:  (data)   => ipcRenderer.invoke('open-float-window', data),   // v2.81
  updateFloatWindow:(data)   => ipcRenderer.invoke('update-float-window', data),  // v2.81
});
