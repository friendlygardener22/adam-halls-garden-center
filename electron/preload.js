const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App information
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppName: () => ipcRenderer.invoke('get-app-name'),
  
  // External links
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  
  // Menu actions
  onNewOrder: (callback) => ipcRenderer.on('new-order', callback),
  onOpenOrders: (callback) => ipcRenderer.on('open-orders', callback),
  onPrintReceipt: (callback) => ipcRenderer.on('print-receipt', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  
  // Platform detection
  platform: process.platform,
  
  // App environment
  isElectron: true,
  isDev: process.env.NODE_ENV === 'development'
});

// Handle window controls
window.addEventListener('DOMContentLoaded', () => {
  // Add platform-specific CSS classes
  document.body.classList.add(`platform-${process.platform}`);
  
  // Handle window controls for custom titlebar (if needed)
  if (process.platform === 'win32') {
    // Windows-specific styling
    document.body.classList.add('windows');
  } else if (process.platform === 'darwin') {
    // macOS-specific styling
    document.body.classList.add('macos');
  } else {
    // Linux-specific styling
    document.body.classList.add('linux');
  }
});
